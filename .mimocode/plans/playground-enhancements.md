# Playground Enhancements Implementation Plan

## Overview

5 features for the VTE playground system: Watch Mode, Token Dependency Graph, Global Search/Filter, Multi-platform Preview, and Code Cleanup.

## Architecture Context

- **Generator** (`packages/vte-playground/src/generator.ts`): 926 lines, builds a self-contained Vue SFC via template literals. Token data is baked into the `<script>` section as JS arrays/objects.
- **CLI** (`packages/vte-playground/src/cli.ts`): 140 lines, `start` and `generate` commands using `commander`.
- **Cache** (`packages/vte-playground/src/cache.ts`): 60 lines, in-memory mtime+MD5 cache.
- **Core parser** (`packages/vte-core/src/parser.ts`): Returns `TokenMap` where each `TokenValue` has `{ path, value, raw, refs }`.
- **Compiler agent.ts** (`packages/vte-compiler/src/agent.ts`): Has `toMpValue()` and `toRnValue()` for platform conversion. These are the canonical conversion functions.
- **Vite plugin codegen** (`packages/vte-vite-plugin/src/codegen/`): Has `web.ts`, `mp.ts`, `rn.ts` adapters.

---

## Implementation Order

```
Feature 5 (Code Cleanup)        — zero risk, unblocks everything
    ↓
Feature 1 (Watch Mode)          — CLI-only, no generator changes
    ↓
Feature 3 (Global Search/Filter) — generator UI change, small scope
    ↓
Feature 4 (Multi-platform Preview) — generator + data injection
    ↓
Feature 2 (Token Dependency Graph) — most complex UI, depends on F3/F4 patterns
```

Rationale: Code Cleanup first removes noise. Watch Mode is isolated CLI work. Search/Filter establishes the pattern for injecting reactive UI into the template literal generator. Multi-platform needs data injection (platform values). Dependency Graph is the most complex visualization and benefits from the established patterns.

---

## Feature 5: Code Cleanup

**Goal**: Remove compiled artifacts, React demo files, and update .gitignore.

### Files to modify
- `.gitignore` — add entries for React compiled output
- `packages/vte-react/dist/` — delete directory (compiled artifacts)
- `playground/components/Button.tsx` — delete file (React demo)

### Implementation

1. **Delete `packages/vte-react/dist/`** — these are compiled artifacts that should not be in the repo. The `dist/` pattern in `.gitignore` should already cover this, but the files were committed before the rule existed.

2. **Delete `playground/components/Button.tsx`** — this is a React component in a Vue project's playground. It serves no purpose.

3. **Update `.gitignore`**:
   ```
   # Add to existing .gitignore
   packages/vte-react/dist/
   playground/components/
   ```
   Note: The root `.gitignore` already has `dist/` which should catch `packages/vte-react/dist/`. Verify this works with git's pattern matching (it does — `dist/` matches at any depth). So the main action is deleting the files and ensuring `playground/components/` is ignored.

### Testing
- `git status` shows the deletions
- `git check-ignore playground/components/Button.tsx` confirms gitignore works
- Build still works: `pnpm build` in `packages/vte-playground`

---

## Feature 1: Watch Mode

**Goal**: `vte-playground start --watch` watches the token file and auto-regenerates on change.

### Files to modify
- `packages/vte-playground/src/cli.ts` — add `--watch` flag to `start` command
- `packages/vte-playground/src/watcher.ts` — new file, file watcher logic

### Key Decisions
- Use Node.js `fs.watch` (no external dependency needed — chokidar would add a dep)
- Debounce changes (300ms) to avoid rapid re-triggers on save
- Only regenerate `Playground.vue` on change (the other files are static)
- Print clear console output on regeneration
- Use the existing cache invalidation: `clearCache()` then re-parse

### Implementation

**`packages/vte-playground/src/watcher.ts`** (new file, ~50 lines):
```typescript
import fs from "fs";
import path from "path";

export interface WatchOptions {
  file: string;
  debounceMs?: number;
  onChange: () => Promise<void>;
}

export function startWatcher(options: WatchOptions): fs.FSWatcher {
  const { file, debounceMs = 300, onChange } = options;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  console.log(`\n👀 Watching ${path.relative(process.cwd(), file)} for changes...\n`);

  const watcher = fs.watch(file, { persistent: true }, (eventType) => {
    if (eventType !== "change") return;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      console.log(`\n🔄 Change detected, regenerating...`);
      try {
        await onChange();
        console.log(`✅ Playground updated\n`);
      } catch (e) {
        console.error(`❌ Regeneration failed: ${(e as Error).message}\n`);
      }
    }, debounceMs);
  });

  watcher.on("error", (err) => {
    console.error(`\n❌ Watch error: ${err.message}\n`);
  });

  return watcher;
}
```

