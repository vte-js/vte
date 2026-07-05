<template>
  <section class="features-preview">
    <div class="container">
      <div class="section-header">
        <div class="header-line"></div>
        <span class="section-badge">Features</span>
        <h2 class="section-title">为什么选择 VTE？</h2>
        <p class="section-desc">解决现代前端样式方案的三大痛点</p>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-for="(feature, i) in features" :key="i">
          <div class="card-border"></div>
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="feature-icon-wrap">
              <div class="feature-icon" v-html="feature.icon"></div>
              <div class="icon-ring"></div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>

      <div class="preview-cta">
        <router-link to="/features" class="cta-link">
          查看所有特性
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="2"/></svg>`,
    title: "告别 AI 幻觉",
    desc: "强制引用设计 token，编译期拦截错误",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
    title: "真正的跨端",
    desc: "一套定义，Web/小程序/RN 多端输出",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: "Vue 原生体验",
    desc: "SFC 语法，零学习成本",
  },
];
</script>

<style scoped>
.features-preview {
  padding: 120px 24px;
  background: linear-gradient(180deg, #0f172a 0%, #0a0f1a 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
  margin: 0 auto 24px;
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
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
}

.section-desc {
  font-size: 18px;
  color: #94a3b8;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.feature-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateY(-4px);
}

.feature-icon-wrap {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
  border-radius: 12px;
  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #f1f5f9;
}

.feature-card p {
  font-size: 14px;
  color: #94a3b8;
}

.preview-cta {
  text-align: center;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #42b883;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
}

.cta-link:hover {
  color: #6dd5a0;
  gap: 12px;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
