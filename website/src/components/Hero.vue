<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
      <div class="hero-glow"></div>
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          v1.0.0 — Now Available
        </div>

        <h1 class="hero-title">
          <span class="title-gradient">Vue Token Engine</span>
        </h1>

        <p class="hero-subtitle">
          Design Tokens First
        </p>

        <p class="hero-desc">
          告别 AI 幻觉、跨端割裂、Vue 生态不适配。<br>
          <strong>VTE</strong> 让样式必须通过 token 引用，编译期拦截错误，天然支持多端转换。
        </p>

        <div class="hero-actions">
          <a href="#quickstart" class="btn btn-primary">
            <span>开始使用</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="https://github.com/vte-js/vte" class="btn btn-ghost" target="_blank">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        <div class="hero-install">
          <code>pnpm add @vte-js/core @vte-js/vite-plugin</code>
          <button class="copy-btn" @click="copyInstall" :class="{ copied }">
            <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="hero-visual">
        <div class="code-window">
          <div class="window-header">
            <div class="window-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="window-title">Button.vue</span>
          </div>
          <div class="window-body">
            <pre><code><span class="hl-tag">&lt;template&gt;</span>
  <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span>=<span class="hl-str">"btn"</span><span class="hl-tag">&gt;</span>
    Click me
  <span class="hl-tag">&lt;/button&gt;</span>
<span class="hl-tag">&lt;/template&gt;</span>

<span class="hl-tag">&lt;style token&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-val">$semantic.borderRadius.md</span>;
}
<span class="hl-tag">&lt;/style&gt;</span></code></pre>
          </div>
        </div>

        <div class="code-window output">
          <div class="window-header">
            <div class="window-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="window-title">编译输出</span>
          </div>
          <div class="window-body">
            <pre><code><span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-var">var(--vte-semantic-color-primary)</span>;
  <span class="hl-prop">padding</span>: <span class="hl-var">var(--vte-semantic-spacing-md)</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-var">var(--vte-semantic-borderRadius-md)</span>;
}

<span class="hl-sel">:root</span> {
  <span class="hl-prop">--vte-semantic-color-primary</span>: <span class="hl-num">#3b82f6</span>;
  <span class="hl-prop">--vte-semantic-spacing-md</span>: <span class="hl-num">1rem</span>;
}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

function copyInstall() {
  navigator.clipboard.writeText("pnpm add @vte-js/core @vte-js/vite-plugin");
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 24px 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 8s ease-in-out infinite;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.hero-glow {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(53, 73, 94, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 10s ease-in-out infinite reverse;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-content {
  max-width: 560px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vte-primary);
  margin-bottom: 24px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--vte-primary);
  border-radius: 50%;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.title-gradient {
  background: linear-gradient(135deg, var(--vte-primary) 0%, var(--vte-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--vte-text-secondary);
  margin-bottom: 20px;
  font-weight: 500;
}

.hero-desc {
  font-size: 17px;
  color: var(--vte-text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
}

.hero-desc strong {
  color: var(--vte-text);
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-primary {
  background: var(--vte-gradient);
  color: white;
  box-shadow: 0 4px 20px rgba(66, 184, 131, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(66, 184, 131, 0.4);
}

.btn-ghost {
  background: var(--vte-bg);
  color: var(--vte-text);
  border: 1px solid var(--vte-border);
}

.btn-ghost:hover {
  border-color: var(--vte-primary);
  background: rgba(66, 184, 131, 0.05);
}

.hero-install {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--vte-bg-code);
  padding: 12px 16px 12px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-install code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
  color: #e2e8f0;
}

.copy-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.copy-btn.copied {
  background: var(--vte-primary);
  color: white;
}

.hero-visual {
  position: relative;
}

.code-window {
  background: var(--vte-bg-code);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.code-window.output {
  margin-top: 20px;
  transform: scale(0.95);
  opacity: 0.9;
}

.window-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.window-dots span:nth-child(1) { background: #ef4444; }
.window-dots span:nth-child(2) { background: #eab308; }
.window-dots span:nth-child(3) { background: #22c55e; }

.window-title {
  font-size: 13px;
  color: #64748b;
  font-family: 'SF Mono', Monaco, monospace;
}

.window-body {
  padding: 20px;
}

.window-body pre {
  margin: 0;
  overflow-x: auto;
}

.window-body code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #e2e8f0;
}

.hl-tag { color: #7dd3fc; }
.hl-attr { color: #c4b5fd; }
.hl-str { color: #86efac; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }
.hl-var { color: #c4b5fd; }
.hl-num { color: #fbbf24; }

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-title {
    font-size: 44px;
  }

  .hero-visual {
    max-width: 500px;
  }
}
</style>
