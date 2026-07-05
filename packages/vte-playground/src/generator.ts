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
        <h1 class="title">VTE Playground</h1>
        <p class="subtitle">Auto-generated from design-tokens.ts</p>
      </div>
      <div class="header-actions">
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light' : 'Switch to dark'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
        <div class="header-stats">
          <span class="badge">${tokenCount} tokens</span>
          <span class="badge success">${primitiveCount} primitives</span>
          <span class="badge info">${referenceCount} references</span>
        </div>
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

    <main class="main">
      ${colors.length > 0 ? `
      <!-- 颜色系统 -->
      <section id="colors" class="section">
        <h2 class="section-title">🎨 颜色</h2>
        <div class="color-grid">
          ${colors.map(path => `
          <div class="color-card" :style="{ background: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }">
            <span class="color-name">${path.split('.').pop()}</span>
            <span class="color-value">{{ getVarValue('${path}') }}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${spacings.length > 0 ? `
      <!-- 间距 -->
      <section id="spacing" class="section">
        <h2 class="section-title">📐 间距</h2>
        <div class="spacing-grid">
          ${spacings.map(path => `
          <div class="spacing-card">
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
      <section id="fontSize" class="section">
        <h2 class="section-title">📝 字号</h2>
        <div class="typography-list">
          ${fontSizes.map(path => `
          <div class="typography-card">
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
      <section id="borderRadius" class="section">
        <h2 class="section-title">🔲 圆角</h2>
        <div class="radius-grid">
          ${borderRadii.map(path => `
          <div class="radius-card" :style="{ borderRadius: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }">
            <span class="radius-name">${path.split('.').pop()}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${shadows.length > 0 ? `
      <!-- 阴影 -->
      <section id="shadow" class="section">
        <h2 class="section-title">🌫️ 阴影</h2>
        <div class="shadow-grid">
          ${shadows.map(path => `
          <div class="shadow-card" :style="{ boxShadow: \`var(--${cssPrefix}-${path.replace(/\./g, '-')})\` }">
            <span class="shadow-name">${path.split('.').pop()}</span>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${others.length > 0 ? `
      <!-- 其他 -->
      <section id="others" class="section">
        <h2 class="section-title">📦 其他 Tokens</h2>
        <div class="token-list">
          ${others.map(path => `
          <div class="token-item">
            <span class="token-path">${path}</span>
            <code class="token-value">{{ getVarValue('${path}') }}</code>
          </div>`).join('')}
        </div>
      </section>` : ''}

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
              <span class="result-label">Value</span>
              <code class="result-code" @click="copyToClipboard(tokenValue, 'value')">{{ tokenValue }}</code>
              <button class="copy-btn" @click="copyToClipboard(tokenValue, 'value')" :class="{ copied: copiedField === 'value' }">
                {{ copiedField === 'value' ? '✓' : '📋' }}
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
            <pre class="export-code">{{ exportContent }}</pre>
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
  { id: "editor", name: "编辑器", icon: "🔧" },
  { id: "export", name: "导出", icon: "📤" },
];

const tokenInput = ref("semantic.color.primary");
const showDropdown = ref(false);
const copiedField = ref<string | null>(null);
const isDark = ref(false);

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

.title {
  font-size: $semantic.fontSize.2xl;
  font-weight: $semantic.fontWeight.bold;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: $semantic.fontSize.sm;
  opacity: 0.85;
  margin-top: $semantic.spacing.xs;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.md;
}

.header-stats {
  display: flex;
  gap: $semantic.spacing.sm;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: $semantic.borderRadius.full;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  font-size: $semantic.fontSize.xl;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.badge {
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  background: rgba(255, 255, 255, 0.2);
  border-radius: $semantic.borderRadius.full;
  font-size: $semantic.fontSize.sm;
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
  padding: $semantic.spacing.lg $semantic.spacing.md;
  overflow-y: auto;
  z-index: 90;
}

.nav-item {
  display: block;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  color: $semantic.color.text-secondary;
  text-decoration: none;
  border-radius: $semantic.borderRadius.md;
  margin-bottom: $semantic.spacing.sm;
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
  color: white;
  font-size: $semantic.fontSize.xs;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.color-name { font-weight: $semantic.fontWeight.semibold; margin-top: $semantic.spacing.sm; }
.color-value { font-size: 10px; opacity: 0.85; font-family: monospace; background: rgba(0, 0, 0, 0.15); padding: 2px 6px; border-radius: 4px; }

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
.typography-name { font-weight: $semantic.fontWeight.semibold; font-family: monospace; font-size: $semantic.fontSize.sm; background: $semantic.color.background-secondary; padding: 2px 8px; border-radius: 4px; }
.typography-value { color: $semantic.color.text-tertiary; font-family: monospace; font-size: $semantic.fontSize.xs; }
.typography-info { display: flex; flex-direction: column; gap: $semantic.spacing.xs; align-items: flex-end; }
.typography-name { font-weight: $semantic.fontWeight.medium; font-family: monospace; font-size: $semantic.fontSize.sm; }
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
.editor-input { width: 100%; padding: $semantic.spacing.md $semantic.spacing.xl; border: 2px solid $semantic.color.border; border-radius: $semantic.borderRadius.lg; font-family: monospace; font-size: $semantic.fontSize.base; transition: all 0.2s ease; background: $semantic.color.background; }
.editor-input:focus { outline: none; border-color: $semantic.color.primary; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); }
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

.footer { background: $semantic.color.background-secondary; padding: $semantic.spacing.xl $semantic.spacing.xl; text-align: center; color: $semantic.color.text-tertiary; border-top: 1px solid $semantic.color.border; margin-left: 180px; font-size: $semantic.fontSize.sm; }

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
.dark .color-name { color: #f1f5f9; }
.dark .color-value { background: rgba(255, 255, 255, 0.1); color: #cbd5e1; }

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

.dark .result-header { border-color: #334155; }
.dark .result-title { color: #94a3b8; }

.dark .color-preview { border-color: #334155; }

.dark .copy-btn { border-color: #334155; color: #94a3b8; }
.dark .copy-btn:hover { background: #334155; border-color: $semantic.color.primary; color: #e2e8f0; }

.dark .footer { background: #0f172a; border-color: #334155; color: #64748b; }

.dark .badge { background: rgba(255, 255, 255, 0.1); }
.dark .badge.success { background: rgba(34, 197, 94, 0.2); }
.dark .badge.info { background: rgba(59, 130, 246, 0.2); }
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
export function generateViteConfig(projectRoot: string, cssPrefix: string = "vte"): string {
  // 计算相对路径
  const tokenPath = path.relative(
    path.join(projectRoot, ".vte-playground"),
    path.join(projectRoot, "design-tokens.ts")
  );

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
