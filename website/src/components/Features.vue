<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">为什么选择 VTE？</h2>
      <p class="section-desc">解决现有方案的三大痛点</p>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>告别 AI 幻觉</h3>
          <p>Tailwind 的字符串类名导致 AI 常拼错或凭空捏造。VTE 的 <code>$token.path</code> 强制引用，编译期拦截错误。</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🌐</div>
          <h3>真正的跨端</h3>
          <p>一套 token 定义，自动输出 Web (CSS Variables)、小程序 (rpx)、React Native (StyleSheet)。</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💚</div>
          <h3>Vue 原生体验</h3>
          <p><code>&lt;style token&gt;</code> 语法符合 Vue SFC 直觉，不需要学习新的心智模型。</p>
        </div>
      </div>

      <div class="comparison">
        <h3 class="comparison-title">对比传统方案</h3>
        <div class="comparison-table">
          <div class="comparison-row header">
            <div class="comparison-cell">痛点</div>
            <div class="comparison-cell">传统方案</div>
            <div class="comparison-cell">VTE 方案</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">AI 幻觉</div>
            <div class="comparison-cell old">Tailwind 字符串类名</div>
            <div class="comparison-cell new">$token.path 强制引用</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">跨端割裂</div>
            <div class="comparison-cell old">不同平台不同方案</div>
            <div class="comparison-cell new">一套定义，多端输出</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">Vue 生态</div>
            <div class="comparison-cell old">StyleX 偏向 React</div>
            <div class="comparison-cell new">原生 Vue SFC 支持</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 100px 24px;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: #1e293b;
}

.section-desc {
  font-size: 18px;
  color: #64748b;
  text-align: center;
  margin-bottom: 64px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
}

.feature-card {
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #42b883;
  box-shadow: 0 10px 30px rgba(66, 184, 131, 0.1);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  line-height: 1.7;
}

.feature-card code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #42b883;
}

.comparison {
  background: #f8fafc;
  border-radius: 16px;
  padding: 40px;
}

.comparison-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
  color: #1e293b;
}

.comparison-table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.comparison-row.header {
  background: #1e293b;
  color: white;
}

.comparison-row:not(.header):nth-child(even) {
  background: white;
}

.comparison-row:not(.header):nth-child(odd) {
  background: #f8fafc;
}

.comparison-cell {
  padding: 16px 24px;
  font-size: 15px;
}

.comparison-cell.old {
  color: #94a3b8;
  text-decoration: line-through;
}

.comparison-cell.new {
  color: #42b883;
  font-weight: 500;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    grid-template-columns: 1fr;
  }

  .comparison-row.header {
    display: none;
  }

  .comparison-cell::before {
    content: attr(data-label);
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1e293b;
  }
}
</style>
