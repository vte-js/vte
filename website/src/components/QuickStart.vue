<template>
  <section id="quickstart" class="quickstart">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">快速开始</h2>
        <p class="section-desc">5 分钟上手 VTE</p>
      </div>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>安装依赖</h3>
            <p class="step-desc">安装 VTE 核心包和 Vite 插件</p>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">Terminal</span>
              </div>
              <pre><code><span class="code-comment"># 使用 pnpm (推荐)</span>
pnpm add @vte-js/core @vte-js/vite-plugin

<span class="code-comment"># 或使用 npm</span>
npm install @vte-js/core @vte-js/vite-plugin</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>定义 Tokens</h3>
            <p class="step-desc">创建 design-tokens.ts 文件，使用三层结构定义你的设计 token</p>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">design-tokens.ts</span>
              </div>
              <pre><code><span class="code-keyword">import</span> { defineTokens } <span class="code-keyword">from</span> <span class="code-string">"@vte-js/core"</span>;

<span class="code-keyword">export default</span> <span class="code-func">defineTokens</span>({
  <span class="code-comment">// 原始值</span>
  primitive: {
    blue: {
      500: <span class="code-string">"#3b82f6"</span>,
      600: <span class="code-string">"#2563eb"</span>,
    },
  },
  <span class="code-comment">// 语义映射</span>
  semantic: {
    color: {
      primary: <span class="code-string">"{primitive.blue.500}"</span>,
      primaryHover: <span class="code-string">"{primitive.blue.600}"</span>,
    },
    spacing: {
      sm: <span class="code-string">"0.5rem"</span>,
      md: <span class="code-string">"1rem"</span>,
      lg: <span class="code-string">"1.5rem"</span>,
    },
  },
});</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>配置 Vite</h3>
            <p class="step-desc">在 vite.config.ts 中添加 VTE 插件</p>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">vite.config.ts</span>
              </div>
              <pre><code><span class="code-keyword">import</span> { defineConfig } <span class="code-keyword">from</span> <span class="code-string">"vite"</span>;
<span class="code-keyword">import</span> vue <span class="code-keyword">from</span> <span class="code-string">"@vitejs/plugin-vue"</span>;
<span class="code-keyword">import</span> vte <span class="code-keyword">from</span> <span class="code-string">"@vte-js/vite-plugin"</span>;

<span class="code-keyword">export default</span> <span class="code-func">defineConfig</span>({
  plugins: [<span class="code-func">vue</span>(), <span class="code-func">vte</span>()],
});</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>在 Vue 中使用</h3>
            <p class="step-desc">使用 <code>&lt;style token&gt;</code> 语法引用 token</p>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">Button.vue</span>
              </div>
              <pre><code><span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"btn"</span><span class="code-tag">&gt;</span>
    Click me
  <span class="code-tag">&lt;/button&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-tag">&lt;style token scoped&gt;</span>
<span class="code-selector">.btn</span> {
  <span class="code-prop">background</span>: <span class="code-value">$semantic.color.primary</span>;
  <span class="code-prop">padding</span>: <span class="code-value">$semantic.spacing.md</span>;
  <span class="code-prop">border-radius</span>: <span class="code-value">$semantic.borderRadius.md</span>;
  <span class="code-prop">color</span>: <span class="code-value">white</span>;
  <span class="code-prop">border</span>: <span class="code-value">none</span>;
  <span class="code-prop">cursor</span>: <span class="code-value">pointer</span>;
}
<span class="code-tag">&lt;/style&gt;</span></code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="packages">
        <h3 class="packages-title">📦 包结构</h3>
        <p class="packages-desc">VTE 采用 monorepo 架构，按功能拆分为多个包</p>
        <div class="packages-grid">
          <a href="https://www.npmjs.com/package/@vte-js/core" class="package-card" target="_blank">
            <div class="package-icon">🎯</div>
            <div class="package-name">@vte-js/core</div>
            <div class="package-desc">核心解析器、类型定义、工具函数</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/vite-plugin" class="package-card" target="_blank">
            <div class="package-icon">⚡</div>
            <div class="package-name">@vte-js/vite-plugin</div>
            <div class="package-desc">Vite 插件，<code>&lt;style token&gt;</code> 语法支持</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/cli" class="package-card" target="_blank">
            <div class="package-icon">🛠️</div>
            <div class="package-name">@vte-js/cli</div>
            <div class="package-desc">命令行工具，validate/extract/generate</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/compiler" class="package-card" target="_blank">
            <div class="package-icon">📦</div>
            <div class="package-name">@vte-js/compiler</div>
            <div class="package-desc">生成 agent.json 和 tokens.d.ts</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/react" class="package-card" target="_blank">
            <div class="package-icon">⚛️</div>
            <div class="package-name">@vte-js/react</div>
            <div class="package-desc">React hooks 和 Provider</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/playground" class="package-card" target="_blank">
            <div class="package-icon">🎮</div>
            <div class="package-name">@vte-js/playground</div>
            <div class="package-desc">可视化调试工具</div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quickstart {
  padding: 100px 24px;
  background: #f8fafc;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
}

.section-desc {
  font-size: 18px;
  color: #64748b;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 80px;
}

.step {
  display: flex;
  gap: 24px;
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
}

.step-desc {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 16px;
}

.step-desc code {
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #42b883;
}

.code-block {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  padding: 10px 16px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}

.code-label {
  font-size: 12px;
  color: #94a3b8;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e2e8f0;
}

.code-comment { color: #64748b; }
.code-keyword { color: #c084fc; }
.code-string { color: #86efac; }
.code-func { color: #60a5fa; }
.code-tag { color: #7dd3fc; }
.code-attr { color: #c4b5fd; }
.code-selector { color: #fbbf24; }
.code-prop { color: #93c5fd; }
.code-value { color: #86efac; }

.packages {
  background: white;
  border-radius: 16px;
  padding: 48px;
  border: 1px solid #e2e8f0;
}

.packages-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  color: #1e293b;
}

.packages-desc {
  font-size: 15px;
  color: #64748b;
  text-align: center;
  margin-bottom: 32px;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.package-card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.package-card:hover {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.1);
  transform: translateY(-2px);
}

.package-icon {
  font-size: 24px;
  margin-bottom: 12px;
}

.package-name {
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.package-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.package-desc code {
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .packages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
