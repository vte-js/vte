<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="grid-bg"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="scan-line"></div>
      <canvas ref="canvasRef" class="particles-canvas"></canvas>
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-pulse"></span>
          <span>v1.0.0 — Now Available</span>
        </div>

        <h1 class="hero-title">
          <span class="title-line" ref="titleLine1">Vue</span>
          <span class="title-line" ref="titleLine2">Token Engine</span>
        </h1>

        <p class="hero-subtitle">
          <span class="typing-text">{{ typedText }}</span>
          <span class="cursor" :class="{ hide: !showCursor }">|</span>
        </p>

        <p class="hero-desc">
          告别 AI 幻觉、跨端割裂、Vue 生态不适配。<br>
          <span class="highlight">VTE</span> 让样式必须通过 token 引用，编译期拦截错误，天然支持多端转换。
        </p>

        <div class="hero-actions">
          <router-link to="/quickstart" class="btn btn-primary">
            <span class="btn-bg"></span>
            <span class="btn-text">开始使用</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
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

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">7</span>
            <span class="stat-label">Packages</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">Platforms</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">25+</span>
            <span class="stat-label">Tests</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hologram">
          <div class="holo-ring ring-1"></div>
          <div class="holo-ring ring-2"></div>
          <div class="holo-ring ring-3"></div>
          <div class="holo-center">
            <svg viewBox="0 0 128 128" width="80" height="80" class="logo-spin">
              <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
              <path fill="#35495e" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
            </svg>
          </div>
        </div>

        <div class="code-windows">
          <CodeBlock label="Button.vue" :code="heroSourceCode" language="css" />

          <div class="transform-indicator">
            <div class="indicator-line"></div>
            <div class="indicator-dot"></div>
            <div class="indicator-line"></div>
          </div>

          <CodeBlock label="Output" :code="heroOutputCode" language="css" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import CodeBlock from "./CodeBlock.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const copied = ref(false);
const typedText = ref("");
const showCursor = ref(true);
const titleLine1 = ref<HTMLElement | null>(null);
const titleLine2 = ref<HTMLElement | null>(null);

const heroSourceCode = `<style token>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
}
</style>`;

const heroOutputCode = `.btn {
  background: var(--vte-...);
  padding: var(--vte-...);
}
:root {
  --vte-primary: #3b82f6;
}`;

const fullText = "Design Tokens First";
let charIndex = 0;
let typingInterval: ReturnType<typeof setTimeout>;

function typeText() {
  if (charIndex < fullText.length) {
    typedText.value += fullText[charIndex];
    charIndex++;
    typingInterval = setTimeout(typeText, 80 + Math.random() * 40);
  } else {
    setTimeout(() => {
      showCursor.value = false;
    }, 2000);
  }
}

function copyInstall() {
  navigator.clipboard.writeText("pnpm add @vte-js/core @vte-js/vite-plugin");
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}

// Particle system
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

let particles: Particle[] = [];
let animationId: number;

function initCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(66, 184, 131, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach((p2) => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(66, 184, 131, ${0.15 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      });
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();
}

onMounted(() => {
  typeText();
  initCanvas();
  window.addEventListener("resize", initCanvas);
});

onUnmounted(() => {
  clearTimeout(typingInterval);
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", initCanvas);
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 24px 80px;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0f1a 0%, #0f172a 50%, #1e293b 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: float 10s ease-in-out infinite;
}

.glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.25) 0%, transparent 70%);
  top: -20%;
  right: 5%;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
  bottom: 10%;
  left: 10%;
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
  background: linear-gradient(90deg, transparent, rgba(66, 184, 131, 0.6), transparent);
  animation: scan 5s linear infinite;
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.5);
}

@keyframes scan {
  0% { top: -5%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 105%; opacity: 0; }
}

.particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
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
  animation: fadeInUp 0.8s ease-out;
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

.title-line {
  display: block;
  animation: fadeInUp 0.8s ease-out backwards;
}

.title-line:nth-child(1) {
  animation-delay: 0.1s;
  background: linear-gradient(135deg, #42b883 0%, #a78bfa 40%, #f472b6 70%, #35495e 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease-out backwards, gradient-shift 4s ease-out infinite;
  animation-delay: 0.1s, 0s;
}

.title-line:nth-child(2) {
  animation-delay: 0.2s;
  background: linear-gradient(135deg, #42b883 0%, #22d3ee 25%, #60a5fa 50%, #c084fc 75%, #42b883 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease-out backwards, gradient-shift 4s ease-out infinite;
  animation-delay: 0.2s, 1s;
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
  animation: fadeInUp 0.8s ease-out 0.3s backwards;
}

.typing-text {
  font-family: 'SF Mono', Monaco, monospace;
  color: #e2e8f0;
}

.cursor {
  color: #42b883;
  animation: blink 1s step-end infinite;
}

.cursor.hide {
  animation: none;
  opacity: 0;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-desc {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 36px;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
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
  animation: fadeInUp 0.8s ease-out 0.5s backwards;
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
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
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

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.8s ease-out 0.7s backwards;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 28px;
  font-weight: 800;
  color: #42b883;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
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
  border-style: dashed;
}

.ring-2 {
  width: 75%;
  height: 75%;
  animation: rotate 15s linear infinite reverse;
}

.ring-3 {
  width: 50%;
  height: 50%;
  animation: rotate 10s linear infinite;
  border-color: rgba(34, 211, 238, 0.3);
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.holo-center {
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 40px rgba(66, 184, 131, 0.6));
}

.logo-spin {
  animation: float 4s ease-in-out infinite;
}

.code-windows {
  position: relative;
  z-index: 2;
  margin-left: 80px;
}

.code-window {
  background: rgba(10, 15, 26, 0.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(66, 184, 131, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.window-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.4);
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
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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
  box-shadow: 0 0 15px #42b883;
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

  .hero-stats {
    justify-content: center;
  }
}
</style>
