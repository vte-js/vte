<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">v1.0.0</div>
        <div class="hero-logo">
          <svg viewBox="0 0 128 128" width="80" height="80">
            <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
            <path fill="#35495e" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
          </svg>
        </div>
        <h1 class="hero-title">Vue Token Engine</h1>
        <p class="hero-subtitle">Design Tokens First</p>
        <p class="hero-desc">
          告别 AI 幻觉、跨端割裂、Vue 生态不适配。<br>
          VTE 让样式必须通过 <code>$token.path</code> 引用，在编译期拦截错误，天然支持多端转换。
        </p>
        <div class="hero-actions">
          <a href="#quickstart" class="btn btn-primary">
            <span>快速开始</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="https://github.com/vte-js/vte" class="btn btn-secondary" target="_blank">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div class="hero-install">
          <code>pnpm add @vte-js/core @vte-js/vite-plugin</code>
          <button class="copy-btn" @click="copyInstall">
            {{ copied ? '✓' : '📋' }}
          </button>
        </div>
      </div>
      <div class="hero-code">
        <div class="code-block">
          <div class="code-header">
            <div class="code-dots">
              <span class="code-dot red"></span>
              <span class="code-dot yellow"></span>
              <span class="code-dot green"></span>
            </div>
            <span class="code-title">Button.vue</span>
          </div>
          <pre class="code-content"><code><span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"btn"</span><span class="code-tag">&gt;</span>
    Click me
  <span class="code-tag">&lt;/button&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-tag">&lt;style token&gt;</span>
<span class="code-selector">.btn</span> {
  <span class="code-prop">background</span>: <span class="code-value">$semantic.color.primary</span>;
  <span class="code-prop">padding</span>: <span class="code-value">$semantic.spacing.md</span>;
  <span class="code-prop">border-radius</span>: <span class="code-value">$semantic.borderRadius.md</span>;
}
<span class="code-tag">&lt;/style&gt;</span></code></pre>
        </div>
        <div class="code-block output">
          <div class="code-header">
            <div class="code-dots">
              <span class="code-dot red"></span>
              <span class="code-dot yellow"></span>
              <span class="code-dot green"></span>
            </div>
            <span class="code-title">编译输出</span>
          </div>
          <pre class="code-content"><code><span class="code-selector">.btn</span> {
  <span class="code-prop">background</span>: <span class="code-value">var(--vte-semantic-color-primary)</span>;
  <span class="code-prop">padding</span>: <span class="code-value">var(--vte-semantic-spacing-md)</span>;
  <span class="code-prop">border-radius</span>: <span class="code-value">var(--vte-semantic-borderRadius-md)</span>;
}

<span class="code-comment">/* :root 变量定义 */</span>
<span class="code-selector">:root</span> {
  <span class="code-prop">--vte-semantic-color-primary</span>: <span class="code-value">#3b82f6</span>;
  <span class="code-prop">--vte-semantic-spacing-md</span>: <span class="code-value">1rem</span>;
}</code></pre>
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 100px 24px 60px;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba(66, 184, 131, 0.2);
}

.hero-logo {
  margin-bottom: 24px;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #35495e 0%, #42b883 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 24px;
  color: #64748b;
  margin-bottom: 24px;
  font-weight: 500;
}

.hero-desc {
  font-size: 18px;
  color: #475569;
  line-height: 1.8;
  margin-bottom: 32px;
}

.hero-desc code {
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  color: #42b883;
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
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #42b883 0%, #3aa876 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(66, 184, 131, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

.btn-secondary {
  background: white;
  color: #35495e;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.hero-install {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1e293b;
  padding: 14px 20px;
  border-radius: 8px;
  max-width: fit-content;
}

.hero-install code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
  color: #e2e8f0;
}

.copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.code-block {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.code-block.output {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #0f172a;
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-dot.red { background: #ef4444; }
.code-dot.yellow { background: #eab308; }
.code-dot.green { background: #22c55e; }

.code-title {
  color: #94a3b8;
  font-size: 13px;
}

.code-content {
  padding: 20px;
  margin: 0;
  overflow-x: auto;
}

.code-content code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #e2e8f0;
}

.code-tag { color: #7dd3fc; }
.code-attr { color: #c4b5fd; }
.code-string { color: #86efac; }
.code-selector { color: #fbbf24; }
.code-prop { color: #93c5fd; }
.code-value { color: #86efac; }
.code-comment { color: #64748b; }

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-subtitle {
    font-size: 20px;
  }
}
</style>
