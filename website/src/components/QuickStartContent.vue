<template>
  <section class="quickstart-content">
    <div class="container">
      <div class="steps-timeline">
        <div class="timeline-line"></div>
        <div v-for="(step, i) in steps" :key="i" class="step-item">
          <div class="step-marker">
            <div class="marker-ring"></div>
            <div class="marker-dot"></div>
          </div>
          <div class="step-card">
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
.quickstart-content {
  padding: 80px 24px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.steps-timeline {
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #42b883, rgba(66, 184, 131, 0.1));
}

.step-item {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  position: relative;
}

.step-marker {
  position: relative;
  width: 50px;
  flex-shrink: 0;
}

.marker-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(66, 184, 131, 0.3);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  border-style: dashed;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #42b883;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.6);
}

.step-card {
  flex: 1;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s;
}

.step-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateX(8px);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.step-num {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
}

.step-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
}

.step-desc {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.step-code {
  background: rgba(10, 15, 26, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.code-label {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.step-code pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.step-code code {
  font-family: 'JetBrains Mono', monospace;
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
</style>
