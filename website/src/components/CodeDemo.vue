<template>
  <section class="code-demo">
    <div class="container">
      <div class="demo-content">
        <div class="demo-info">
          <span class="section-badge">How it works</span>
          <h2 class="section-title">简单直观的开发体验</h2>
          <p class="section-desc">
            使用 <code>$token.path</code> 语法引用设计 token，
            VTE 自动编译为 CSS Variables，支持多端输出。
          </p>

          <div class="demo-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-text">
                <strong>定义 Token</strong>
                <span>在 design-tokens.ts 中定义设计系统</span>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-text">
                <strong>使用 Token</strong>
                <span>在 &lt;style token&gt; 中引用 token</span>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-text">
                <strong>自动编译</strong>
                <span>VTE 编译为 CSS Variables</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-visual">
          <div class="transform-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          <div class="code-card before">
            <div class="card-header">
              <span class="card-badge source">Source</span>
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

          <div class="code-card after">
            <div class="card-header">
              <span class="card-badge output">Output</span>
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
  <span class="hl-prop">--vte-semantic-borderRadius-md</span>: <span class="hl-num">0.375rem</span>;
}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-demo {
  padding: 120px 24px;
  background: var(--vte-bg);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
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
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-desc {
  font-size: 17px;
  color: var(--vte-text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.section-desc code {
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, monospace;
  color: var(--vte-primary);
  font-size: 14px;
}

.demo-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--vte-bg-alt);
  border-radius: 12px;
  border: 1px solid var(--vte-border);
  transition: all 0.2s;
}

.step:hover {
  border-color: var(--vte-primary);
  transform: translateX(4px);
}

.step-num {
  width: 32px;
  height: 32px;
  background: var(--vte-gradient);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.step-text strong {
  font-size: 15px;
  color: var(--vte-text);
}

.step-text span {
  font-size: 13px;
  color: var(--vte-text-secondary);
}

.demo-visual {
  position: relative;
}

.transform-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: var(--vte-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(66, 184, 131, 0.4);
  animation: pulse-arrow 2s ease-in-out infinite;
}

@keyframes pulse-arrow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

.code-card {
  background: var(--vte-bg-code);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.code-card.before {
  margin-bottom: 60px;
}

.code-card.after {
  margin-top: 60px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.3);
}

.card-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-badge.source {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.card-badge.output {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.card-lang {
  font-size: 12px;
  color: #64748b;
  font-family: 'SF Mono', Monaco, monospace;
}

.code-card pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-card code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #e2e8f0;
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
