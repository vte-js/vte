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
            <div class="install-options">
              <div class="install-card">
                <div class="install-label">pnpm (推荐)</div>
                <div class="install-cmd">
                  <code>pnpm add @vte-js/core @vte-js/vite-plugin</code>
                </div>
              </div>
              <div class="install-card">
                <div class="install-label">npm</div>
                <div class="install-cmd">
                  <code>npm install @vte-js/core @vte-js/vite-plugin</code>
                </div>
              </div>
              <div class="install-card">
                <div class="install-label">yarn</div>
                <div class="install-cmd">
                  <code>yarn add @vte-js/core @vte-js/vite-plugin</code>
                </div>
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
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">design-tokens.ts</span>
              </div>
              <pre><code><span class="hl-kw">import</span> { defineTokens } <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/core"</span>;

<span class="hl-kw">export default</span> <span class="hl-fn">defineTokens</span>({
  <span class="hl-comment">// 原始值 - 基础颜色、间距等</span>
  primitive: {
    blue: {
      50: <span class="hl-str">"#eff6ff"</span>,
      100: <span class="hl-str">"#dbeafe"</span>,
      500: <span class="hl-str">"#3b82f6"</span>,
      600: <span class="hl-str">"#2563eb"</span>,
    },
    gray: {
      500: <span class="hl-str">"#6b7280"</span>,
      900: <span class="hl-str">"#111827"</span>,
    },
  },
  <span class="hl-comment">// 语义映射 - 有含义的命名</span>
  semantic: {
    color: {
      primary: <span class="hl-str">"{primitive.blue.500}"</span>,
      primaryHover: <span class="hl-str">"{primitive.blue.600}"</span>,
      background: <span class="hl-str">"#ffffff"</span>,
      text: <span class="hl-str">"{primitive.gray.900}"</span>,
    },
    spacing: {
      sm: <span class="hl-str">"0.5rem"</span>,
      md: <span class="hl-str">"1rem"</span>,
      lg: <span class="hl-str">"1.5rem"</span>,
    },
  },
  <span class="hl-comment">// 组件级 - 特定组件的 token</span>
  component: {
    button: {
      height: <span class="hl-str">"{semantic.spacing.md}"</span>,
      padding: <span class="hl-str">"{semantic.spacing.sm}"</span>,
    },
  },
});</code></pre>
            </div>
            <div class="tip-box">
              <div class="tip-icon">💡</div>
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
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">vite.config.ts</span>
              </div>
              <pre><code><span class="hl-kw">import</span> { defineConfig } <span class="hl-kw">from</span> <span class="hl-str">"vite"</span>;
<span class="hl-kw">import</span> vue <span class="hl-kw">from</span> <span class="hl-str">"@vitejs/plugin-vue"</span>;
<span class="hl-kw">import</span> vte <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/vite-plugin"</span>;

<span class="hl-kw">export default</span> <span class="hl-fn">defineConfig</span>({
  plugins: [
    <span class="hl-fn">vue</span>(),
    <span class="hl-fn">vte</span>({
      <span class="hl-comment">// 可选配置</span>
      cssPrefix: <span class="hl-str">"my-app"</span>,  <span class="hl-comment">// 自定义前缀，默认 "vte"</span>
      platform: <span class="hl-str">"web"</span>,     <span class="hl-comment">// 目标平台：web | mp | rn</span>
    }),
  ],
});</code></pre>
            </div>
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
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">Button.vue</span>
              </div>
              <pre><code><span class="hl-tag">&lt;template&gt;</span>
  <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span>=<span class="hl-str">"btn"</span><span class="hl-tag">&gt;</span>
    Click me
  <span class="hl-tag">&lt;/button&gt;</span>
<span class="hl-tag">&lt;/template&gt;</span>

<span class="hl-tag">&lt;style token scoped&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-val">$semantic.borderRadius.md</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">$semantic.color.text-inverse</span>;
  <span class="hl-prop">border</span>: <span class="hl-val">none</span>;
  <span class="hl-prop">cursor</span>: <span class="hl-val">pointer</span>;
  <span class="hl-prop">transition</span>: <span class="hl-val">all 0.2s ease</span>;
}

<span class="hl-sel">.btn:hover</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary-hover</span>;
}
<span class="hl-tag">&lt;/style&gt;</span></code></pre>
            </div>
            <div class="tip-box warning">
              <div class="tip-icon">⚠️</div>
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
                <div class="next-icon">📖</div>
                <div class="next-content">
                  <h4>深入了解 Features</h4>
                  <p>了解 VTE 的核心特性和设计理念</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </router-link>
              <router-link to="/packages" class="next-step-card">
                <div class="next-icon">📦</div>
                <div class="next-content">
                  <h4>浏览所有包</h4>
                  <p>查看 VTE 的包结构和各包功能</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </router-link>
              <a href="https://github.com/vte-js/vte" class="next-step-card" target="_blank">
                <div class="next-icon">💻</div>
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

<style scoped>
.page-quickstart {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
  margin: 0 auto 24px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  color: #42b883;
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
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: #94a3b8;
}

.quickstart-content {
  padding: 80px 24px;
}

.doc-section {
  margin-bottom: 80px;
  padding-bottom: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  color: rgba(66, 184, 131, 0.3);
  font-variant-numeric: tabular-nums;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #f1f5f9;
}

.section-body p {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 24px;
}

.section-body code {
  background: rgba(66, 184, 131, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: #42b883;
  font-size: 14px;
}

.install-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.install-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 12px;
  padding: 20px;
}

.install-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.install-cmd {
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
}

.install-cmd code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #e2e8f0;
}

.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.code-header {
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-label {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #e2e8f0;
}

.hl-kw { color: #c084fc; }
.hl-str { color: #86efac; }
.hl-fn { color: #60a5fa; }
.hl-comment { color: #64748b; }
.hl-tag { color: #7dd3fc; }
.hl-attr { color: #c4b5fd; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }

.tip-box {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 12px;
  margin-bottom: 24px;
}

.tip-box.warning {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.2);
}

.tip-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.tip-content strong {
  display: block;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.tip-content p {
  font-size: 14px;
  margin: 0;
}

.options-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  background: rgba(66, 184, 131, 0.1);
}

.th {
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.td {
  padding: 14px 16px;
  font-size: 14px;
  color: #94a3b8;
}

.td code {
  background: rgba(66, 184, 131, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: #42b883;
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
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
}

.next-step-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateX(8px);
}

.next-icon {
  font-size: 28px;
}

.next-content {
  flex: 1;
}

.next-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.next-content p {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.next-step-card svg {
  color: #64748b;
}

@media (max-width: 768px) {
  .install-options {
    grid-template-columns: 1fr;
  }

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
