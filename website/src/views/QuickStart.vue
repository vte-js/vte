<template>
  <div class="page-quickstart">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">Quick Start</span>
        <h1 class="page-title">快速开始</h1>
        <p class="page-desc">5 分钟上手 VTE，从安装到使用</p>
      </div>
    </div>

    <section class="quickstart-content">
      <div class="container">
        <!-- 安装 -->
        <div class="doc-section">
          <div class="section-header">
            <span class="section-num">01</span>
            <h2>安装</h2>
          </div>
          <div class="section-body">
            <p>VTE 支持多种包管理器，选择你常用的即可：</p>
            <div class="install-tabs">
              <div class="install-item">
                <span class="install-label">pnpm (推荐)</span>
                <CodeBlock :code="installPnpm" language="bash" />
              </div>
              <div class="install-item">
                <span class="install-label">npm</span>
                <CodeBlock :code="installNpm" language="bash" />
              </div>
              <div class="install-item">
                <span class="install-label">yarn</span>
                <CodeBlock :code="installYarn" language="bash" />
              </div>
            </div>
          </div>
        </div>

        <!-- 定义 Tokens -->
        <div class="doc-section">
          <div class="section-header">
            <span class="section-num">02</span>
            <h2>定义 Tokens</h2>
          </div>
          <div class="section-body">
            <p>
              在项目根目录创建 <code>design-tokens.ts</code> 文件，使用三层结构定义你的设计 token：
            </p>
            <CodeBlock label="design-tokens.ts" :code="designTokensExample" language="typescript" />
            <div class="tip-box">
              <div class="tip-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
                </svg>
              </div>
              <div class="tip-content">
                <strong>Token 引用语法</strong>
                <p>使用 <code>{path.to.token}</code> 格式引用其他 token，支持链式引用。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 配置 Vite -->
        <div class="doc-section">
          <div class="section-header">
            <span class="section-num">03</span>
            <h2>配置 Vite</h2>
          </div>
          <div class="section-body">
            <p>在 <code>vite.config.ts</code> 中添加 VTE 插件：</p>
            <CodeBlock label="vite.config.ts" :code="viteConfigExample" language="typescript" />
            <div class="options-table">
              <div class="table-header">
                <div class="th">选项</div>
                <div class="th">类型</div>
                <div class="th">默认值</div>
                <div class="th">说明</div>
              </div>
              <div class="table-row">
                <div class="td"><code>cssPrefix</code></div>
                <div class="td">string</div>
                <div class="td">"vte"</div>
                <div class="td">CSS 变量前缀</div>
              </div>
              <div class="table-row">
                <div class="td"><code>platform</code></div>
                <div class="td">string</div>
                <div class="td">"web"</div>
                <div class="td">目标平台</div>
              </div>
              <div class="table-row">
                <div class="td"><code>output.types</code></div>
                <div class="td">boolean</div>
                <div class="td">true</div>
                <div class="td">生成 tokens.d.ts</div>
              </div>
              <div class="table-row">
                <div class="td"><code>output.css</code></div>
                <div class="td">boolean</div>
                <div class="td">true</div>
                <div class="td">生成 tokens.css</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用 -->
        <div class="doc-section">
          <div class="section-header">
            <span class="section-num">04</span>
            <h2>在 Vue 中使用</h2>
          </div>
          <div class="section-body">
            <p>使用 <code>&lt;style token&gt;</code> 语法引用 token：</p>
            <CodeBlock label="Button.vue" :code="vueExample" language="css" />
            <div class="tip-box warning">
              <div class="tip-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div class="tip-content">
                <strong>VS Code 配置</strong>
                <p>需要禁用内置 CSS 验证，在 <code>.vscode/settings.json</code> 中添加：</p>
                <code>"css.validate": false</code>
              </div>
            </div>
          </div>
        </div>

        <!-- 下一步 -->
        <div class="doc-section">
          <div class="section-header">
            <span class="section-num">05</span>
            <h2>下一步</h2>
          </div>
          <div class="section-body">
            <div class="next-steps">
              <router-link to="/features" class="next-step-card">
                <div class="next-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                  </svg>
                </div>
                <div class="next-content">
                  <h4>深入了解 Features</h4>
                  <p>了解 VTE 的核心特性和设计理念</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </router-link>
              <router-link to="/packages" class="next-step-card">
                <div class="next-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <div class="next-content">
                  <h4>浏览所有包</h4>
                  <p>查看 VTE 的包结构和各包功能</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </router-link>
              <a href="https://github.com/vte-js/vte" class="next-step-card" target="_blank">
                <div class="next-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div class="next-content">
                  <h4>查看源码</h4>
                  <p>在 GitHub 上查看完整实现</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "../components/CodeBlock.vue";

