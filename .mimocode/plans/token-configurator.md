# VTE Token Configurator — Design Document

> **Date**: 2026-07-05
> **Scope**: New page at `/configurator` on the existing VTE website
> **Approach**: Client-side only, Vue 3 Composition API, no new dependencies

---

## 1. Component Architecture

```
website/src/
├── views/
│   └── Configurator.vue              # Page shell (header + layout)
├── components/configurator/
│   ├── TokenSidebar.vue              # Layer tree navigation (primitive/semantic/component)
│   ├── TokenEditor.vue               # Form-based token editor (add/edit/delete)
│   ├── TokenPreview.vue              # Real-time visual preview panel
│   ├── TokenImportModal.vue          # Import modal (JSON/CSS/TS paste or file)
│   ├── TokenExportModal.vue          # Export modal (format selector + code preview)
│   ├── TemplateDrawer.vue            # Template picker drawer
│   ├── ColorSwatch.vue               # Color preview chip
│   ├── SpacingBar.vue                # Spacing/size visual bar
│   ├── FontPreview.vue               # Font size/weight preview
│   ├── ShadowPreview.vue             # Box-shadow preview box
│   ├── TokenBreadcrumb.vue           # Breadcrumb: layer > group > token
│   └── CodeOutput.vue                # Syntax-highlighted export preview (uses Prism.js)
└── composables/
    ├── useTokenStore.ts              # Central reactive token state
    ├── useTokenImport.ts             # Import parsers (JSON/CSS/TS)
    ├── useTokenExport.ts             # Export generators (TS/JSON/CSS/SCSS)
    └── useTokenTemplates.ts          # Built-in template data
```

**Component Responsibilities:**

| Component | Props | Emits | Description |
|-----------|-------|-------|-------------|
| `Configurator.vue` | — | — | Page layout: header + sidebar/editor/preview split |
| `TokenSidebar.vue` | `layers`, `activePath` | `select(path)` | Collapsible tree of primitive/semantic/component groups |
| `TokenEditor.vue` | `token`, `layer`, `allPaths` | `save`, `delete` | Form: name, value, reference toggle, validation |
| `TokenPreview.vue` | `tokens` | — | Tabbed preview: colors, spacing, typography, shadows |
| `TokenImportModal.vue` | `open` | `import(tokenTree)` | Paste/file upload, format auto-detect, preview before apply |
| `TokenExportModal.vue` | `open`, `tokens` | `close` | Format selector (TS/JSON/CSS/SCSS), copy/download |
| `TemplateDrawer.vue` | `open` | `select(template)` | Card grid of templates with preview thumbnails |
| `ColorSwatch.vue` | `color`, `label` | — | Color circle + hex label |
| `SpacingBar.vue` | `value`, `label` | — | Proportional bar visualization |
| `FontPreview.vue` | `size`, `weight`, `label` | — | Text sample at given size/weight |
| `ShadowPreview.vue` | `value`, `label` | — | Box with applied shadow |
| `TokenBreadcrumb.vue` | `path` | `navigate(segment)` | Clickable breadcrumb trail |
| `CodeOutput.vue` | `code`, `language` | `copy` | Prism.js highlighted code block (reuses existing pattern) |

---

## 2. Data Model

### Core Types (reused from `@vte-js/core`)

```typescript
interface TokenValue {
  path: string;       // "semantic.color.primary"
  value: string;      // Resolved value: "#3b82f6"
  raw: string;        // Original: "{primitive.blue.500}"
  refs: string[];     // ["primitive.blue.500"]
}
```

### Reactive Store (`useTokenStore.ts`)

```typescript
import { reactive, computed, ref } from "vue";

interface TokenNode {
  [key: string]: string | TokenNode;  // leaf = string, branch = nested object
}

interface TokenStore {
  // The three-layer tree (editable source of truth)
  tree: {
    primitive: TokenNode;
    semantic: TokenNode;
    component: TokenNode;
  };

  // Flat TokenMap (derived, recomputed on tree change)
  tokenMap: ComputedRef<Map<string, TokenValue>>;

  // UI state
  activePath: string | null;          // Currently selected token path
  activeLayer: "primitive" | "semantic" | "component";
  searchQuery: string;
  sidebarCollapsed: Record<string, boolean>;

  // Actions
  addToken(layer, path, value): void;
  updateToken(path, newValue): void;
  deleteToken(path): void;
  renameToken(oldPath, newPath): void;
  importTree(tree): void;
  resetToTemplate(template): void;
  exportAs(format): string;
}
```