**`packages/vte-playground/src/cli.ts`** changes:
- Add `.option("-w, --watch", "Watch token file for changes")` to `start` command
- Extract the generation logic into a reusable `regenerate()` function
- When `--watch` is set, call `startWatcher()` after initial generation
- Keep the process alive with `process.stdin.resume()` or by not exiting

```typescript
// In start command action, after initial generation:
if (options.watch) {
  const { startWatcher } = await import("./watcher.js");
  startWatcher({
    file: tokenFile,
    onChange: async () => {
      clearCache(tokenFile);
      const newTokenMap = await parseTokens(tokenFile);
      const newVueContent = generatePlaygroundComponent(newTokenMap, cssPrefix);
      setCacheResult(tokenFile, newTokenMap, newVueContent);
      fs.writeFileSync(path.join(outputDir, "Playground.vue"), newVueContent);
    },
  });
  // Keep process alive
  await new Promise(() => {});
}
```

### Testing
- Manual: run `vte-playground start --watch`, edit `design-tokens.ts`, verify console output and file update
- Unit test: mock `fs.watch`, verify debounce behavior, verify `onChange` callback is called

---

## Feature 3: Global Search/Filter

**Goal**: Add a search bar at the top of the main content area that filters all token sections by keyword, with category filter chips.

### Files to modify
- `packages/vte-playground/src/generator.ts` — add search UI and filtering logic to the generated component

### Key Decisions
- Search bar is sticky below the header
- Filter chips for categories: All, Colors, Spacing, Font Size, Border Radius, Shadow, Other
- Filtering is reactive (computed) — no manual `@input` handler needed
- Search matches against token path (case-insensitive)
- Sections with no matching tokens are hidden

### Implementation

**Template changes** (in `generatePlaygroundComponent`):

Add a search bar after `<nav class="sidebar">` and before `<main class="main">`:

```html
<div class="search-bar">
  <input v-model="searchQuery" class="search-input" placeholder="Search tokens..." />
  <div class="filter-chips">
    <button v-for="cat in categories" :key="cat.id"
            :class="['chip', { active: activeCategory === cat.id }]"
            @click="activeCategory = cat.id">
      {{ cat.icon }} {{ cat.name }}
    </button>
  </div>
</div>
```

**Script changes**:

```typescript
const searchQuery = ref("");
const activeCategory = ref("all");

const categories = [
  { id: "all", name: "All", icon: "📋" },
  { id: "color", name: "Colors", icon: "🎨" },
  { id: "spacing", name: "Spacing", icon: "📐" },
  { id: "fontSize", name: "Font Size", icon: "📝" },
  { id: "borderRadius", name: "Radius", icon: "🔲" },
  { id: "shadow", name: "Shadow", icon: "🌫️" },
  { id: "other", name: "Other", icon: "📦" },
];

function matchesFilter(path: string): boolean {
  const matchesSearch = !searchQuery.value ||
    path.toLowerCase().includes(searchQuery.value.toLowerCase());
  const matchesCategory = activeCategory.value === "all" ||
    getCategory(path) === activeCategory.value;
  return matchesSearch && matchesCategory;
}

function getCategory(path: string): string {
  if (path.includes("color")) return "color";
  if (path.includes("spacing")) return "spacing";
  if (path.includes("fontSize")) return "fontSize";
  if (path.includes("borderRadius")) return "borderRadius";
  if (path.includes("shadow")) return "shadow";
  return "other";
}
```

**Template section binding** — each section's `v-for` items need filtering:

For the color grid:
```html
<div v-for="path in colors.filter(matchesFilter)" :key="path" class="color-card" ...>
```

And each section gets `v-show="colors.some(matchesFilter)"` to hide empty sections.

**Style additions**:
```css
.search-bar { position: sticky; top: 100px; z-index: 80; background: ...; padding: ...; border-bottom: ...; }
.search-input { width: 100%; padding: ...; border: ...; border-radius: ...; font-size: ...; }
.filter-chips { display: flex; gap: ...; margin-top: ...; flex-wrap: wrap; }
.chip { padding: ...; border: ...; border-radius: ...; cursor: pointer; font-size: ...; }
.chip.active { background: ...; color: ...; }
.dark .search-bar { ... }
.dark .search-input { ... }
.dark .chip { ... }
```

