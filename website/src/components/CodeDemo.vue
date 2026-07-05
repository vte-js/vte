<template>
  <section class="code-demo">
    <div class="bg-effects">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
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
            <div class="step" v-for="(step, i) in steps" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
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
            <CodeBlock label="Source - Vue SFC" :code="sourceCode" language="css" />

            <div class="transform-arrow">
              <div class="arrow-line"></div>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div class="arrow-line"></div>
              <div class="arrow-label">VTE Compiler</div>
              <div class="arrow-particles">
                <span v-for="i in 5" :key="i" class="arrow-particle"></span>
              </div>
            </div>

            <CodeBlock label="Output - CSS" :code="outputCode" language="css" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CodeBlock from "./CodeBlock.vue";

const steps = [
  { title: "定义 Token", desc: "在 design-tokens.ts 中定义设计系统" },
  { title: "使用 Token", desc: "在 <style token> 中引用 token" },
  { title: "自动编译", desc: "VTE 编译为 CSS Variables" },
];

const sourceCode = `<style token>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
  font-size: $semantic.fontSize.base;
  color: $semantic.color.text-inverse;
}
</style>`;

const outputCode = `.btn {
  background: var(--vte-semantic-color-primary);
  padding: var(--vte-semantic-spacing-md);
  border-radius: var(--vte-semantic-borderRadius-md);
  font-size: var(--vte-semantic-fontSize-base);
  color: var(--vte-semantic-color-text-inverse);
}

:root {
  --vte-semantic-color-primary: #3b82f6;
  --vte-semantic-spacing-md: 1rem;
}`;
</script>

<style scoped>
.code-demo {
  padding: 140px 24px;
  background: #0a0f1a;
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
  background-size: 50px 50px;
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

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float 12s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: rgba(66, 184, 131, 0.1);
  top: 20%;
  right: 10%;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: rgba(34, 211, 238, 0.08);
  bottom: 20%;
  left: 10%;
  animation-delay: -6s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
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
  animation: fadeInUp 0.6s ease-out backwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.step:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateX(8px);
  box-shadow: 0 10px 30px rgba(66, 184, 131, 0.1);
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
  background: rgba(10, 15, 26, 0.8);
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
  background: rgba(0, 0, 0, 0.4);
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
  padding: 20px 0;
  position: relative;
}

.arrow-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
}

.arrow-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #42b883, #22d3ee);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 12px;
  box-shadow: 0 0 30px rgba(66, 184, 131, 0.5);
  animation: pulse-arrow 2s ease-in-out infinite;
}

@keyframes pulse-arrow {
  0%, 100% { box-shadow: 0 0 30px rgba(66, 184, 131, 0.5); transform: scale(1); }
  50% { box-shadow: 0 0 40px rgba(66, 184, 131, 0.7); transform: scale(1.05); }
}

.arrow-label {
  position: absolute;
  bottom: -8px;
  font-size: 11px;
  color: #42b883;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #0a0f1a;
  padding: 2px 10px;
}

.arrow-particles {
  position: absolute;
  inset: 0;
}

.arrow-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #42b883;
  border-radius: 50%;
  animation: particle-fly 2s ease-in-out infinite;
}

.arrow-particle:nth-child(1) { top: 20%; left: 30%; animation-delay: 0s; }
.arrow-particle:nth-child(2) { top: 80%; left: 20%; animation-delay: 0.4s; }
.arrow-particle:nth-child(3) { top: 30%; right: 20%; animation-delay: 0.8s; }
.arrow-particle:nth-child(4) { top: 70%; right: 30%; animation-delay: 1.2s; }
.arrow-particle:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.6s; }

@keyframes particle-fly {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
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

@media (max-width: 768px) {
  .code-demo {
    padding: 60px 16px;
  }

  .demo-content {
    gap: 32px;
  }

  .section-title {
    font-size: 26px;
  }

  .section-desc {
    font-size: 15px;
    margin-bottom: 24px;
  }

  .step {
    padding: 14px 16px;
    gap: 12px;
    border-radius: 10px;
  }

  .step-num {
    width: 32px;
    height: 32px;
    font-size: 14px;
    border-radius: 8px;
  }

  .step-text strong {
    font-size: 14px;
  }

  .step-text span {
    font-size: 12px;
  }

  .demo-visual {
    min-width: 0;
    overflow: hidden;
  }

  .transform-flow {
    min-width: 0;
  }

  .transform-arrow {
    padding: 14px 0;
  }
}
</style>
