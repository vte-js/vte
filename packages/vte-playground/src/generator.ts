import { parseTokens, type TokenMap } from "@vte-js/core";
import path from "path";
import { getCachedResult, setCacheResult } from "./cache.js";

/**
 * 根据 tokenMap 生成 playground 组件代码
 */
export function generatePlaygroundComponent(tokenMap: TokenMap, cssPrefix: string = "vte"): string {
  // 按类别分组
  const colors: string[] = [];
  const spacings: string[] = [];
  const fontSizes: string[] = [];
  const borderRadii: string[] = [];
  const shadows: string[] = [];
  const others: string[] = [];

  for (const [path] of tokenMap) {
    if (path.includes("color")) colors.push(path);
    else if (path.includes("spacing")) spacings.push(path);
    else if (path.includes("fontSize")) fontSizes.push(path);
    else if (path.includes("borderRadius")) borderRadii.push(path);
    else if (path.includes("shadow")) shadows.push(path);
    else others.push(path);
  }

  const tokenCount = tokenMap.size;
  const primitiveCount = Array.from(tokenMap.values()).filter(t => t.refs.length === 0).length;
  const referenceCount = tokenMap.size - primitiveCount;

  return `<template>
  <div :class="['playground', { dark: isDark }]">
    <header class="header">
      <div class="header-content">
        <svg class="logo" viewBox="0 0 128 128" width="32" height="32">
          <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
          <path fill="#35495e" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
        </svg>
        <div>
          <h1 class="title">VTE</h1>
          <p class="subtitle">Playground</p>
        </div>
      </div>
      <div class="header-actions">
        <div class="header-stats">
          <span class="stat-item">
            <span class="stat-icon">◆</span>
            <span class="stat-value">${tokenCount}</span>
            <span class="stat-label">Tokens</span>
          </span>
          <span class="stat-item success">
            <span class="stat-icon">●</span>
            <span class="stat-value">${primitiveCount}</span>
            <span class="stat-label">Base</span>
          </span>
          <span class="stat-item info">
            <span class="stat-icon">→</span>
            <span class="stat-value">${referenceCount}</span>
            <span class="stat-label">Ref</span>
          </span>
        </div>
        <div class="header-divider"></div>
        <a href="https://github.com/vte-js/vte" target="_blank" rel="noopener" class="icon-btn github-link" title="GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <button class="icon-btn theme-toggle" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </header>

    <nav class="sidebar">
      <a v-for="section in sections" :key="section.id"
         :href="\`#\${section.id}\`"
         :class="['nav-item', { active: activeSection === section.id }]"
         @click.prevent="scrollTo(section.id)">
        {{ section.icon }} {{ section.name }}
      </a>
    </nav>

    <div class="search-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input v-model="searchQuery" class="search-input" placeholder="Search tokens..." />
        <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">✕</span>
      </div>
      <div class="filter-chips">
        <button v-for="cat in categories" :key="cat.id"
                :class="['chip', { active: activeCategory === cat.id }]"
                @click="activeCategory = cat.id">
          {{ cat.icon }} {{ cat.name }}
          <span v-if="cat.id !== 'all'" class="chip-count">{{ getCategoryCount(cat.id) }}</span>
        </button>
      </div>
    </div>

    <main class="main">
      ${colors.length > 0 ? `
      <!-- 颜色系统 -->
      <section id="colors" class="section" v-show="hasFilteredTokens('color')">
        <h2 class="section-title">🎨 颜色</h2>
        <div class="color-grid">
          ${colors.map(path => `
          <div v-show="matchesFilter('${path}')" class="color-card" :style="{ background: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\`, color: getContrastColor(tokenValues['${path}']) }">
            <span class="color-name">${path.split('.').pop()}</span>
            <span class="color-value">{{ getVarValue('${path}') }}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${spacings.length > 0 ? `
      <!-- 间距 -->
      <section id="spacing" class="section" v-show="hasFilteredTokens('spacing')">
        <h2 class="section-title">📐 间距</h2>
        <div class="spacing-grid">
          ${spacings.map(path => `
          <div v-show="matchesFilter('${path}')" class="spacing-card">
            <div class="spacing-bar" :style="{ width: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }"></div>
            <div class="spacing-info">
              <span class="spacing-name">${path.split('.').pop()}</span>
              <span class="spacing-value">{{ getVarValue('${path}') }}</span>
            </div>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${fontSizes.length > 0 ? `
      <!-- 字号 -->
      <section id="fontSize" class="section" v-show="hasFilteredTokens('fontSize')">
        <h2 class="section-title">📝 字号</h2>
        <div class="typography-list">
          ${fontSizes.map(path => `
          <div v-show="matchesFilter('${path}')" class="typography-card">
            <p :style="{ fontSize: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }" class="typography-preview">
              The quick brown fox jumps over the lazy dog
            </p>
            <div class="typography-info">
              <span class="typography-name">${path.split('.').pop()}</span>
              <span class="typography-value">{{ getVarValue('${path}') }}</span>
            </div>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${borderRadii.length > 0 ? `
      <!-- 圆角 -->
      <section id="borderRadius" class="section" v-show="hasFilteredTokens('borderRadius')">
        <h2 class="section-title">🔲 圆角</h2>
        <div class="radius-grid">
          ${borderRadii.map(path => `
          <div v-show="matchesFilter('${path}')" class="radius-card" :style="{ borderRadius: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }">
            <span class="radius-name">${path.split('.').pop()}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${shadows.length > 0 ? `
      <!-- 阴影 -->
      <section id="shadow" class="section" v-show="hasFilteredTokens('shadow')">
        <h2 class="section-title">🌫️ 阴影</h2>
        <div class="shadow-grid">
          ${shadows.map(path => `
          <div v-show="matchesFilter('${path}')" class="shadow-card" :style="{ boxShadow: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }">
            <span class="shadow-name">${path.split('.').pop()}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${others.length > 0 ? `
      <!-- 其他 -->
      <section id="others" class="section" v-show="hasFilteredTokens('other')">
        <h2 class="section-title">📦 其他 Tokens</h2>
        <div class="token-list">
          ${others.map(path => `
          <div v-show="matchesFilter('${path}')" class="token-item">
            <span class="token-path">${path}</span>
            <code class="token-value">{{ getVarValue('${path}') }}</code>
          </div>`).join('')}
        </div>
      </section>` : ''}

      <!-- 依赖关系图 -->
      <section id="graph" class="section">
        <h2 class="section-title">🔗 依赖关系图</h2>
        <p class="section-desc">点击节点查看完整引用链</p>
        <div class="graph-container">
          <svg :width="graphWidth" :height="graphHeight" class="graph-svg">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-hl" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
              </marker>
            </defs>
            <path v-for="(edge, i) in graphEdges" :key="'edge-'+i"
                  :d="getEdgePath(edge)"
                  :class="['graph-edge', { highlighted: isEdgeHighlighted(edge) }]"
                  fill="none" stroke-width="2"
                  :marker-end="isEdgeHighlighted(edge) ? 'url(#arrowhead-hl)' : 'url(#arrowhead)'" />
            <g v-for="node in graphNodes" :key="node.id"
               :transform="\`translate(\${node.x}, \${node.y})\`"
               :class="['graph-node', { highlighted: highlightedChain.includes(node.id) }]"
               @click="highlightChain(node.id)">
              <circle r="24" :class="['node-circle', \`level-\${node.level}\`]" />
              <text dy="4" text-anchor="middle" class="node-label">{{ node.label }}</text>
              <title>{{ node.id }}: {{ getVarValue(node.id) }}</title>
            </g>
          </svg>
        </div>
        <div v-if="highlightedChain.length" class="chain-info">
          <span class="chain-label">引用链:</span>
          <span class="chain-path">{{ highlightedChain.join(' → ') }}</span>
          <button class="chain-clear" @click="highlightedChain = []">清除</button>
        </div>
      </section>

      <!-- 多平台预览 -->
      <section id="platform" class="section">
        <h2 class="section-title">📱 多平台预览</h2>
        <div class="platform-table-wrapper">
          <table class="platform-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Web</th>
                <th>小程序</th>
                <th>React Native</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(entry, path) in tokenPlatformValues" :key="path">
                <td class="token-path-cell">{{ path }}</td>
                <td><code class="platform-code">{{ entry.web }}</code></td>
                <td><code class="platform-code">{{ entry.mp }}</code></td>
                <td><code class="platform-code">{{ entry.rn }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Token 编辑器 -->
      <section id="editor" class="section">
        <h2 class="section-title">🔧 Token 编辑器</h2>
        <div class="editor-container">
          <div class="editor-input-wrapper">
            <div class="input-icon">🔍</div>
            <input v-model="tokenInput"
                   class="editor-input"
                   placeholder="输入 token 路径，如 semantic.color.primary"
                   @input="filterTokens"
                   @focus="showDropdown = true"
                   @blur="hideDropdown" />
            <div v-if="showDropdown && filteredTokens.length > 0"
                 class="autocomplete-dropdown">
              <div v-for="token in filteredTokens.slice(0, 8)"
                   :key="token"
                   class="autocomplete-item"
                   @mousedown.prevent="selectToken(token)">
                <span class="token-path">{{ token }}</span>
                <span class="token-value">{{ getVarValue(token) }}</span>
              </div>
              <div v-if="filteredTokens.length > 8" class="autocomplete-more">
                +{{ filteredTokens.length - 8 }} more results...
              </div>
            </div>
          </div>

          <div v-if="tokenInput && tokenValue !== 'N/A'" class="editor-result">
            <div class="result-header">
              <span class="result-title">Preview</span>
              <div class="platform-tabs">
                <button v-for="p in platforms" :key="p.id"
                        :class="['platform-tab', { active: activePlatform === p.id }]"
                        @click="activePlatform = p.id">
                  {{ p.icon }} {{ p.name }}
                </button>
              </div>
            </div>
            <div class="result-row">
              <span class="result-label">Token Path</span>
              <code class="result-code" @click="copyToClipboard(tokenInput, 'path')">{{ tokenInput }}</code>
              <button class="copy-btn" @click="copyToClipboard(tokenInput, 'path')" :class="{ copied: copiedField === 'path' }">
                {{ copiedField === 'path' ? '✓' : '📋' }}
              </button>
            </div>
            <div class="result-row">
              <span class="result-label">CSS Variable</span>
              <code class="result-code" @click="copyToClipboard(cssVariable, 'var')">{{ cssVariable }}</code>
              <button class="copy-btn" @click="copyToClipboard(cssVariable, 'var')" :class="{ copied: copiedField === 'var' }">
                {{ copiedField === 'var' ? '✓' : '📋' }}
              </button>
            </div>
            <div class="result-row">
              <span class="result-label">{{ activePlatformLabel }}</span>
              <code class="result-code" @click="copyToClipboard(platformValue, 'platform')">{{ platformValue }}</code>
              <button class="copy-btn" @click="copyToClipboard(platformValue, 'platform')" :class="{ copied: copiedField === 'platform' }">
                {{ copiedField === 'platform' ? '✓' : '📋' }}
              </button>
            </div>
            <div v-if="isValidColor" class="result-row">
              <span class="result-label">Color Preview</span>
              <div class="color-preview" :style="{ background: tokenValue }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Token 导出 -->
      <section id="export" class="section">
        <h2 class="section-title">📤 导出 Tokens</h2>
        <div class="export-container">
          <div class="export-tabs">
            <button v-for="format in exportFormats" :key="format.id"
                    :class="['export-tab', { active: activeExportFormat === format.id }]"
                    @click="activeExportFormat = format.id">
              {{ format.name }}
            </button>
          </div>
          <div class="export-preview">
            <pre class="export-code" v-html="highlightedExport"></pre>
          </div>
          <div class="export-actions">
            <button class="export-btn" @click="copyExport">
              {{ copiedExport ? '✓ Copied!' : '📋 Copy to Clipboard' }}
            </button>
            <button class="export-btn secondary" @click="downloadExport">
              💾 Download File
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Vue Token Engine Playground</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const activeSection = ref("${colors.length > 0 ? 'colors' : 'spacing'}");
const sections = [
${colors.length > 0 ? `  { id: "colors", name: "颜色", icon: "🎨" },` : ''}
${spacings.length > 0 ? `  { id: "spacing", name: "间距", icon: "📐" },` : ''}
${fontSizes.length > 0 ? `  { id: "fontSize", name: "字号", icon: "📝" },` : ''}
${borderRadii.length > 0 ? `  { id: "borderRadius", name: "圆角", icon: "🔲" },` : ''}
${shadows.length > 0 ? `  { id: "shadow", name: "阴影", icon: "🌫️" },` : ''}
  { id: "graph", name: "依赖图", icon: "🔗" },
  { id: "platform", name: "平台预览", icon: "📱" },
  { id: "editor", name: "编辑器", icon: "🔧" },
  { id: "export", name: "导出", icon: "📤" },
];

const tokenInput = ref("semantic.color.primary");
const showDropdown = ref(false);
const copiedField = ref<string | null>(null);
const isDark = ref(false);
const searchQuery = ref("");
const activeCategory = ref("all");

const categories = [
  { id: "all", name: "全部", icon: "📋" },
  { id: "color", name: "颜色", icon: "🎨" },
  { id: "spacing", name: "间距", icon: "📐" },
  { id: "fontSize", name: "字号", icon: "📝" },
  { id: "borderRadius", name: "圆角", icon: "🔲" },
  { id: "shadow", name: "阴影", icon: "🌫️" },
  { id: "other", name: "其他", icon: "📦" },
];

function getCategory(path: string): string {
  if (path.includes("color")) return "color";
  if (path.includes("spacing")) return "spacing";
  if (path.includes("fontSize")) return "fontSize";
  if (path.includes("borderRadius")) return "borderRadius";
  if (path.includes("shadow")) return "shadow";
  return "other";
}

function matchesFilter(path: string): boolean {
  const matchesSearch = !searchQuery.value || path.toLowerCase().includes(searchQuery.value.toLowerCase());
  const matchesCat = activeCategory.value === "all" || getCategory(path) === activeCategory.value;
  return matchesSearch && matchesCat;
}

function getCategoryCount(catId: string): number {
  return allTokens.filter(t => getCategory(t) === catId).length;
}

function hasFilteredTokens(catId: string): boolean {
  return allTokens.some(t => getCategory(t) === catId && matchesFilter(t));
}

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}

const allTokens = [
${Array.from(tokenMap.keys()).map(key => `  "${key}",`).join('\n')}
];

const tokenValues: Record<string, string> = {
${Array.from(tokenMap.entries()).map(([path, token]) => `  "${path}": "${token.value}",`).join('\n')}
};

// 多平台数据
const activePlatform = ref("web");
const platforms = [
  { id: "web", name: "Web", icon: "🌐" },
  { id: "mp", name: "小程序", icon: "📱" },
  { id: "rn", name: "RN", icon: "⚛️" },
];
const activePlatformLabel = computed(() => platforms.find(p => p.id === activePlatform.value)?.name || "Web");

const tokenPlatformValues: Record<string, { web: string; mp: string; rn: string }> = {
${Array.from(tokenMap.entries()).map(([path, token]) => {
  const webVal = `var(--${cssPrefix}-${path.replace(/\./g, '-')})`;
  const pxMatch = token.value.match(/^(\d+(?:\.\d+)?)px$/);
  const remMatch = token.value.match(/^(\d+(?:\.\d+)?)rem$/);
  const mpVal = pxMatch ? `${parseFloat(pxMatch[1]) * 2}rpx` : remMatch ? `${parseFloat(remMatch[1]) * 32}rpx` : token.value;
  const rnVal = pxMatch ? parseFloat(pxMatch[1]) : /^\d+(?:\.\d+)?$/.test(token.value) ? Number(token.value) : token.value;
  const rnStr = typeof rnVal === 'number' ? String(rnVal) : `"${rnVal}"`;
  return `  "${path}": { web: "${webVal}", mp: "${mpVal}", rn: ${rnStr} },`;
}).join('\n')}
};

const platformValue = computed(() => {
  const entry = tokenPlatformValues[tokenInput.value];
  if (!entry) return "N/A";
  const val = entry[activePlatform.value as keyof typeof entry];
  return typeof val === "undefined" ? "N/A" : String(val);
});

// 依赖关系图数据
const tokenRefs: Record<string, string> = {
${Array.from(tokenMap.entries())
  .filter(([, token]) => token.refs.length > 0)
  .map(([path, token]) => `  "${path}": "${token.refs[0]}",`)
  .join('\n')}
};

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
        x: 60 + i * 120,
        y: 40 + yOffset * 90,
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
  for (const [path, ref] of Object.entries(tokenRefs)) {
    edges.push({ from: ref, to: path });
  }
  return edges;
});

const graphWidth = computed(() => {
  const layers = [0, 1, 2, 3];
  const maxInLayer = Math.max(...layers.map(l => graphNodes.value.filter(n => n.level === l).length), 1);
  return Math.max(400, maxInLayer * 120 + 120);
});

const graphHeight = computed(() => {
  const levels = new Set(graphNodes.value.map(n => n.level));
  return levels.size * 90 + 80;
});

const highlightedChain = ref<string[]>([]);

function highlightChain(tokenPath: string) {
  const chain: string[] = [tokenPath];
  let current = tokenPath;
  while (tokenRefs[current]) {
    current = tokenRefs[current];
    chain.push(current);
  }
  highlightedChain.value = chain;
}

function getEdgePath(edge: { from: string; to: string }): string {
  const fromNode = graphNodes.value.find(n => n.id === edge.from);
  const toNode = graphNodes.value.find(n => n.id === edge.to);
  if (!fromNode || !toNode) return "";
  const midY = (fromNode.y + toNode.y) / 2;
  return "M" + fromNode.x + "," + (fromNode.y + 24) + " C" + fromNode.x + "," + midY + " " + toNode.x + "," + midY + " " + toNode.x + "," + (toNode.y - 24);
}

function isEdgeHighlighted(edge: { from: string; to: string }): boolean {
  return highlightedChain.value.includes(edge.from) && highlightedChain.value.includes(edge.to);
}

const filteredTokens = ref<string[]>(allTokens);

const cssPrefix = "${cssPrefix}";
const cssVariable = computed(() => \`var(--\${cssPrefix}-\${tokenInput.value.replace(/\\./g, '-')})\`);
const tokenValue = computed(() => tokenValues[tokenInput.value] || "N/A");
const isValidColor = computed(() => tokenValue.value && (tokenValue.value.startsWith("#") || tokenValue.value.startsWith("rgb")));

function getVarValue(path: string): string {
  return tokenValues[path] || "N/A";
}

function filterTokens() {
  const query = tokenInput.value.toLowerCase();
  filteredTokens.value = allTokens.filter(t => t.toLowerCase().includes(query));
}

function selectToken(token: string) {
  tokenInput.value = token;
  showDropdown.value = false;
}

function hideDropdown() {
  setTimeout(() => { showDropdown.value = false; }, 200);
}

function copyToClipboard(text: string, field: string) {
  navigator.clipboard.writeText(text);
  copiedField.value = field;
  setTimeout(() => { copiedField.value = null; }, 1500);
}

function scrollTo(id: string) {
  activeSection.value = id;
  const el = document.getElementById(id);
  if (el) {
    const headerHeight = 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 40;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function getContrastColor(hex: string): string {
  if (!hex || !hex.startsWith('#')) return '#ffffff';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1f2937' : '#ffffff';
}

// Export functionality
const activeExportFormat = ref("json");
const copiedExport = ref(false);

const exportFormats = [
  { id: "json", name: "JSON" },
  { id: "css", name: "CSS Variables" },
  { id: "scss", name: "SCSS Variables" },
  { id: "js", name: "JavaScript" },
];

const exportContent = computed(() => {
  switch (activeExportFormat.value) {
    case "json":
      return JSON.stringify(tokenValues, null, 2);
    case "css":
      return \`:root {
\${Object.entries(tokenValues).map(([path, value]) => \`  --\${cssPrefix}-\${path.replace(/\\./g, "-")}: \${value};\`).join("\\n")}
}\`;
    case "scss":
      return Object.entries(tokenValues)
        .map(([path, value]) => \`$\${cssPrefix}-\${path.replace(/\\./g, "-")}: \${value};\`)
        .join("\\n");
    case "js":
      return \`export const tokens = \${JSON.stringify(tokenValues, null, 2)};\`;
    default:
      return "";
  }
});

function highlightCode(code: string, format: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (format === 'json' || format === 'js') {
    html = html
      .replace(/"([^"]+)":/g, '<span class="hl-key">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span class="hl-string">"$1"</span>')
      .replace(/: (\\d+)/g, ': <span class="hl-number">$1</span>')
      .replace(/\\b(true|false|null)\\b/g, '<span class="hl-keyword">$1</span>')
      .replace(/\\b(export|const)\\b/g, '<span class="hl-keyword">$1</span>');
  } else if (format === 'css') {
    html = html
      .replace(/(:root|\\.[\\w-]+)/g, '<span class="hl-selector">$1</span>')
      .replace(/(--[\\w-]+)/g, '<span class="hl-variable">$1</span>')
      .replace(/: ([^;]+);/g, ': <span class="hl-value">$1</span>;')
      .replace(/\\{([^}]+)\\}/g, '{<span class="hl-body">$1</span>}');
  } else if (format === 'scss') {
    html = html
      .replace(/(\\$[\\w-]+)/g, '<span class="hl-variable">$1</span>')
      .replace(/: ([^;]+);/g, ': <span class="hl-value">$1</span>;');
  }

  return html;
}

const highlightedExport = computed(() => {
  return highlightCode(exportContent.value, activeExportFormat.value);
});

function copyExport() {
  navigator.clipboard.writeText(exportContent.value);
  copiedExport.value = true;
  setTimeout(() => { copiedExport.value = false; }, 1500);
}

function downloadExport() {
  const extensions: Record<string, string> = {
    json: "json",
    css: "css",
    scss: "scss",
    js: "js",
  };
  const blob = new Blob([exportContent.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = \`design-tokens.\${extensions[activeExportFormat.value]}\`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style token>
.playground {
  min-height: 100vh;
  background: $semantic.color.background;
  color: $semantic.color.text;
}

.header {
  background: linear-gradient(135deg, $semantic.color.primary 0%, color-mix(in srgb, $semantic.color.primary 80%, #000) 100%);
  color: $semantic.color.text-inverse;
  padding: $semantic.spacing.lg $semantic.spacing.xl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.logo {
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.header-content {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.md;
}

.title {
  font-size: $semantic.fontSize.xl;
  font-weight: $semantic.fontWeight.bold;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1;
}

.subtitle {
  font-size: $semantic.fontSize.xs;
  opacity: 0.7;
  margin-top: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.sm;
}

.header-stats {
  display: flex;
  gap: $semantic.spacing.sm;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: $semantic.borderRadius.full;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
}

.stat-icon {
  font-size: 10px;
  opacity: 0.8;
}

.stat-item.success .stat-icon { color: #4ade80; }
.stat-item.info .stat-icon { color: #60a5fa; }

.stat-value {
  font-size: 13px;
  font-weight: $semantic.fontWeight.semibold;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 11px;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.header-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 $semantic.spacing.xs;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: $semantic.borderRadius.full;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  text-decoration: none;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.badge {
  display: none;
}

.badge.success { background: rgba(34, 197, 94, 0.3); }
.badge.info { background: rgba(59, 130, 246, 0.3); }

.sidebar {
  position: fixed;
  left: 0;
  top: 100px;
  width: 180px;
  height: calc(100vh - 100px);
  background: $semantic.color.background;
  border-right: 1px solid $semantic.color.border;
  padding: $semantic.spacing.md;
  overflow-y: auto;
  z-index: 90;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.sm;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  color: $semantic.color.text-secondary;
  text-decoration: none;
  border-radius: $semantic.borderRadius.md;
  margin-bottom: 4px;
  font-size: $semantic.fontSize.sm;
  transition: all 0.15s ease;
}

.nav-item:hover {
  background: $semantic.color.background-secondary;
  color: $semantic.color.text;
}

.nav-item.active {
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
  font-weight: $semantic.fontWeight.medium;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.main {
  margin-left: 180px;
  padding: $semantic.spacing.xl;
  padding-top: $semantic.spacing.xl;
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing.xl;
  max-width: 1200px;
}

.section {
  background: $semantic.color.background;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.xl;
  padding: $semantic.spacing.xl;
  margin-bottom: $semantic.spacing.lg;
  scroll-margin-top: 140px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.section:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.section-title {
  font-size: $semantic.fontSize.xl;
  font-weight: $semantic.fontWeight.semibold;
  margin-bottom: $semantic.spacing.xl;
  padding-bottom: $semantic.spacing.md;
  border-bottom: 2px solid $semantic.color.border;
  display: flex;
  align-items: center;
  gap: $semantic.spacing.sm;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: $semantic.spacing.md;
}

.color-card {
  height: 110px;
  border-radius: $semantic.borderRadius.lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $semantic.spacing.xs;
  font-size: $semantic.fontSize.xs;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.color-name { font-weight: $semantic.fontWeight.semibold; font-size: $semantic.fontSize.sm; color: inherit; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }
.color-value { font-size: 10px; font-family: monospace; padding: 3px 8px; border-radius: 4px; color: inherit; background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(4px); }

.spacing-grid { display: flex; flex-direction: column; gap: $semantic.spacing.md; }
.spacing-card { display: flex; align-items: center; gap: $semantic.spacing.md; padding: $semantic.spacing.md; border-radius: $semantic.borderRadius.md; transition: all 0.2s ease; border: 1px solid transparent; }
.spacing-card:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.border; }
.spacing-bar { height: 36px; background: linear-gradient(135deg, $semantic.color.primary, color-mix(in srgb, $semantic.color.primary 70%, #fff)); border-radius: $semantic.borderRadius.sm; min-width: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.spacing-info { display: flex; flex-direction: column; gap: $semantic.spacing.xs; }
.spacing-name { font-weight: $semantic.fontWeight.semibold; font-family: monospace; font-size: $semantic.fontSize.sm; }
.spacing-value { color: $semantic.color.text-tertiary; font-family: monospace; font-size: $semantic.fontSize.xs; }

.typography-list { display: flex; flex-direction: column; gap: $semantic.spacing.md; }
.typography-card { display: flex; align-items: center; justify-content: space-between; padding: $semantic.spacing.lg; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.md; transition: all 0.2s ease; }
.typography-card:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; }
.typography-preview { margin: 0; line-height: 1.6; }
.typography-info { display: flex; flex-direction: column; gap: $semantic.spacing.xs; align-items: flex-end; }
.typography-name { font-weight: $semantic.fontWeight.medium; font-family: monospace; font-size: $semantic.fontSize.sm; background: $semantic.color.background-secondary; padding: 2px 8px; border-radius: 4px; }
.typography-value { color: $semantic.color.text-tertiary; font-family: monospace; font-size: $semantic.fontSize.xs; }

.radius-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: $semantic.spacing.md; }
.radius-card { width: 110px; height: 110px; background: linear-gradient(135deg, $semantic.color.primary, color-mix(in srgb, $semantic.color.primary 70%, #fff)); color: white; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.radius-card:hover { transform: scale(1.08) rotate(2deg); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }

.shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: $semantic.spacing.xl; }
.shadow-card { width: 100%; height: 120px; background: $semantic.color.background; border-radius: $semantic.borderRadius.lg; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.shadow-card:hover { transform: translateY(-6px); }

.token-list { display: flex; flex-direction: column; gap: $semantic.spacing.md; }
.token-item { display: flex; justify-content: space-between; align-items: center; padding: $semantic.spacing.md $semantic.spacing.lg; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.md; transition: all 0.2s ease; }
.token-item:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; transform: translateX(4px); }
.token-path { font-family: monospace; font-size: $semantic.fontSize.sm; color: $semantic.color.text; font-weight: $semantic.fontWeight.medium; }
.token-value { font-size: $semantic.fontSize.xs; color: $semantic.color.text-tertiary; font-family: monospace; padding: $semantic.spacing.xs $semantic.spacing.sm; background: $semantic.color.background-secondary; border-radius: $semantic.borderRadius.sm; border: 1px solid $semantic.color.border; }

.editor-container { display: flex; flex-direction: column; gap: $semantic.spacing.lg; }
.editor-input-wrapper { position: relative; }
.editor-input { width: 100%; padding: $semantic.spacing.md $semantic.spacing.xl; border: 2px solid $semantic.color.border; border-radius: $semantic.borderRadius.lg; font-family: monospace; font-size: $semantic.fontSize.base; transition: all 0.2s ease; background: $semantic.color.background; box-sizing: border-box; }
.editor-input:focus { outline: none; border-color: $semantic.color.primary; box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.15); }
.editor-input::placeholder { color: $semantic.color.text-tertiary; font-style: italic; }
.editor-result { background: $semantic.color.background-secondary; border-radius: $semantic.borderRadius.lg; padding: $semantic.spacing.xl; margin-top: $semantic.spacing.md; border: 1px solid $semantic.color.border; }
.result-row { display: flex; align-items: center; gap: $semantic.spacing.md; padding: $semantic.spacing.md 0; border-bottom: 1px solid $semantic.color.border; }
.result-row:last-child { border-bottom: none; }
.result-label { font-weight: $semantic.fontWeight.semibold; min-width: 120px; color: $semantic.color.text-secondary; font-size: $semantic.fontSize.sm; text-transform: uppercase; letter-spacing: 0.05em; }
.result-code { font-family: monospace; padding: $semantic.spacing.sm $semantic.spacing.md; background: $semantic.color.background; border-radius: $semantic.borderRadius.sm; border: 1px solid $semantic.color.border; flex: 1; font-size: $semantic.fontSize.sm; word-break: break-all; cursor: pointer; transition: all 0.15s ease; }
.result-code:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; }

.copy-btn { padding: $semantic.spacing.xs $semantic.spacing.sm; background: transparent; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.sm; cursor: pointer; font-size: $semantic.fontSize.sm; transition: all 0.15s ease; flex-shrink: 0; }
.copy-btn:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; }
.copy-btn.copied { background: $semantic.color.success; color: white; border-color: $semantic.color.success; }

.input-icon { position: absolute; left: $semantic.spacing.md; top: 50%; transform: translateY(-50%); font-size: $semantic.fontSize.lg; color: $semantic.color.text-tertiary; pointer-events: none; }
.editor-input { padding-left: $semantic.spacing.xl !important; }

.autocomplete-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: $semantic.color.background; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.lg; box-shadow: $semantic.shadow.lg; max-height: 300px; overflow-y: auto; z-index: 1000; margin-top: $semantic.spacing.xs; }
.autocomplete-item { display: flex; justify-content: space-between; align-items: center; padding: $semantic.spacing.sm $semantic.spacing.md; cursor: pointer; transition: background 0.15s ease; }
.autocomplete-item:hover { background: $semantic.color.background-secondary; }
.autocomplete-item .token-path { font-family: monospace; font-size: $semantic.fontSize.sm; color: $semantic.color.text; }
.autocomplete-item .token-value { font-size: $semantic.fontSize.xs; color: $semantic.color.text-tertiary; font-family: monospace; background: $semantic.color.background-secondary; padding: $semantic.spacing.xs $semantic.spacing.sm; border-radius: $semantic.borderRadius.sm; }
.autocomplete-more { padding: $semantic.spacing.sm $semantic.spacing.md; text-align: center; color: $semantic.color.text-tertiary; font-size: $semantic.fontSize.xs; border-top: 1px solid $semantic.color.border; }

.result-header { margin-bottom: $semantic.spacing.md; padding-bottom: $semantic.spacing.sm; border-bottom: 1px solid $semantic.color.border; }
.result-title { font-weight: $semantic.fontWeight.semibold; color: $semantic.color.text-secondary; font-size: $semantic.fontSize.sm; text-transform: uppercase; letter-spacing: 0.05em; }

.color-preview { width: 48px; height: 48px; border-radius: $semantic.borderRadius.md; border: 2px solid $semantic.color.border; box-shadow: $semantic.shadow.sm; }

.export-container { display: flex; flex-direction: column; gap: $semantic.spacing.lg; }
.export-tabs { display: flex; gap: $semantic.spacing.sm; border-bottom: 1px solid $semantic.color.border; padding-bottom: $semantic.spacing.sm; }
.export-tab { padding: $semantic.spacing.sm $semantic.spacing.md; border: none; background: transparent; cursor: pointer; font-size: $semantic.fontSize.sm; color: $semantic.color.text-secondary; border-radius: $semantic.borderRadius.sm; transition: all 0.2s ease; }
.export-tab:hover { background: $semantic.color.background-secondary; }
.export-tab.active { background: $semantic.color.primary; color: $semantic.color.text-inverse; }
.export-preview { background: $semantic.color.background-secondary; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.md; padding: $semantic.spacing.lg; max-height: 400px; overflow: auto; }
.export-code { margin: 0; font-family: monospace; font-size: $semantic.fontSize.sm; white-space: pre-wrap; word-break: break-all; line-height: 1.6; }
.export-actions { display: flex; gap: $semantic.spacing.md; }
.export-btn { padding: $semantic.spacing.sm $semantic.spacing.lg; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.md; cursor: pointer; font-size: $semantic.fontSize.sm; transition: all 0.2s ease; display: flex; align-items: center; gap: $semantic.spacing.sm; }
.export-btn:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; }
.export-btn.secondary { background: transparent; }

.hl-key { color: #9333ea; }
.hl-string { color: #16a34a; }
.hl-number { color: #d97706; }
.hl-keyword { color: #2563eb; }
.hl-selector { color: #dc2626; }
.hl-variable { color: #0891b2; }
.hl-value { color: #16a34a; }
.hl-body { color: $semantic.color.text; }

.footer { background: $semantic.color.background-secondary; padding: $semantic.spacing.xl $semantic.spacing.xl; text-align: center; color: $semantic.color.text-tertiary; border-top: 1px solid $semantic.color.border; margin-left: 180px; font-size: $semantic.fontSize.sm; }

/* 搜索栏 */
.search-bar { position: sticky; top: 72px; z-index: 80; background: $semantic.color.background; padding: $semantic.spacing.md $semantic.spacing.xl; border-bottom: 1px solid $semantic.color.border; margin-left: 180px; }
.search-input-wrapper { position: relative; max-width: 600px; }
.search-icon { position: absolute; left: $semantic.spacing.md; top: 50%; transform: translateY(-50%); font-size: $semantic.fontSize.sm; color: $semantic.color.text-tertiary; pointer-events: none; }
.search-input { width: 100%; padding: $semantic.spacing.sm $semantic.spacing.xl; padding-left: $semantic.spacing.xl; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.full; font-size: $semantic.fontSize.sm; background: $semantic.color.background-secondary; transition: all 0.2s; box-sizing: border-box; }
.search-input:focus { outline: none; border-color: $semantic.color.primary; box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1); background: $semantic.color.background; }
.search-clear { position: absolute; right: $semantic.spacing.md; top: 50%; transform: translateY(-50%); cursor: pointer; color: $semantic.color.text-tertiary; font-size: $semantic.fontSize.xs; padding: 2px 6px; border-radius: 50%; }
.search-clear:hover { background: $semantic.color.background-secondary; color: $semantic.color.text; }
.filter-chips { display: flex; gap: $semantic.spacing.xs; margin-top: $semantic.spacing.sm; flex-wrap: wrap; }
.chip { padding: 4px 12px; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.full; background: transparent; cursor: pointer; font-size: $semantic.fontSize.xs; color: $semantic.color.text-secondary; transition: all 0.15s; display: flex; align-items: center; gap: 4px; }
.chip:hover { background: $semantic.color.background-secondary; border-color: $semantic.color.primary; }
.chip.active { background: $semantic.color.primary; color: $semantic.color.text-inverse; border-color: $semantic.color.primary; }
.chip-count { font-size: 10px; opacity: 0.7; }

.section-desc { color: $semantic.color.text-tertiary; font-size: $semantic.fontSize.sm; margin-top: -8px; margin-bottom: $semantic.spacing.lg; }

/* 依赖关系图 */
.graph-container { overflow-x: auto; padding: $semantic.spacing.md; background: $semantic.color.background-secondary; border-radius: $semantic.borderRadius.lg; border: 1px solid $semantic.color.border; }
.graph-svg { display: block; margin: 0 auto; }
.graph-edge { stroke: $semantic.color.border; transition: stroke 0.2s; }
.graph-edge.highlighted { stroke: #3b82f6; stroke-width: 3; }
.graph-node { cursor: pointer; }
.node-circle { fill: $semantic.color.background; stroke: $semantic.color.border; stroke-width: 2; transition: all 0.2s; }
.node-circle.level-0 { fill: #dbeafe; stroke: #3b82f6; }
.node-circle.level-1 { fill: #dcfce7; stroke: #22c55e; }
.node-circle.level-2 { fill: #fef3c7; stroke: #eab308; }
.node-circle.level-3 { fill: #f3e8ff; stroke: #9333ea; }
.graph-node:hover .node-circle { transform: scale(1.15); stroke-width: 3; }
.graph-node.highlighted .node-circle { stroke: #3b82f6; stroke-width: 3; filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.4)); }
.node-label { font-size: 10px; font-family: monospace; pointer-events: none; fill: $semantic.color.text; }
.chain-info { margin-top: $semantic.spacing.md; padding: $semantic.spacing.md; background: $semantic.color.background-secondary; border-radius: $semantic.borderRadius.md; border: 1px solid $semantic.color.border; display: flex; align-items: center; gap: $semantic.spacing.sm; }
.chain-label { font-weight: $semantic.fontWeight.semibold; font-size: $semantic.fontSize.sm; }
.chain-path { font-family: monospace; color: #3b82f6; font-size: $semantic.fontSize.sm; }
.chain-clear { padding: 2px 8px; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.sm; background: transparent; cursor: pointer; font-size: $semantic.fontSize.xs; margin-left: auto; }
.chain-clear:hover { background: $semantic.color.background-secondary; }

/* 多平台预览 */
.platform-table-wrapper { overflow-x: auto; }
.platform-table { width: 100%; border-collapse: collapse; font-size: $semantic.fontSize.sm; }
.platform-table th { text-align: left; padding: $semantic.spacing.sm $semantic.spacing.md; border-bottom: 2px solid $semantic.color.border; color: $semantic.color.text-secondary; font-weight: $semantic.fontWeight.semibold; font-size: $semantic.fontSize.xs; text-transform: uppercase; letter-spacing: 0.05em; }
.platform-table td { padding: $semantic.spacing.sm $semantic.spacing.md; border-bottom: 1px solid $semantic.color.border; }
.platform-table tr:hover { background: $semantic.color.background-secondary; }
.token-path-cell { font-family: monospace; font-weight: $semantic.fontWeight.medium; white-space: nowrap; }
.platform-code { font-size: $semantic.fontSize.xs; font-family: monospace; background: $semantic.color.background-secondary; padding: 2px 8px; border-radius: $semantic.borderRadius.sm; border: 1px solid $semantic.color.border; white-space: nowrap; }
.platform-tabs { display: flex; gap: $semantic.spacing.xs; }
.platform-tab { padding: 4px 10px; border: 1px solid $semantic.color.border; border-radius: $semantic.borderRadius.sm; background: transparent; cursor: pointer; font-size: $semantic.fontSize.xs; color: $semantic.color.text-secondary; transition: all 0.15s; }
.platform-tab:hover { background: $semantic.color.background-secondary; }
.platform-tab.active { background: $semantic.color.primary; color: $semantic.color.text-inverse; border-color: $semantic.color.primary; }
.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: $semantic.spacing.md; padding-bottom: $semantic.spacing.sm; border-bottom: 1px solid $semantic.color.border; }

/* 暗黑模式 */
.dark {
  background: #0f172a;
  color: #e2e8f0;
}

.dark .header {
  background: linear-gradient(135deg, #1e293b, #334155);
}

.dark .sidebar {
  background: #1e293b;
  border-color: #334155;
}

.dark .nav-item { color: #94a3b8; }
.dark .nav-item:hover { background: #334155; color: #e2e8f0; }
.dark .nav-item.active { background: $semantic.color.primary; color: white; }

.dark .section {
  background: #1e293b;
  border-color: #334155;
}

.dark .section-title { color: #f1f5f9; border-color: #475569; }

.dark .color-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); }
.dark .color-card:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4); }

.dark .spacing-card:hover { background: #334155; }
.dark .spacing-bar { background: $semantic.color.primary; }
.dark .spacing-name { color: #e2e8f0; }
.dark .spacing-value { color: #94a3b8; }

.dark .typography-card { border-color: #334155; }
.dark .typography-card:hover { background: #334155; }
.dark .typography-preview { color: #e2e8f0; }
.dark .typography-name { color: #e2e8f0; background: #334155; }
.dark .typography-value { color: #94a3b8; }

.dark .radius-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); }

.dark .shadow-card { background: #1e293b; border-color: #334155; }

.dark .token-item { border-color: #334155; }
.dark .token-item:hover { background: #334155; }
.dark .token-path { color: #e2e8f0; }
.dark .token-value { background: #334155; color: #94a3b8; border-color: #475569; }

.dark .editor-input {
  background: #0f172a;
  border-color: #334155;
  color: #e2e8f0;
}
.dark .editor-input:focus { border-color: $semantic.color.primary; }
.dark .editor-input::placeholder { color: #64748b; }

.dark .editor-result { background: #0f172a; border-color: #334155; }
.dark .result-label { color: #94a3b8; }
.dark .result-code { background: #1e293b; border-color: #334155; color: #e2e8f0; }

.dark .autocomplete-dropdown { background: #1e293b; border-color: #334155; }
.dark .autocomplete-item:hover { background: #334155; }
.dark .autocomplete-item .token-path { color: #e2e8f0; }
.dark .autocomplete-item .token-value { background: #334155; color: #94a3b8; }
.dark .autocomplete-more { border-color: #334155; color: #64748b; }

.dark .export-tab { color: #94a3b8; }
.dark .export-tab:hover { background: #334155; color: #e2e8f0; }
.dark .export-tab.active { background: $semantic.color.primary; color: white; }
.dark .export-preview { background: #0f172a; border-color: #334155; }
.dark .export-code { color: #e2e8f0; }
.dark .export-btn { border-color: #334155; color: #94a3b8; }
.dark .export-btn:hover { background: #334155; border-color: $semantic.color.primary; color: #e2e8f0; }
.dark .export-btn.secondary { background: transparent; color: #94a3b8; }

.dark .result-header { border-color: #334155; }
.dark .result-title { color: #94a3b8; }

.dark .color-preview { border-color: #334155; }

.dark .copy-btn { border-color: #334155; color: #94a3b8; }
.dark .copy-btn:hover { background: #334155; border-color: $semantic.color.primary; color: #e2e8f0; }

.dark .footer { background: #0f172a; border-color: #334155; color: #64748b; }

.dark .badge { background: rgba(255, 255, 255, 0.1); }
.dark .badge.success { background: rgba(34, 197, 94, 0.2); }
.dark .badge.info { background: rgba(59, 130, 246, 0.2); }

/* 暗黑模式 - 搜索栏 */
.dark .search-bar { background: #1e293b; border-color: #334155; }
.dark .search-input { background: #0f172a; border-color: #334155; color: #e2e8f0; }
.dark .search-input:focus { border-color: $semantic.color.primary; background: #0f172a; }
.dark .search-clear { color: #64748b; }
.dark .search-clear:hover { background: #334155; color: #e2e8f0; }
.dark .chip { border-color: #334155; color: #94a3b8; }
.dark .chip:hover { background: #334155; border-color: $semantic.color.primary; }
.dark .chip.active { background: $semantic.color.primary; color: white; border-color: $semantic.color.primary; }

/* 暗黑模式 - 依赖图 */
.dark .graph-container { background: #0f172a; border-color: #334155; }
.dark .graph-edge { stroke: #475569; }
.dark .graph-edge.highlighted { stroke: #60a5fa; }
.dark .node-circle.level-0 { fill: #1e3a5f; stroke: #60a5fa; }
.dark .node-circle.level-1 { fill: #14532d; stroke: #4ade80; }
.dark .node-circle.level-2 { fill: #451a03; stroke: #fbbf24; }
.dark .node-circle.level-3 { fill: #3b0764; stroke: #c084fc; }
.dark .graph-node.highlighted .node-circle { stroke: #60a5fa; filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.4)); }
.dark .node-label { fill: #e2e8f0; }
.dark .chain-info { background: #0f172a; border-color: #334155; }
.dark .chain-path { color: #60a5fa; }
.dark .chain-clear { border-color: #334155; color: #94a3b8; }
.dark .chain-clear:hover { background: #334155; }

/* 暗黑模式 - 多平台 */
.dark .platform-table th { color: #94a3b8; border-color: #334155; }
.dark .platform-table td { border-color: #334155; }
.dark .platform-table tr:hover { background: #334155; }
.dark .platform-code { background: #0f172a; border-color: #334155; color: #e2e8f0; }
.dark .platform-tab { border-color: #334155; color: #94a3b8; }
.dark .platform-tab:hover { background: #334155; }
.dark .platform-tab.active { background: $semantic.color.primary; color: white; }

.dark .hl-key { color: #c084fc; }
.dark .hl-string { color: #4ade80; }
.dark .hl-number { color: #fbbf24; }
.dark .hl-keyword { color: #60a5fa; }
.dark .hl-selector { color: #f87171; }
.dark .hl-variable { color: #22d3ee; }
.dark .hl-value { color: #4ade80; }
.dark .hl-body { color: #e2e8f0; }
</style>
`;
}

/**
 * 生成 playground 入口文件
 */
export function generatePlaygroundEntry(): string {
  return `import { createApp } from "vue";
import Playground from "./Playground.vue";

createApp(Playground).mount("#app");
`;
}

/**
 * 生成 playground index.html
 */
export function generatePlaygroundHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VTE Playground</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./main.ts"></script>
</body>
</html>
`;
}

/**
 * 生成 playground vite.config.ts
 */
export function generateViteConfig(projectRoot: string, tokenFile: string, cssPrefix: string = "vte"): string {
  // 计算相对路径
  const outputDir = path.join(projectRoot, ".vte-playground");
  const tokenPath = path.relative(outputDir, tokenFile);

  return `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte-js/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte({
      tokenFile: "${tokenPath}",
      cssPrefix: "${cssPrefix}",
    }),
  ],
});
`;
}

/**
 * 生成 playground package.json
 */
export function generatePackageJson(projectName: string): string {
  return JSON.stringify({
    name: `${projectName}-playground`,
    version: "0.0.0",
    private: true,
    scripts: {
      dev: "vite",
    },
    dependencies: {
      vue: "^3.5.0",
      "@vte-js/core": "workspace:*",
      "@vte-js/vite-plugin": "workspace:*",
    },
    devDependencies: {
      "@vitejs/plugin-vue": "^5.0.0",
      vite: "^6.0.0",
    },
  }, null, 2);
}
