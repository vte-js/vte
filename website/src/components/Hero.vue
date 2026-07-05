<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="grid-bg"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
      <div class="scan-line"></div>
      <div class="particles">
        <span v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)"></span>
      </div>
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-pulse"></span>
          <span class="badge-text">v1.0.0 — Now Available</span>
        </div>

        <h1 class="hero-title">
          <span class="title-line">Vue</span>
          <span class="title-line gradient">Token Engine</span>
        </h1>

        <p class="hero-subtitle">
          <span class="typing-text">Design Tokens First</span>
          <span class="cursor">|</span>
        </p>

        <p class="hero-desc">
          告别 AI 幻觉、跨端割裂、Vue 生态不适配。<br>
          <span class="highlight">VTE</span> 让样式必须通过 token 引用，编译期拦截错误，天然支持多端转换。
        </p>

        <div class="hero-actions">
          <a href="#quickstart" class="btn btn-primary">
            <span class="btn-bg"></span>
            <span class="btn-text">开始使用</span>
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
          <div class="install-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </div>
          <code>pnpm add @vte-js/core @vte-js/vite-plugin</code>
          <button class="copy-btn" @click="copyInstall" :class="{ copied }">
            <svg v-if="!copied" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hologram">
          <div class="holo-ring ring-1"></div>
          <div class="holo-ring ring-2"></div>
          <div class="holo-ring ring-3"></div>
          <div class="holo-center">
            <svg viewBox="0 0 128 128" width="80" height="80">
              <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
              <path fill="#35495e" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
            </svg>
          </div>
        </div>

        <div class="code-windows">
          <div class="code-window">
            <div class="window-header">
              <div class="window-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="window-title">Button.vue</span>
              <span class="window-status">●</span>
            </div>
            <div class="window-body">
              <pre><code><span class="hl-tag">&lt;style token&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
  <span class="hl-prop">border-radius</span>: <span class="hl-val">$semantic.borderRadius.md</span>;
}
<span class="hl-tag">&lt;/style&gt;</span></code></pre>
            </div>
          </div>

          <div class="transform-indicator">
            <div class="indicator-line"></div>
            <div class="indicator-dot"></div>
            <div class="indicator-line"></div>
          </div>

          <div class="code-window output">
            <div class="window-header">
              <div class="window-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="window-title">Output</span>
              <span class="window-status success">✓</span>
            </div>
            <div class="window-body">
              <pre><code><span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-var">var(--vte-...)</span>;
  <span class="hl-prop">padding</span>: <span class="hl-var">var(--vte-...)</span>;
}
<span class="hl-sel">:root</span> {
  <span class="hl-prop">--vte-primary</span>: <span class="hl-num">#3b82f6</span>;
}</code></pre>
            </div>
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

function particleStyle(i: number) {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const delay = Math.random() * 5;
  const size = Math.random() * 3 + 1;
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
  };
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
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.07) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 8s ease-in-out infinite;
}

.glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.3) 0%, transparent 70%);
  top: -20%;
  right: 10%;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(53, 73, 94, 0.4) 0%, transparent 70%);
  bottom: 10%;
  left: 5%;
  animation-delay: -3s;
}

.glow-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.2) 0%, transparent 70%);
  top: 40%;
  left: 40%;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(66, 184, 131, 0.5), transparent);
  animation: scan 4s linear infinite;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.particles span {
  position: absolute;
  background: rgba(66, 184, 131, 0.6);
  border-radius: 50%;
  animation: particle-float 6s ease-in-out infinite;
}

@keyframes particle-float {
  0%, 100% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-20px); }
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
  gap: 10px;
  padding: 8px 18px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: #42b883;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
}

.badge-pulse {
  width: 8px;
  height: 8px;
  background: #42b883;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(66, 184, 131, 0); }
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

.title-line {
  display: block;
  color: #f1f5f9;
}

.title-line.gradient {
  background: linear-gradient(135deg, #42b883 0%, #22d3ee 50%, #42b883 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.hero-subtitle {
  font-size: 22px;
  color: #94a3b8;
  margin-bottom: 24px;
  font-weight: 500;
}

.typing-text {
  font-family: 'SF Mono', Monaco, monospace;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: #42b883;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-desc {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 36px;
}

.highlight {
  color: #42b883;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(66, 184, 131, 0.5);
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #42b883 0%, #3aa876 100%);
  color: white;
  border: none;
  box-shadow: 0 0 30px rgba(66, 184, 131, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 40px rgba(66, 184, 131, 0.6);
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #42b883 0%, #22d3ee 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn-primary:hover .btn-bg {
  opacity: 1;
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(66, 184, 131, 0.5);
}

.hero-install {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(15, 23, 42, 0.8);
  padding: 12px 16px 12px 12px;
  border-radius: 10px;
  border: 1px solid rgba(66, 184, 131, 0.2);
  backdrop-filter: blur(10px);
}

.install-icon {
  width: 28px;
  height: 28px;
  background: rgba(66, 184, 131, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}

.hero-install code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
  color: #e2e8f0;
}

.copy-btn {
  width: 28px;
  height: 28px;
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
  background: #42b883;
  color: white;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hologram {
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.holo-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(66, 184, 131, 0.3);
}

.ring-1 {
  width: 100%;
  height: 100%;
  animation: rotate 20s linear infinite;
}

.ring-2 {
  width: 80%;
  height: 80%;
  border-style: dashed;
  animation: rotate 15s linear infinite reverse;
}

.ring-3 {
  width: 60%;
  height: 60%;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.holo-center {
  position: relative;
  z-index: 2;
  animation: float 4s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(66, 184, 131, 0.5));
}

.code-windows {
  position: relative;
  z-index: 2;
  margin-left: 80px;
}

.code-window {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(66, 184, 131, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.window-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.window-dots span:nth-child(1) { background: #ef4444; }
.window-dots span:nth-child(2) { background: #eab308; }
.window-dots span:nth-child(3) { background: #22c55e; }

.window-title {
  flex: 1;
  font-size: 12px;
  color: #64748b;
  font-family: 'SF Mono', Monaco, monospace;
}

.window-status {
  color: #42b883;
  font-size: 12px;
}

.window-status.success {
  color: #22c55e;
}

.window-body {
  padding: 16px;
}

.window-body pre {
  margin: 0;
}

.window-body code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  line-height: 1.8;
  color: #e2e8f0;
}

.transform-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
}

.indicator-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
}

.indicator-dot {
  width: 8px;
  height: 8px;
  background: #42b883;
  border-radius: 50%;
  box-shadow: 0 0 10px #42b883;
  animation: pulse 2s ease-in-out infinite;
}

.hl-tag { color: #7dd3fc; }
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
    font-size: 48px;
  }

  .hero-visual {
    display: none;
  }
}
</style>
