<template>
  <section class="features-content">
    <div class="container">
      <div class="features-grid">
        <div class="feature-card" v-for="(feature, i) in features" :key="i">
          <div class="card-border"></div>
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="feature-icon-wrap">
              <div class="feature-icon" v-html="feature.icon"></div>
              <div class="icon-ring"></div>
              <div class="icon-ring ring-2"></div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
            <div class="feature-tag" v-if="feature.tag">
              <code>{{ feature.tag }}</code>
            </div>
            <div class="feature-compare" v-if="feature.compare">
              <div class="compare-item bad">
                <span class="compare-icon">✕</span>
                <span>{{ feature.compare.bad }}</span>
              </div>
              <div class="compare-item good">
                <span class="compare-icon">✓</span>
                <span>{{ feature.compare.good }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="highlights">
        <div class="highlight-item" v-for="(item, i) in highlights" :key="i">
          <div class="highlight-icon" v-html="item.icon"></div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/><circle cx="12" cy="12" r="2"/></svg>`,
    title: "告别 AI 幻觉",
    desc: "Tailwind 的字符串类名导致 AI 常拼错或凭空捏造。VTE 的强制引用设计 token，编译期拦截错误。",
    compare: {
      bad: "AI: bg-blue-500",
      good: "VTE: $semantic.color.primary",
    },
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    title: "真正的跨端",
    desc: "一套 token 定义，自动输出 Web、小程序、React Native。无需为每个平台重写样式。",
    tag: "Web · 小程序 · React Native",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: "Vue 原生体验",
    desc: "语法符合 Vue SFC 直觉，支持 scoped，零学习成本。",
    tag: "<style token scoped>",
  },
];

const highlights = [
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    title: "编译期检查",
    desc: "无效 token 立即报错，支持拼写建议",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    title: "三层结构",
    desc: "Primitive → Semantic → Component",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    title: "IDE 支持",
    desc: "语法高亮、自动补全、跳转定义",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    title: "零配置",
    desc: "开箱即用，支持自定义前缀",
  },
];
</script>

<style scoped>
.features-content {
  padding: 80px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

.feature-card {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-card:hover {
  border-color: rgba(66, 184, 131, 0.5);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(66, 184, 131, 0.15);
}

.feature-card:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(66, 184, 131, 0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 36px;
}

.feature-icon-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.feature-icon {
  color: #42b883;
  position: relative;
  z-index: 2;
}

.icon-ring {
  position: absolute;
  inset: -4px;
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 16px;
  animation: rotate 8s linear infinite;
}

.icon-ring.ring-2 {
  inset: -8px;
  border-style: dashed;
  animation: rotate 12s linear infinite reverse;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.feature-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #f1f5f9;
}

.feature-card p {
  color: #94a3b8;
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 20px;
}

.feature-tag {
  padding: 10px 16px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 8px;
}

.feature-tag code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #42b883;
}

.feature-compare {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.compare-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
}

.compare-item.bad {
  color: #f87171;
  opacity: 0.7;
}

.compare-item.good {
  color: #4ade80;
  font-weight: 500;
}

.compare-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.compare-item.bad .compare-icon {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.compare-item.good .compare-icon {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.highlight-item {
  text-align: center;
  padding: 32px 20px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(66, 184, 131, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateY(-4px);
}

.highlight-icon {
  margin-bottom: 16px;
  color: #42b883;
}

.highlight-item h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #f1f5f9;
}

.highlight-item p {
  font-size: 14px;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .highlights {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