const installPnpm = "pnpm add @vte-js/core @vte-js/vite-plugin";
const installNpm = "npm install @vte-js/core @vte-js/vite-plugin";
const installYarn = "yarn add @vte-js/core @vte-js/vite-plugin";

const designTokensExample = `import { defineTokens } from "@vte-js/core";

export default defineTokens({
  // 原始值 - 基础颜色、间距等
  primitive: {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
    },
    gray: {
      500: "#6b7280",
      900: "#111827",
    },
  },
  // 语义映射 - 有含义的命名
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
      primaryHover: "{primitive.blue.600}",
      background: "#ffffff",
      text: "{primitive.gray.900}",
    },
    spacing: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
    },
  },
  // 组件级 - 特定组件的 token
  component: {
    button: {
      height: "{semantic.spacing.md}",
      padding: "{semantic.spacing.sm}",
    },
  },
});`;

const viteConfigExample = `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte-js/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte({
      // 可选配置
      cssPrefix: "my-app",  // 自定义前缀，默认 "vte"
      platform: "web",       // 目标平台：web | mp | rn
    }),
  ],
});`;

const vueExample = `<template>
  <button class="btn">
    Click me
  </button>
</template>

<style token scoped>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
  color: $semantic.color.text-inverse;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: $semantic.color.primary-hover;
}
</style>`;
</script>

<style scoped>
.page-quickstart {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vte-primary) 10%, transparent) 0%, transparent 100%);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vte-primary), transparent);
  margin: 0 auto 24px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 30%, transparent);
  color: var(--vte-primary);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.page-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vte-text);
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: var(--vte-text-secondary);
}

.quickstart-content {
  padding: 80px 24px;
}

.doc-section {
  margin-bottom: 80px;
  padding-bottom: 80px;
  border-bottom: 1px solid color-mix(in srgb, var(--vte-text) 5%, transparent);
}

.doc-section:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.section-num {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(270deg, #42b883, #35495e, #6366f1, #42b883);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-variant-numeric: tabular-nums;
  animation: gradient-shift 6s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--vte-text);
}

.section-body p {
  font-size: 16px;
  color: var(--vte-text-secondary);
  line-height: 1.8;
  margin-bottom: 24px;
}

.section-body code {
  background: color-mix(in srgb, var(--vte-primary) 15%, transparent);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--vte-primary);
  font-size: 14px;
}

.install-tabs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.install-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.install-label {
  font-size: 12px;
  color: var(--vte-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 80px;
  flex-shrink: 0;
}

.install-item :deep(.code-block) {
  flex: 1;
  margin: 0;
}

.tip-box {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 20%, transparent);
  border-radius: 12px;
  margin-bottom: 24px;
}

.tip-box.warning {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.2);
}

.tip-icon {
  flex-shrink: 0;
  color: var(--vte-primary);
}

.tip-box.warning .tip-icon {
  color: #eab308;
}

.tip-content strong {
  display: block;
  color: var(--vte-text);
  margin-bottom: 4px;
}

.tip-content p {
  font-size: 14px;
  margin: 0;
}

.options-table {
  border: 1px solid color-mix(in srgb, var(--vte-text) 10%, transparent);
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
}

.th {
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vte-text);
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  border-top: 1px solid color-mix(in srgb, var(--vte-text) 5%, transparent);
}

.table-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.td {
  padding: 14px 16px;
  font-size: 14px;
  color: var(--vte-text-secondary);
}

.td code {
  background: color-mix(in srgb, var(--vte-primary) 15%, transparent);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--vte-primary);
  font-size: 13px;
}

.next-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.next-step-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: rgba(var(--vte-bg-rgb), 0.5);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 15%, transparent);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
}

.next-step-card:hover {
  border-color: color-mix(in srgb, var(--vte-primary) 40%, transparent);
  transform: translateX(8px);
}

.next-icon {
  color: var(--vte-primary);
  flex-shrink: 0;
}

.next-content {
  flex: 1;
}

.next-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vte-text);
  margin-bottom: 4px;
}

.next-content p {
  font-size: 14px;
  color: var(--vte-text-secondary);
  margin: 0;
}

.next-step-card svg {
  color: var(--vte-text-secondary);
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .th:nth-child(3),
  .th:nth-child(4),
  .td:nth-child(3),
  .td:nth-child(4) {
    display: none;
  }
}
</style>
