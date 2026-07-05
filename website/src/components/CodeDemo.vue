<template>
  <section class="code-demo">
    <div class="bg-effects">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
    </div>

    <div class="container">
      <div class="demo-content">
        <div class="demo-info">
          <div class="header-line"></div>
          <span class="section-badge">How it works</span>
          <h2 class="section-title">简单直观的开发体验</h2>
          <p class="section-desc">
            使用 <code>$token.path</code> 语法引用设计 token，
            VTE 自动编译为 CSS Variables，支持多端输出。
          </p>

          <div class="demo-steps">
            <div class="step" v-for="(step, i) in steps" :key="i">
              <div class="step-num">{{ i + 1 }}</div>
              <div class="step-text">
                <strong>{{ step.title }}</strong>
                <span>{{ step.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-visual">
          <div class="transform-flow">
            <div class="code-card source">
              <div class="card-header">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <span class="card-badge">Source</span>
                <span class="card-lang">Vue SFC</span>
              </div>
              <pre><code><span class="hl-tag">&lt;style token&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-val">$semantic.borderRadius.md</span>;
  <span class="hl-prop">font-size</span>: <span class="hl-val">$semantic.fontSize.base</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">$semantic.color.text-inverse</span>;
}
<span class="hl-tag">&lt;/style&gt;</span></code></pre>
            </div>

            <div class="transform-arrow">
              <div class="arrow-line"></div>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div class="arrow-line"></div>
              <div class="arrow-label">VTE Compiler</div>
            </div>

            <div class="code-card output">
              <div class="card-header">
                <div class="card-icon output-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span class="card-badge output-badge">Output</span>
                <span class="card-lang">CSS</span>
              </div>
              <pre><code><span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-var">var(--vte-semantic-color-primary)</span>;
  <span class="hl-prop">padding</span>: <span class="hl-var">var(--vte-semantic-spacing-md)</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-var">var(--vte-semantic-borderRadius-md)</span>;
  <span class="hl-prop">font-size</span>: <span class="hl-var">var(--vte-semantic-fontSize-base)</span>;
  <span class="hl-prop">color</span>: <span class="hl-var">var(--vte-semantic-color-text-inverse)</span>;
}

<span class="hl-sel">:root</span> {
  <span class="hl-prop">--vte-semantic-color-primary</span>: <span class="hl-num">#3b82f6</span>;
  <span class="hl-prop">--vte-semantic-spacing-md</span>: <span class="hl-num">1rem</span>;
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { title: "定义 Token", desc: "在 design-tokens.ts 中定义设计系统" },
  { title: "使用 Token", desc: "在 <style token> 中引用 token" },
  { title: "自动编译", desc: "VTE 编译为 CSS Variables" },
];
</script>

<style scoped>
.code-demo {
  padding: 140px 24px;
  background: #0f172a;
  position: relative;
  overflow: hidden;
}

.bg-effects {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.08) 0%, transparent 60%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 80px;
  align-items: center;
}

.header-line {
  width: 40px;
  height: 2px;
  background: #42b883;
  margin-bottom: 20px;
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

.section-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-desc {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 40px;
}

.section-desc code {
  background: rgba(66, 184, 131, 0.15);
  padding: 3px 10px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, monospace;
  color: #42b883;
  font-size: 14px;
}

.demo-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 12px;
  transition: all 0.3s;
}

.step:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateX(8px);
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
  flex-shrink: 0;
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.step-text strong {
  font-size: 15px;
  color: #f1f5f9;
}

.step-text span {
  font-size: 13px;
  color: #64748b;
}

.demo-visual {
  position: relative;
}

.transform-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.code-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-icon {
  width: 28px;
  height: 28px;
  background: rgba(96, 165, 250, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
}

.card-icon.output-icon {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.card-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.card-badge.output-badge {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.card-lang {
  margin-left: auto;
  font-size: 11px;
  color: #64748b;
  font-family: 'SF Mono', Monaco, monospace;
}

.code-card pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-card code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  line-height: 1.8;
  color: #e2e8f0;
}

.transform-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  position: relative;
}

.arrow-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
}

.arrow-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #42b883, #35495e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 12px;
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.4);
  animation: pulse-arrow 2s ease-in-out infinite;
}

@keyframes pulse-arrow {
  0%, 100% { box-shadow: 0 0 20px rgba(66, 184, 131, 0.4); }
  50% { box-shadow: 0 0 30px rgba(66, 184, 131, 0.6); }
}

.arrow-label {
  position: absolute;
  bottom: -8px;
  font-size: 11px;
  color: #42b883;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #0f172a;
  padding: 2px 10px;
}

.hl-tag { color: #7dd3fc; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }
.hl-var { color: #c4b5fd; }
.hl-num { color: #fbbf24; }

@media (max-width: 900px) {
  .demo-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .section-title {
    font-size: 32px;
  }
}
</style>