### Testing
- Generate playground, open in browser
- Type in search box → verify sections filter
- Click category chips → verify category filtering
- Combine search + category → verify AND logic
- Verify dark mode styling

---

## Feature 4: Multi-platform Preview

**Goal**: Show token values in Web (CSS Variable), Mini Program (rpx), and React Native (number/string) formats with tab switching.

### Files to modify
- `packages/vte-playground/src/generator.ts` — inject platform data and UI

### Key Decisions
- Reuse the conversion logic from `packages/vte-compiler/src/agent.ts` (`toMpValue`, `toRnValue`) by copying the functions into generator.ts (they are small, ~20 lines each, and importing from vte-compiler would add a dependency)
- Platform preview appears in two places:
  1. **Token Editor section**: add platform tabs below the existing value display
  2. **"Others" token list**: add a platform column
- New section: "Platform Preview" with a table showing all tokens across 3 platforms

### Implementation

**Add conversion functions to generator.ts** (copied from `vte-compiler/src/agent.ts`):

```typescript
function toMpValue(value: string): string {
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return `${parseFloat(pxMatch[1]) * 2}rpx`;
  const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) return `${parseFloat(remMatch[1]) * 16 * 2}rpx`;
  return value;
}

function toRnValue(value: string): number | string {
  if (/^\d+(?:\.\d+)?$/.test(value)) return Number(value);
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return parseFloat(pxMatch[1]);
  return value;
}
```

**Inject platform data into script section**:

```typescript
const tokenPlatformValues: Record<string, { web: string; mp: string; rn: string }> = {
${Array.from(tokenMap.entries()).map(([path, token]) =>
  `  "${path}": { web: "var(--${cssPrefix}-${path.replace(/\./g, '-')})", mp: "${toMpValue(token.value)}", rn: "${toRnValue(token.value)}" },`
).join('\n')}
};
```

**Template — add platform tabs to Token Editor**:

```html
<div class="platform-tabs">
  <button v-for="p in platforms" :key="p.id"
          :class="['platform-tab', { active: activePlatform === p.id }]"
          @click="activePlatform = p.id">
    {{ p.icon }} {{ p.name }}
  </button>
</div>
<div class="result-row">
  <span class="result-label">{{ activePlatformLabel }}</span>
  <code class="result-code">{{ platformValue }}</code>
  <button class="copy-btn" @click="copyToClipboard(platformValue, 'platform')">📋</button>
</div>
```

**Script additions**:

```typescript
const activePlatform = ref("web");
const platforms = [
  { id: "web", name: "Web", icon: "🌐" },
  { id: "mp", name: "Mini Program", icon: "📱" },
  { id: "rn", name: "React Native", icon: "⚛️" },
];

const activePlatformLabel = computed(() =>
  platforms.find(p => p.id === activePlatform.value)?.name || "Web"
);

const platformValue = computed(() => {
  const entry = tokenPlatformValues[tokenInput.value];
  if (!entry) return "N/A";
  return entry[activePlatform.value as keyof typeof entry] || "N/A";
});
```

**New section — Platform Preview table**:

