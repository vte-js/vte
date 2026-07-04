<template>
  <div class="playground">
    <header class="header">
      <div class="header-content">
        <h1 class="title">VTE Playground</h1>
        <p class="subtitle">Vue Token Engine 可视化调试工具</p>
      </div>
      <div class="header-stats">
        <span class="badge">{{ tokenCount }} tokens</span>
        <span class="badge success">{{ primitiveCount }} primitives</span>
        <span class="badge info">{{ referenceCount }} references</span>
      </div>
    </header>

    <nav class="sidebar">
      <a v-for="section in sections" :key="section.id"
         :href="`#${section.id}`"
         :class="['nav-item', { active: activeSection === section.id }]"
         @click.prevent="scrollTo(section.id)">
        {{ section.icon }} {{ section.name }}
      </a>
    </nav>

    <main class="main">
      <!-- 颜色系统 -->
      <section id="colors" class="section">
        <h2 class="section-title">🎨 颜色系统</h2>

        <div class="subsection">
          <h3 class="subsection-title">Primary Palette</h3>
          <div class="color-grid">
            <div v-for="n in 8" :key="`blue-${n}`"
                 class="color-card"
                 :style="{ background: `var(--vte-primitive-blue-${n * 100})` }">
              <span class="color-name">blue-{{ n * 100 }}</span>
              <span class="color-value">{{ getVarValue(`primitive.blue.${n * 100}`) }}</span>
            </div>
          </div>
        </div>

        <div class="subsection">
          <h3 class="subsection-title">Semantic Colors</h3>
          <div class="semantic-colors">
            <div class="semantic-card" v-for="color in semanticColors" :key="color.name">
              <div class="color-preview" :style="{ background: `var(--vte-semantic-color-${color.name})` }"></div>
              <div class="color-info">
                <span class="color-name">{{ color.name }}</span>
                <span class="color-path">$semantic.color.{{ color.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 间距系统 -->
      <section id="spacing" class="section">
        <h2 class="section-title">📐 间距系统</h2>
        <div class="spacing-grid">
          <div v-for="size in spacingSizes" :key="size"
               class="spacing-card">
            <div class="spacing-bar" :style="{ width: `var(--vte-semantic-spacing-${size})` }"></div>
            <div class="spacing-info">
              <span class="spacing-name">{{ size }}</span>
              <span class="spacing-value">{{ getVarValue(`semantic.spacing.${size}`) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 字号系统 -->
      <section id="typography" class="section">
        <h2 class="section-title">📝 字号系统</h2>
        <div class="typography-list">
          <div v-for="size in fontSizeSizes" :key="size" class="typography-card">
            <p :style="{ fontSize: `var(--vte-semantic-fontSize-${size})` }" class="typography-preview">
              The quick brown fox jumps over the lazy dog
            </p>
            <div class="typography-info">
              <span class="typography-name">{{ size }}</span>
              <span class="typography-value">{{ getVarValue(`semantic.fontSize.${size}`) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 圆角系统 -->
      <section id="radius" class="section">
        <h2 class="section-title">🔲 圆角系统</h2>
        <div class="radius-grid">
          <div v-for="size in radiusSizes" :key="size"
               class="radius-card"
               :style="{ borderRadius: `var(--vte-semantic-borderRadius-${size})` }">
            <span class="radius-name">{{ size }}</span>
          </div>
        </div>
      </section>

      <!-- 阴影系统 -->
      <section id="shadows" class="section">
        <h2 class="section-title">🌫️ 阴影系统</h2>
        <div class="shadow-grid">
          <div v-for="size in shadowSizes" :key="size"
               class="shadow-card"
               :style="{ boxShadow: `var(--vte-semantic-shadow-${size})` }">
            <span class="shadow-name">{{ size }}</span>
          </div>
        </div>
      </section>

      <!-- 组件库 -->
      <section id="components" class="section">
        <h2 class="section-title">🧩 组件库</h2>

        <div class="subsection">
          <h3 class="subsection-title">Buttons</h3>
          <div class="component-row">
            <button v-for="variant in buttonVariants" :key="variant"
                    :class="['btn', `btn-${variant}`]">
              {{ variant }}
            </button>
          </div>
          <div class="component-row">
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary">Medium</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
        </div>

        <div class="subsection">
          <h3 class="subsection-title">Form Elements</h3>
          <div class="form-grid">
            <div class="form-item">
              <label class="form-label">Default</label>
              <input type="text" class="form-input" placeholder="Enter text..." />
            </div>
            <div class="form-item">
              <label class="form-label">Success</label>
              <input type="text" class="form-input success" value="Valid input" />
            </div>
            <div class="form-item">
              <label class="form-label">Error</label>
              <input type="text" class="form-input error" value="Invalid input" />
            </div>
          </div>
        </div>

        <div class="subsection">
          <h3 class="subsection-title">Cards</h3>
          <div class="card-grid">
            <div class="card">
              <div class="card-header">Default Card</div>
              <div class="card-body">Card content here.</div>
            </div>
            <div class="card bordered">
              <div class="card-header">Bordered</div>
              <div class="card-body">With border.</div>
            </div>
            <div class="card elevated">
              <div class="card-header">Elevated</div>
              <div class="card-body">With shadow.</div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <h3 class="subsection-title">Alerts</h3>
          <div class="alert-row">
            <div class="alert success">✓ Success</div>
            <div class="alert warning">⚠ Warning</div>
            <div class="alert error">✕ Error</div>
            <div class="alert info">ℹ Info</div>
          </div>
        </div>
      </section>

      <!-- Token 编辑器 -->
      <section id="editor" class="section">
        <h2 class="section-title">🔧 Token 编辑器</h2>

        <div class="editor-container">
          <div class="editor-input-wrapper">
            <label class="form-label">Token Path</label>
            <div class="autocomplete-wrapper">
              <input v-model="tokenInput"
                     class="form-input autocomplete-input"
                     placeholder="输入 token 路径，如 semantic.color"
                     @input="filterTokens"
                     @focus="showDropdown = true"
                     @blur="hideDropdown" />
              <div v-if="showDropdown && filteredTokens.length > 0"
                   class="autocomplete-dropdown">
                <div v-for="token in filteredTokens.slice(0, 10)"
                     :key="token"
                     class="autocomplete-item"
                     @mousedown.prevent="selectToken(token)">
                  <span class="token-path">{{ token }}</span>
                  <span class="token-value">{{ getVarValue(token) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="tokenInput" class="editor-result">
            <div class="result-row">
              <span class="result-label">CSS Variable:</span>
              <code class="result-code">{{ cssVariable }}</code>
              <button class="copy-btn" @click="copyToClipboard(cssVariable)">Copy</button>
            </div>
            <div class="result-row">
              <span class="result-label">Value:</span>
              <code class="result-code">{{ tokenValue }}</code>
            </div>
            <div class="result-row" v-if="isValidColor">
              <span class="result-label">Preview:</span>
              <div class="color-preview-large"
                   :style="{ background: tokenValue }"></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Vue Token Engine Playground • v0.1.0</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Token 数据
const tokenCount = 75;
const primitiveCount = 52;
const referenceCount = 23;

// 导航
const activeSection = ref("colors");
const sections = [
  { id: "colors", name: "颜色", icon: "🎨" },
  { id: "spacing", name: "间距", icon: "📐" },
  { id: "typography", name: "字号", icon: "📝" },
  { id: "radius", name: "圆角", icon: "🔲" },
  { id: "shadows", name: "阴影", icon: "🌫️" },
  { id: "components", name: "组件", icon: "🧩" },
  { id: "editor", name: "编辑器", icon: "🔧" },
];

// 颜色数据
const semanticColors = [
  { name: "primary" },
  { name: "secondary" },
  { name: "success" },
  { name: "warning" },
  { name: "error" },
  { name: "info" },
];

// 间距数据
const spacingSizes = ["xs", "sm", "md", "lg", "xl", "2xl"];

// 字号数据
const fontSizeSizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"];

// 圆角数据
const radiusSizes = ["none", "sm", "md", "lg", "xl", "full"];

// 阴影数据
const shadowSizes = ["sm", "md", "lg"];

// 按钮变体
const buttonVariants = ["primary", "secondary", "success", "warning", "error", "outline", "ghost"];

// Token 编辑器
const tokenInput = ref("semantic.color.primary");
const showDropdown = ref(false);

// 所有 token 路径
const allTokens = [
  "primitive.blue.50", "primitive.blue.100", "primitive.blue.200", "primitive.blue.300",
  "primitive.blue.400", "primitive.blue.500", "primitive.blue.600", "primitive.blue.700",
  "primitive.gray.50", "primitive.gray.100", "primitive.gray.200", "primitive.gray.300",
  "primitive.gray.400", "primitive.gray.500", "primitive.gray.600", "primitive.gray.700",
  "primitive.gray.800", "primitive.gray.900",
  "primitive.green.500", "primitive.red.500", "primitive.yellow.500",
  "semantic.color.primary", "semantic.color.primary-hover", "semantic.color.secondary",
  "semantic.color.background", "semantic.color.background-secondary", "semantic.color.background-tertiary",
  "semantic.color.text", "semantic.color.text-secondary", "semantic.color.text-tertiary", "semantic.color.text-inverse",
  "semantic.color.success", "semantic.color.warning", "semantic.color.error", "semantic.color.info",
  "semantic.color.border", "semantic.color.border-focus",
  "semantic.spacing.xs", "semantic.spacing.sm", "semantic.spacing.md",
  "semantic.spacing.lg", "semantic.spacing.xl", "semantic.spacing.2xl",
  "semantic.fontSize.xs", "semantic.fontSize.sm", "semantic.fontSize.base",
  "semantic.fontSize.lg", "semantic.fontSize.xl", "semantic.fontSize.2xl", "semantic.fontSize.3xl",
  "semantic.fontWeight.normal", "semantic.fontWeight.medium", "semantic.fontWeight.semibold", "semantic.fontWeight.bold",
  "semantic.borderRadius.none", "semantic.borderRadius.sm", "semantic.borderRadius.md",
  "semantic.borderRadius.lg", "semantic.borderRadius.xl", "semantic.borderRadius.full",
  "semantic.shadow.sm", "semantic.shadow.md", "semantic.shadow.lg",
];

// Token 值映射
const tokenValues: Record<string, string> = {
  "primitive.blue.50": "#eff6ff", "primitive.blue.100": "#dbeafe", "primitive.blue.200": "#bfdbfe",
  "primitive.blue.300": "#93c5fd", "primitive.blue.400": "#60a5fa", "primitive.blue.500": "#3b82f6",
  "primitive.blue.600": "#2563eb", "primitive.blue.700": "#1d4ed8",
  "primitive.gray.50": "#f9fafb", "primitive.gray.100": "#f3f4f6", "primitive.gray.200": "#e5e7eb",
  "primitive.gray.300": "#d1d5db", "primitive.gray.400": "#9ca3af", "primitive.gray.500": "#6b7280",
  "primitive.gray.600": "#4b5563", "primitive.gray.700": "#374151", "primitive.gray.800": "#1f2937",
  "primitive.gray.900": "#111827",
  "primitive.green.500": "#22c55e", "primitive.red.500": "#ef4444", "primitive.yellow.500": "#eab308",
  "semantic.color.primary": "#3b82f6", "semantic.color.primary-hover": "#2563eb",
  "semantic.color.secondary": "#6b7280", "semantic.color.background": "#ffffff",
  "semantic.color.background-secondary": "#f9fafb", "semantic.color.background-tertiary": "#f3f4f6",
  "semantic.color.text": "#111827", "semantic.color.text-secondary": "#4b5563",
  "semantic.color.text-tertiary": "#9ca3af", "semantic.color.text-inverse": "#ffffff",
  "semantic.color.success": "#22c55e", "semantic.color.warning": "#eab308",
  "semantic.color.error": "#ef4444", "semantic.color.info": "#3b82f6",
  "semantic.color.border": "#e5e7eb", "semantic.color.border-focus": "#3b82f6",
  "semantic.spacing.xs": "0.25rem", "semantic.spacing.sm": "0.5rem",
  "semantic.spacing.md": "1rem", "semantic.spacing.lg": "1.5rem",
  "semantic.spacing.xl": "2rem", "semantic.spacing.2xl": "3rem",
  "semantic.fontSize.xs": "0.75rem", "semantic.fontSize.sm": "0.875rem",
  "semantic.fontSize.base": "1rem", "semantic.fontSize.lg": "1.125rem",
  "semantic.fontSize.xl": "1.25rem", "semantic.fontSize.2xl": "1.5rem", "semantic.fontSize.3xl": "1.875rem",
  "semantic.fontWeight.normal": "400", "semantic.fontWeight.medium": "500",
  "semantic.fontWeight.semibold": "600", "semantic.fontWeight.bold": "700",
  "semantic.borderRadius.none": "0", "semantic.borderRadius.sm": "0.25rem",
  "semantic.borderRadius.md": "0.375rem", "semantic.borderRadius.lg": "0.5rem",
  "semantic.borderRadius.xl": "0.75rem", "semantic.borderRadius.full": "9999px",
  "semantic.shadow.sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "semantic.shadow.md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "semantic.shadow.lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
};

// 计算属性
const filteredTokens = ref<string[]>(allTokens);

const cssVariable = computed(() => {
  return `var(--vte-${tokenInput.value.replace(/\./g, "-")})`;
});

const tokenValue = computed(() => {
  return tokenValues[tokenInput.value] || "N/A";
});

const isValidColor = computed(() => {
  return tokenValue.value.startsWith("#") || tokenValue.value.startsWith("rgb");
});

// 方法
function getVarValue(path: string): string {
  return tokenValues[path] || "N/A";
}

function filterTokens() {
  const query = tokenInput.value.toLowerCase();
  filteredTokens.value = allTokens.filter(t =>
    t.toLowerCase().includes(query)
  );
}

function selectToken(token: string) {
  tokenInput.value = token;
  showDropdown.value = false;
}

function hideDropdown() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
}

function scrollTo(id: string) {
  activeSection.value = id;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
</script>

<style token>
/* 基础布局 */
.playground {
  min-height: 100vh;
  background: $semantic.color.background-secondary;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, $semantic.color.primary, #1d4ed8);
  color: $semantic.color.text-inverse;
  padding: $semantic.spacing.xl $semantic.spacing.xl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: $semantic.shadow.md;
}

.header-content {
  flex: 1;
}

.title {
  font-size: $semantic.fontSize.2xl;
  font-weight: $semantic.fontWeight.bold;
}

.subtitle {
  font-size: $semantic.fontSize.sm;
  opacity: 0.9;
  margin-top: $semantic.spacing.xs;
}

.header-stats {
  display: flex;
  gap: $semantic.spacing.sm;
}

.badge {
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  background: rgba(255, 255, 255, 0.2);
  border-radius: $semantic.borderRadius.full;
  font-size: $semantic.fontSize.sm;
  font-weight: $semantic.fontWeight.medium;
}

.badge.success {
  background: rgba(34, 197, 94, 0.3);
}

.badge.info {
  background: rgba(59, 130, 246, 0.3);
}

/* 侧边导航 */
.sidebar {
  position: fixed;
  left: 0;
  top: 80px;
  width: 180px;
  height: calc(100vh - 80px);
  background: $semantic.color.background;
  border-right: 1px solid $semantic.color.border;
  padding: $semantic.spacing.md;
  overflow-y: auto;
}

.nav-item {
  display: block;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  color: $semantic.color.text-secondary;
  text-decoration: none;
  border-radius: $semantic.borderRadius.md;
  margin-bottom: $semantic.spacing.xs;
  font-size: $semantic.fontSize.sm;
  transition: all 0.2s;
}

.nav-item:hover {
  background: $semantic.color.background-secondary;
  color: $semantic.color.text;
}

.nav-item.active {
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
}

/* 主内容 */
.main {
  flex: 1;
  margin-left: 180px;
  padding: $semantic.spacing.xl;
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing.xl;
}

/* 区块 */
.section {
  background: $semantic.color.background;
  border-radius: $semantic.borderRadius.lg;
  padding: $semantic.spacing.xl;
  box-shadow: $semantic.shadow.sm;
}

.section-title {
  font-size: $semantic.fontSize.xl;
  font-weight: $semantic.fontWeight.semibold;
  margin-bottom: $semantic.spacing.xl;
  padding-bottom: $semantic.spacing.md;
  border-bottom: 1px solid $semantic.color.border;
}

.subsection {
  margin-bottom: $semantic.spacing.xl;
}

.subsection:last-child {
  margin-bottom: 0;
}

.subsection-title {
  font-size: $semantic.fontSize.base;
  font-weight: $semantic.fontWeight.medium;
  margin-bottom: $semantic.spacing.md;
  color: $semantic.color.text-secondary;
}

/* 颜色卡片 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: $semantic.spacing.sm;
}

.color-card {
  height: 80px;
  border-radius: $semantic.borderRadius.md;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: $semantic.fontSize.xs;
  box-shadow: $semantic.shadow.sm;
}

.color-name {
  font-weight: $semantic.fontWeight.medium;
}

.color-value {
  font-size: 10px;
  opacity: 0.8;
  margin-top: 2px;
}

/* 语义颜色 */
.semantic-colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: $semantic.spacing.sm;
}

.semantic-card {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.sm;
  padding: $semantic.spacing.sm;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.md;
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: $semantic.borderRadius.sm;
  flex-shrink: 0;
}

.color-info {
  display: flex;
  flex-direction: column;
}

.color-name {
  font-weight: $semantic.fontWeight.medium;
  font-size: $semantic.fontSize.sm;
}

.color-path {
  font-size: 11px;
  color: $semantic.color.text-tertiary;
  font-family: monospace;
}

/* 间距 */
.spacing-grid {
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing.sm;
}

.spacing-card {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.md;
}

.spacing-bar {
  height: 24px;
  background: $semantic.color.primary;
  border-radius: $semantic.borderRadius.sm;
  min-width: 8px;
}

.spacing-info {
  display: flex;
  gap: $semantic.spacing.sm;
}

.spacing-name {
  font-weight: $semantic.fontWeight.medium;
  font-family: monospace;
  min-width: 30px;
}

.spacing-value {
  color: $semantic.color.text-tertiary;
  font-family: monospace;
}

/* 字号 */
.typography-list {
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing.sm;
}

.typography-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $semantic.spacing.sm;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.md;
}

.typography-preview {
  color: $semantic.color.text;
  margin: 0;
}

.typography-info {
  display: flex;
  gap: $semantic.spacing.sm;
  flex-shrink: 0;
}

.typography-name {
  font-weight: $semantic.fontWeight.medium;
  font-family: monospace;
}

.typography-value {
  color: $semantic.color.text-tertiary;
  font-family: monospace;
}

/* 圆角 */
.radius-grid {
  display: flex;
  gap: $semantic.spacing.md;
  flex-wrap: wrap;
}

.radius-card {
  width: 80px;
  height: 80px;
  background: $semantic.color.primary;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $semantic.fontSize.sm;
  font-weight: $semantic.fontWeight.medium;
}

/* 阴影 */
.shadow-grid {
  display: flex;
  gap: $semantic.spacing.xl;
  flex-wrap: wrap;
}

.shadow-card {
  width: 120px;
  height: 80px;
  background: $semantic.color.background;
  border-radius: $semantic.borderRadius.md;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $semantic.fontSize.sm;
}

/* 组件 */
.component-row {
  display: flex;
  gap: $semantic.spacing.sm;
  flex-wrap: wrap;
  margin-bottom: $semantic.spacing.md;
}

.btn {
  padding: $semantic.spacing.sm $semantic.spacing.md;
  border: none;
  border-radius: $semantic.borderRadius.md;
  font-weight: $semantic.fontWeight.medium;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
}

.btn-secondary {
  background: $semantic.color.secondary;
  color: $semantic.color.text-inverse;
}

.btn-success {
  background: $semantic.color.success;
  color: $semantic.color.text-inverse;
}

.btn-warning {
  background: $semantic.color.warning;
  color: $semantic.color.text;
}

.btn-error {
  background: $semantic.color.error;
  color: $semantic.color.text-inverse;
}

.btn-outline {
  background: transparent;
  border: 1px solid $semantic.color.border;
  color: $semantic.color.text;
}

.btn-ghost {
  background: transparent;
  color: $semantic.color.primary;
}

.btn-sm {
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  font-size: $semantic.fontSize.sm;
}

.btn-lg {
  padding: $semantic.spacing.md $semantic.spacing.xl;
  font-size: $semantic.fontSize.lg;
}

/* 表单 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $semantic.spacing.md;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing.xs;
}

.form-label {
  font-size: $semantic.fontSize.sm;
  font-weight: $semantic.fontWeight.medium;
  color: $semantic.color.text-secondary;
}

.form-input {
  padding: $semantic.spacing.sm $semantic.spacing.md;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.md;
  font-size: $semantic.fontSize.sm;
}

.form-input:focus {
  outline: none;
  border-color: $semantic.color.primary;
}

.form-input.success {
  border-color: $semantic.color.success;
}

.form-input.error {
  border-color: $semantic.color.error;
}

/* 卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $semantic.spacing.md;
}

.card {
  background: $semantic.color.background;
  border-radius: $semantic.borderRadius.lg;
  overflow: hidden;
}

.card.bordered {
  border: 1px solid $semantic.color.border;
}

.card.elevated {
  box-shadow: $semantic.shadow.md;
}

.card-header {
  padding: $semantic.spacing.md;
  font-weight: $semantic.fontWeight.semibold;
  border-bottom: 1px solid $semantic.color.border;
}

.card-body {
  padding: $semantic.spacing.md;
  color: $semantic.color.text-secondary;
  font-size: $semantic.fontSize.sm;
}

/* 警告 */
.alert-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $semantic.spacing.sm;
}

.alert {
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
  font-weight: $semantic.fontWeight.medium;
  text-align: center;
}

.alert.success {
  background: #dcfce7;
  color: #166534;
}

.alert.warning {
  background: #fef3c7;
  color: #92400e;
}

.alert.error {
  background: #fee2e2;
  color: #991b1b;
}

.alert.info {
  background: #dbeafe;
  color: #1e40af;
}

/* 编辑器 */
.editor-container {
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing-lg;
}

.editor-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $semantic.spacing-sm;
}

.autocomplete-wrapper {
  position: relative;
}

.autocomplete-input {
  width: 100%;
  font-family: monospace;
  font-size: $semantic.fontSize.base;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: $semantic.color.background;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.md;
  box-shadow: $semantic.shadow.md;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.autocomplete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  cursor: pointer;
  transition: background 0.15s;
}

.autocomplete-item:hover {
  background: $semantic.color.background-secondary;
}

.token-path {
  font-family: monospace;
  font-size: $semantic.fontSize.sm;
}

.token-value {
  font-size: $semantic.fontSize.xs;
  color: $semantic.color.text-tertiary;
  font-family: monospace;
}

.editor-result {
  background: $semantic.color.background-secondary;
  border-radius: $semantic.borderRadius.md;
  padding: $semantic.spacing.md;
}

.result-row {
  display: flex;
  align-items: center;
  gap: $semantic.spacing-md;
  padding: $semantic.spacing.sm 0;
  border-bottom: 1px solid $semantic.color.border;
}

.result-row:last-child {
  border-bottom: none;
}

.result-label {
  font-weight: $semantic.fontWeight.medium;
  min-width: 120px;
  font-size: $semantic.fontSize.sm;
}

.result-code {
  font-family: monospace;
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  background: $semantic.color.background;
  border-radius: $semantic.borderRadius.sm;
  border: 1px solid $semantic.color.border;
  flex: 1;
}

.copy-btn {
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
  border: none;
  border-radius: $semantic.borderRadius.sm;
  cursor: pointer;
  font-size: $semantic.fontSize.xs;
}

.copy-btn:hover {
  background: $semantic.color.primary-hover;
}

.color-preview-large {
  width: 48px;
  height: 48px;
  border-radius: $semantic.borderRadius.md;
  border: 2px solid $semantic.color.border;
  box-shadow: $semantic.shadow.sm;
}

/* 页脚 */
.footer {
  background: $semantic.color.background;
  padding: $semantic.spacing.xl;
  text-align: center;
  color: $semantic.color.text-tertiary;
  border-top: 1px solid $semantic.color.border;
  margin-left: 180px;
}
</style>