### TokenMap Derivation

The flat `TokenMap` is recomputed from the tree whenever it changes. The logic mirrors `@vte-js/core/parser.ts` but runs client-side:

```typescript
function flattenTree(obj: TokenNode, prefix = ""): Map<string, TokenValue> {
  const map = new Map<string, TokenValue>();
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "object" && val !== null) {
      for (const [k, v] of flattenTree(val, path)) {
        map.set(k, v);
      }
    } else {
      const raw = String(val);
      const isRef = raw.startsWith("{") && raw.endsWith("}");
      map.set(path, {
        path,
        value: "",  // resolved below
        raw,
        refs: isRef ? [raw.slice(1, -1)] : [],
      });
    }
  }
  return map;
}

// BFS reference resolution (same algorithm as core parser)
function resolveRefs(map: Map<string, TokenValue>): void {
  let changed = true;
  let depth = 0;
  while (changed && depth < 10) {
    changed = false;
    depth++;
    for (const [, token] of map) {
      if (token.refs.length > 0 && !token.value) {
        const ref = map.get(token.refs[0]);
        if (ref?.value) {
          token.value = ref.value;
          changed = true;
        }
      }
    }
  }
  // Tokens with unresolved refs keep raw as value
  for (const [, token] of map) {
    if (!token.value) token.value = token.raw;
  }
}
```

### Validation Rules

| Rule | Check |
|------|-------|
| Empty name | Reject |
| Duplicate path | Reject (within same layer) |
| Invalid reference | Warn if `{x.y.z}` doesn't exist in tokenMap |
| Circular reference | DFS detection (same as core) |
| Invalid color | Warn if looks like hex but malformed |
| Invalid CSS value | Warn if not a valid CSS value or reference |

---