```html
<section id="platform" class="section">
  <h2 class="section-title">📱 Platform Preview</h2>
  <div class="platform-table-wrapper">
    <table class="platform-table">
      <thead>
        <tr><th>Token</th><th>Web</th><th>Mini Program</th><th>React Native</th></tr>
      </thead>
      <tbody>
        <tr v-for="(entry, path) in tokenPlatformValues" :key="path">
          <td class="token-path">{{ path }}</td>
          <td><code>{{ entry.web }}</code></td>
          <td><code>{{ entry.mp }}</code></td>
          <td><code>{{ entry.rn }}</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

**Sidebar update**: Add `{ id: "platform", name: "平台", icon: "📱" }` to sections array.

**Style additions**:
```css
.platform-tabs { display: flex; gap: ...; margin-bottom: ...; }
.platform-tab { padding: ...; border: ...; background: transparent; cursor: pointer; }
.platform-tab.active { background: ...; color: ...; }
.platform-table-wrapper { overflow-x: auto; }
.platform-table { width: 100%; border-collapse: collapse; }
.platform-table th, .platform-table td { padding: ...; border-bottom: ...; text-align: left; }
.platform-table code { font-size: ...; background: ...; padding: ...; border-radius: ...; }
.dark .platform-tab { ... }
.dark .platform-table { ... }
```

### Testing
- Generate playground, open in browser
- Token Editor: switch between Web/MP/RN tabs, verify correct values
- Platform Preview table: verify all tokens show correct conversions
- Verify `16px` → `32rpx` (mp) → `16` (rn)
- Verify `1rem` → `32rpx` (mp) → `"1rem"` (rn)
- Verify color values stay same across platforms

---

## Feature 2: Token Dependency Graph

**Goal**: Visualize token reference chains as an interactive graph in the playground UI.

### Files to modify
- `packages/vte-playground/src/generator.ts` — add graph section with SVG-based visualization

### Key Decisions
- Use SVG (not Canvas) for simplicity and self-containment (no external deps)
- Graph is a tree layout: primitive tokens at the root, semantic tokens in the middle, component tokens at the leaves
- Nodes are colored circles with token name labels
- Edges are curved lines showing reference direction (→)
- Click a node to highlight its full dependency chain
- Hover shows tooltip with token path and resolved value
- Layout is computed in JS (simple hierarchical layout, no external lib)

### Implementation

**Inject reference data into script section**:

```typescript
const tokenRefs: Record<string, string[]> = {
${Array.from(tokenMap.entries())
  .filter(([, token]) => token.refs.length > 0)
  .map(([path, token]) => `  "${path}": ["${token.refs[0]}"],`)
  .join('\n')}
};
```

**Compute graph layout in script**:

```typescript
const graphNodes = computed(() => {
  const nodes: { id: string; x: number; y: number; level: number; label: string }[] = [];
  const layers: Record<string, string[]> = { primitive: [], semantic: [], component: [], other: [] };

  for (const path of allTokens) {
    if (path.startsWith("primitive.")) layers.primitive.push(path);
    else if (path.startsWith("semantic.")) layers.semantic.push(path);
    else if (path.startsWith("component.")) layers.component.push(path);
    else layers.other.push(path);
  }

  const levelOrder = ["primitive", "semantic", "component", "other"];
  let yOffset = 0;

  for (const level of levelOrder) {
    const tokens = layers[level];
    if (tokens.length === 0) continue;

    tokens.forEach((path, i) => {
      nodes.push({
        id: path,
        x: 60 + i * 140,
        y: 40 + yOffset * 80,
        level: levelOrder.indexOf(level),
        label: path.split(".").pop()!,
      });
    });
    yOffset++;
  }

  return nodes;
});

const graphEdges = computed(() => {
  const edges: { from: string; to: string }[] = [];
  for (const [path, refs] of Object.entries(tokenRefs)) {
    for (const ref of refs) {
      edges.push({ from: ref, to: path });
    }
  }
  return edges;
});

const highlightedChain = ref<string[]>([]);

function highlightChain(tokenPath: string) {
  const chain: string[] = [tokenPath];
  let current = tokenPath;
  while (tokenRefs[current]) {
    current = tokenRefs[current][0];
    chain.push(current);
  }
  highlightedChain.value = chain;
}
```

**Template — SVG graph section**:

```html
<section id="graph" class="section">
  <h2 class="section-title">🔗 Dependency Graph</h2>
  <div class="graph-container" ref="graphContainer">
    <svg :width="graphWidth" :height="graphHeight" class="graph-svg">
      <!-- Edges -->
      <path v-for="(edge, i) in graphEdges" :key="'edge-'+i"
            :d="getEdgePath(edge)"
            :class="['graph-edge', { highlighted: isEdgeHighlighted(edge) }]"
            fill="none" stroke-width="2" />
      <!-- Nodes -->
      <g v-for="node in graphNodes" :key="node.id"
         :transform="`translate(${node.x}, ${node.y})`"
         :class="['graph-node', { highlighted: highlightedChain.includes(node.id) }]"
         @click="highlightChain(node.id)">
        <circle r="24" :class="['node-circle', `level-${node.level}`]" />
        <text dy="4" text-anchor="middle" class="node-label">{{ node.label }}</text>
        <title>{{ node.id }}: {{ getVarValue(node.id) }}</title>
      </g>
    </svg>
  </div>
  <div v-if="highlightedChain.length" class="chain-info">
    <span class="chain-label">Dependency chain:</span>
    <span class="chain-path">{{ highlightedChain.join(' → ') }}</span>
    <button class="chain-clear" @click="highlightedChain = []">Clear</button>
  </div>
