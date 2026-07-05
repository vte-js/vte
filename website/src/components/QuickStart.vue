<template>
  <section id="quickstart" class="quickstart">
    <div class="container">
      <h2 class="section-title">快速开始</h2>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>安装</h3>
            <div class="code-block">
              <pre><code>pnpm add @vte-js/core @vte-js/vite-plugin</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>定义 Tokens</h3>
            <div class="code-block">
              <pre><code>// design-tokens.ts
import { defineTokens } from "@vte-js/core";

export default defineTokens({
  primitive: {
    blue: { 500: "#3b82f6" },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
    },
    spacing: {
      small: "0.25rem",
      medium: "0.5rem",
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
            <div class="code-block">
              <pre><code>// vite.config.ts
import vte from "@vte-js/vite-plugin";

export default {
  plugins: [vte()],
};</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>在 Vue 中使用</h3>
            <div class="code-block">
              <pre><code>&lt;template&gt;
  &lt;button class="btn"&gt;Click me&lt;/button&gt;
&lt;/template&gt;

&lt;style token&gt;
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.medium;
}
&lt;/style&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="packages">
        <h3 class="packages-title">包结构</h3>
        <div class="packages-grid">
          <a href="https://www.npmjs.com/package/@vte-js/core" class="package-card" target="_blank">
            <div class="package-name">@vte-js/core</div>
            <div class="package-desc">核心解析器</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/vite-plugin" class="package-card" target="_blank">
            <div class="package-name">@vte-js/vite-plugin</div>
            <div class="package-desc">Vite 插件</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/cli" class="package-card" target="_blank">
            <div class="package-name">@vte-js/cli</div>
            <div class="package-desc">命令行工具</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/compiler" class="package-card" target="_blank">
            <div class="package-name">@vte-js/compiler</div>
            <div class="package-desc">编译器</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/react" class="package-card" target="_blank">
            <div class="package-name">@vte-js/react</div>
            <div class="package-desc">React 绑定</div>
          </a>
          <a href="https://www.npmjs.com/package/@vte-js/playground" class="package-card" target="_blank">
            <div class="package-name">@vte-js/playground</div>
            <div class="package-desc">可视化调试</div>
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

.section-title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 64px;
  color: #1e293b;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  margin-bottom: 16px;
  color: #1e293b;
}

.code-block {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #e2e8f0;
}

.packages {
  background: white;
  border-radius: 16px;
  padding: 40px;
  border: 1px solid #e2e8f0;
}

.packages-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
  color: #1e293b;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.package-card {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.package-card:hover {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.1);
}

.package-name {
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.package-desc {
  font-size: 13px;
  color: #64748b;
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