## 3. UI Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  [page-header: gradient bg, badge "Configurator", title, desc] │
├─────────────────────────────────────────────────────────────────┤
│  [toolbar: Template | Import | Export | Search | Undo/Redo]    │
├──────────────┬────────────────────────┬─────────────────────────┤
│              │                        │                         │
│   SIDEBAR    │     EDITOR PANEL       │    PREVIEW PANEL        │
│   240px      │     flex: 1            │    320px                │
│              │                        │                         │
│  ▼ Primitive │  ┌─────────────────┐   │  ┌─ Tabs ────────────┐ │
│    ├ blue    │  │ Token Name      │   │  │ Colors | Spacing  │ │
│    │ ├ 50    │  │ [semantic.color  │   │  │ Font   | Shadow   │ │
│    │ ├ 100   │  │  .primary     ] │   │  └───────────────────┘ │
│    │ └ ...   │  ├─────────────────┤   │                         │
│    ├ gray    │  │ Value           │   │  ┌─ Color Swatches ──┐ │
│    └ ...     │  │ [#3b82f6    ]   │   │  │ ● primary #3b82f6 │ │
│              │  │ [x] Reference   │   │  │ ● secondary #6b72 │ │
│  ▼ Semantic  │  │ [{primitive.   │   │  │ ● success #22c55e  │ │
│    ├ color   │  │   blue.500  }]  │   │  │ ● error #ef4444   │ │
│    ├ spacing │  ├─────────────────┤   │  └───────────────────┘ │
│    └ ...     │  │ Preview         │   │                         │
│              │  │ [color swatch]  │   │  ┌─ Spacing Bars ────┐ │
│  ▼ Component │  ├─────────────────┤   │  │ xs ████            │ │
│    ├ button  │  │ [Save] [Delete] │   │  │ sm ████████        │ │
│    └ ...     │  └─────────────────┘   │  │ md ████████████████│ │
│              │                        │  └───────────────────┘ │
│              │  ┌─ Token List ──────┐ │                         │
│  [+ Add]     │  │ color.primary →…  │ │  ┌─ Code Output ─────┐ │
│              │  │ color.secondary →… │ │  │ /* CSS Variables */│ │
│              │  │ spacing.xs → …    │ │  │ --vte-semantic-…   │ │
│              │  └──────────────────┘ │  └───────────────────┘ │
├──────────────┴────────────────────────┴─────────────────────────┤
│  Footer (existing)                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Responsive behavior:**
- **≥1200px**: 3-column layout (sidebar + editor + preview)
- **768–1199px**: 2-column (sidebar collapses to icons, editor + preview side by side)
- **<768px**: Single column with tab switching (Sidebar / Editor / Preview)

**Key interaction flows:**
1. Click token in sidebar → editor populates → preview updates
2. Edit value in editor → preview updates in real-time (debounced 150ms)
3. Toggle "Reference" checkbox → value input becomes a dropdown of existing paths
4. Click template → confirmation dialog → replaces entire tree
5. Import → modal with paste area + format selector → preview parsed tree → apply
6. Export → modal with format tabs → code preview with copy/download buttons

---

## 4. Import/Export Implementation

### Import (`useTokenImport.ts`)

Three format parsers, all return `TokenNode` tree:

```typescript
function importFromJSON(json: string): TokenNode {
  // Parse JSON, validate shape has primitive/semantic/component
  // Return tree directly
}

function importFromCSSVariables(css: string): TokenNode {
  // Regex: --prefix-name: value;
  // Split on "-" to reconstruct tree: --vte-semantic-color-primary → semantic.color.primary
  // Detect references: var(--vte-xxx) → {xxx.dotted.path}
  // Place all into semantic layer by default
}

function importFromTypeScript(ts: string): TokenNode {
  // Extract defineTokens({ ... }) content
  // Use Function constructor to evaluate (safe: no external deps)
  // Fallback: regex extraction of key-value pairs
}

function autoDetectFormat(input: string): "json" | "css" | "ts" {
  if (input.trim().startsWith("{") || input.trim().startsWith("[")) return "json";
  if (input.includes("defineTokens")) return "ts";
  if (input.includes("--")) return "css";
  return "json"; // default
}
```

### Export (`useTokenExport.ts`)

Four format generators, all take `TokenMap` and return string:

```typescript
function exportAsTypeScript(tree: TokenNode): string {
  // Generate: import { defineTokens } from "@vte-js/core";
  //           export default defineTokens({ ... });
  // Pretty-print with 2-space indent
}

function exportAsJSON(tree: TokenNode): string {
  // JSON.stringify(tree, null, 2)
}

function exportAsCSSVariables(tokenMap: Map<string, TokenValue>, prefix = "vte"): string {
  // For each token: --vte-{path.dashed}: {resolvedValue};
  // References become: var(--vte-{ref-dashed})
}

function exportAsSCSS(tokenMap: Map<string, TokenValue>): string {
  // For each token: $vte-{path-dashed}: {resolvedValue};
  // References become: $vte-{ref-dashed}
}
```

---

## 5. Template Data Structure

```typescript
interface TokenTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;           // SVG path or emoji
  preview: {
    colors: string[];     // First 6 colors for thumbnail
  };
  tree: {
    primitive: TokenNode;
    semantic: TokenNode;
    component: TokenNode;
  };
}
```

### Built-in Templates

| ID | Name | Description |
|----|------|-------------|
| `default` | VTE Default | Standard VTE tokens (from playground/design-tokens.ts) |
| `tailwind` | Tailwind Colors | Tailwind CSS color palette as primitives + semantic mapping |
| `material` | Material Design | Material Design 3 tokens (primary/secondary/tertiary) |
| `minimal` | Minimal | Bare minimum: 3 colors + 2 spacing + 1 font |

**Template data files** live in `src/data/templates.ts` as plain objects (no runtime dependency).

---

## 6. File List with Paths

```
website/src/
├── views/
│   └── Configurator.vue                           # NEW - Page shell
├── components/configurator/                        # NEW - All configurator components
│   ├── TokenSidebar.vue
│   ├── TokenEditor.vue
│   ├── TokenPreview.vue
│   ├── TokenImportModal.vue
│   ├── TokenExportModal.vue
│   ├── TemplateDrawer.vue
│   ├── ColorSwatch.vue
│   ├── SpacingBar.vue
│   ├── FontPreview.vue
│   ├── ShadowPreview.vue
│   ├── TokenBreadcrumb.vue
│   └── CodeOutput.vue
├── composables/                                    # NEW - Composables directory
│   ├── useTokenStore.ts
│   ├── useTokenImport.ts
│   ├── useTokenExport.ts
│   └── useTokenTemplates.ts
├── data/
│   └── templates.ts                               # NEW - Template definitions
├── router/
│   └── index.ts                                   # MODIFY - Add /configurator route
└── components/
    └── Navbar.vue                                 # MODIFY - Add "Configurator" nav link
```

**Total: 17 new files, 2 modified files.**

---

## 7. Implementation Order

### Phase 1: Foundation (composables + data)
1. `src/data/templates.ts` — Template data (copy from playground/design-tokens.ts + create Tailwind/Material/Minimal)
2. `src/composables/useTokenStore.ts` — Core reactive store with tree, tokenMap derivation, CRUD actions
3. `src/composables/useTokenTemplates.ts` — Template loader (just imports + exposes)

### Phase 2: Core UI (editor + sidebar)
4. `src/components/configurator/TokenSidebar.vue` — Layer tree with expand/collapse, search filter
5. `src/components/configurator/TokenEditor.vue` — Form with name/value/reference inputs + validation
6. `src/components/configurator/TokenBreadcrumb.vue` — Breadcrumb navigation
7. `src/views/Configurator.vue` — Page shell with 3-column layout, wire sidebar + editor

### Phase 3: Preview
8. `src/components/configurator/ColorSwatch.vue` — Color chip
9. `src/components/configurator/SpacingBar.vue` — Spacing bar
10. `src/components/configurator/FontPreview.vue` — Font preview
11. `src/components/configurator/ShadowPreview.vue` — Shadow box
12. `src/components/configurator/TokenPreview.vue` — Tabbed preview container

### Phase 4: Import/Export
13. `src/composables/useTokenImport.ts` — JSON/CSS/TS parsers
14. `src/composables/useTokenExport.ts` — TS/JSON/CSS/SCSS generators
15. `src/components/configurator/CodeOutput.vue` — Prism.js code display (reuse CodeBlock pattern)
16. `src/components/configurator/TokenImportModal.vue` — Import modal
17. `src/components/configurator/TokenExportModal.vue` — Export modal

### Phase 5: Templates & Polish
18. `src/components/configurator/TemplateDrawer.vue` — Template picker
19. Modify `src/router/index.ts` — Add route
20. Modify `src/components/Navbar.vue` — Add nav link

---

## 8. Technical Notes

### No New Dependencies
- **State**: `reactive()` + `computed()` (no Pinia needed for single-page state)
- **Code highlighting**: Reuse Prism.js (already a dependency)
- **Modals**: Custom CSS (match existing site style)
- **Icons**: Inline SVGs (consistent with Navbar/Footer pattern)
- **File download**: `URL.createObjectURL()` + `<a>` click
- **File upload**: `<input type="file">` + `FileReader`

### CSS Strategy
- Use the site's CSS variables (`--vte-primary`, `--vte-bg`, etc.) for theming
- Add new variables only if needed: `--vte-config-sidebar-width: 240px`
- All component styles are `scoped`
- Dark/light mode works automatically via existing CSS variable overrides

### State Persistence
- Save to `localStorage` on every change (debounced 500ms)
- Load from `localStorage` on page mount
- "Reset" button clears localStorage + loads default template
- Key: `vte-configurator-state`

### Reference UX
- When user toggles "Reference" mode in editor:
  - Value input becomes a searchable dropdown of all existing token paths
  - Filtered to show only tokens from same or higher layer (primitive→semantic OK, semantic→primitive not recommended)
  - Visual indicator shows if reference resolves successfully (green checkmark) or is broken (red warning)