</section>
```

**Helper functions**:

```typescript
const graphWidth = computed(() => {
  const maxNodesInLayer = Math.max(
    ...["primitive", "semantic", "component", "other"].map(level =>
      graphNodes.value.filter(n => n.level === ["primitive", "semantic", "component", "other"].indexOf(level)).length
    )
  );
  return Math.max(600, maxNodesInLayer * 140 + 120);
});

const graphHeight = computed(() => {
  const levels = new Set(graphNodes.value.map(n => n.level));
  return levels.size * 80 + 80;
});

function getEdgePath(edge: { from: string; to: string }): string {
  const fromNode = graphNodes.value.find(n => n.id === edge.from);
  const toNode = graphNodes.value.find(n => n.id === edge.to);
  if (!fromNode || !toNode) return "";
  const midY = (fromNode.y + toNode.y) / 2;
  return `M${fromNode.x},${fromNode.y + 24} C${fromNode.x},${midY} ${toNode.x},${midY} ${toNode.x},${toNode.y - 24}`;
}

function isEdgeHighlighted(edge: { from: string; to: string }): boolean {
  return highlightedChain.value.includes(edge.from) && highlightedChain.value.includes(edge.to);
}
```

**Style additions**:

```css
.graph-container { overflow-x: auto; padding: ...; background: ...; border-radius: ...; }
.graph-svg { display: block; margin: 0 auto; }
.graph-edge { stroke: $semantic.color.border; transition: stroke 0.2s; }
.graph-edge.highlighted { stroke: $semantic.color.primary; stroke-width: 3; }
.graph-node { cursor: pointer; }
.node-circle { fill: $semantic.color.background; stroke: $semantic.color.border; stroke-width: 2; transition: all 0.2s; }
.node-circle.level-0 { fill: #dbeafe; stroke: #3b82f6; }
.node-circle.level-1 { fill: #dcfce7; stroke: #22c55e; }
.node-circle.level-2 { fill: #fef3c7; stroke: #eab308; }
.graph-node:hover .node-circle { transform: scale(1.2); stroke-width: 3; }
.graph-node.highlighted .node-circle { stroke: $semantic.color.primary; stroke-width: 3; }
.node-label { font-size: 11px; font-family: monospace; pointer-events: none; }
.chain-info { margin-top: ...; padding: ...; background: ...; border-radius: ...; display: flex; align-items: center; gap: ...; }
.chain-label { font-weight: ...; }
.chain-path { font-family: monospace; color: $semantic.color.primary; }
.chain-clear { ... }

.dark .graph-container { background: #0f172a; }
.dark .graph-edge { stroke: #475569; }
.dark .node-circle.level-0 { fill: #1e3a5f; stroke: #60a5fa; }
.dark .node-circle.level-1 { fill: #14532d; stroke: #4ade80; }
.dark .node-circle.level-2 { fill: #451a03; stroke: #fbbf24; }
```

**Sidebar update**: Add `{ id: "graph", name: "依赖图", icon: "🔗" }` to sections array.

### Testing
- Generate playground, open in browser
- Verify graph renders with correct node positions
- Click a semantic token node → verify chain highlights (e.g., `semantic.color.primary → primitive.blue.500`)
- Verify edges follow the correct direction
- Verify dark mode colors
- Test with tokens that have no references (primitives should have no outgoing edges)

---

## File Change Summary

| File | Action | Features |
|------|--------|----------|
| `packages/vte-playground/src/watcher.ts` | CREATE | F1 |
| `packages/vte-playground/src/cli.ts` | MODIFY | F1 |
| `packages/vte-playground/src/generator.ts` | MODIFY | F2, F3, F4 |
| `playground/components/Button.tsx` | DELETE | F5 |
| `packages/vte-react/dist/` | DELETE | F5 |
| `.gitignore` | MODIFY | F5 |

## Risks and Mitigations

1. **Template literal complexity**: generator.ts is already 926 lines. Adding F2/F3/F4 will push it past 1500 lines. Mitigation: the code is all in one function with clear section comments; splitting into helper functions within the same file keeps it manageable without changing the architecture.

2. **SVG graph layout**: A simple hierarchical layout may not handle large token sets well (50+ tokens). Mitigation: add horizontal scrolling to the graph container, and cap node spacing at a reasonable width.

3. **fs.watch reliability**: `fs.watch` has known quirks on macOS (double-fire events). Mitigation: the 300ms debounce handles this.

4. **No external dependencies**: All features use only Node.js built-ins and Vue reactivity. This is a hard constraint for the playground package.
