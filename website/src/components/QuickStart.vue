<template>
  <section id="quickstart" class="quickstart">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Get Started</span>
        <h2 class="section-title">5 分钟上手</h2>
        <p class="section-desc">从安装到使用，快速体验 VTE</p>
      </div>

      <div class="steps-grid">
        <div v-for="(step, i) in steps" :key="i" class="step-card">
          <div class="step-header">
            <div class="step-num">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
          </div>
          <p class="step-desc">{{ step.desc }}</p>
          <div class="step-code">
            <div class="code-label">{{ step.file }}</div>
            <pre><code v-html="step.code"></code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "安装依赖",
    desc: "安装 VTE 核心包和 Vite 插件",
    file: "Terminal",
    code: `<span class="hl-cmd">pnpm add</span> @vte-js/core @vte-js/vite-plugin`,
  },
  {
    title: "定义 Tokens",
    desc: "创建 design-tokens.ts，使用三层结构定义设计 token",
    file: "design-tokens.ts",
    code: `<span class="hl-kw">import</span> { defineTokens } <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/core"</span>;

<span class="hl-kw">export default</span> <span class="hl-fn">defineTokens</span>({
  primitive: {
    blue: { 500: <span class="hl-str">"#3b82f6"</span> },
  },
  semantic: {
    color: {
      primary: <span class="hl-str">"{primitive.blue.500}"</span>,
    },
  },
});`,
  },
  {
    title: "配置 Vite",
    desc: "在 vite.config.ts 中添加 VTE 插件",
    file: "vite.config.ts",
    code: `<span class="hl-kw">import</span> vte <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/vite-plugin"</span>;

<span class="hl-kw">export default</span> {
  plugins: [<span class="hl-fn">vte</span>()],
};`,
  },
  {
    title: "在 Vue 中使用",
    desc: "使用 <style token> 语法引用 token",
    file: "Button.vue",
    code: `<span class="hl-tag">&lt;style token&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
}
<span class="hl-tag">&lt;/style&gt;</span>`,
  },
];
</script>

<style scoped>
.quickstart {
  padding: 120px 24px;
  background: var(--vte-bg);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
}

.section-badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(66, 184, 131, 0.1);
  color: var(--vte-primary);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.section-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vte-text);
}

.section-desc {
  font-size: 17px;
  color: var(--vte-text-secondary);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.step-card {
  background: var(--vte-bg-alt);
  border: 1px solid var(--vte-border);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.step-card:hover {
  border-color: var(--vte-primary);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.step-num {
  width: 40px;
  height: 40px;
  background: var(--vte-gradient);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
}

.step-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--vte-text);
}

.step-desc {
  font-size: 14px;
  color: var(--vte-text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

.step-code {
  background: var(--vte-bg-code);
  border-radius: 12px;
  overflow: hidden;
}

.code-label {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.3);
  font-size: 12px;
  color: #64748b;
  font-family: 'SF Mono', Monaco, monospace;
}

.step-code pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.step-code code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e2e8f0;
}

.hl-cmd { color: #86efac; }
.hl-kw { color: #c084fc; }
.hl-str { color: #86efac; }
.hl-fn { color: #60a5fa; }
.hl-tag { color: #7dd3fc; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }

@media (max-width: 700px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
