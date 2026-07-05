<template>
  <section class="features">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">为什么选择 VTE？</h2>
        <p class="section-desc">解决现代前端样式方案的三大痛点</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>告别 AI 幻觉</h3>
          <p>Tailwind 的字符串类名导致 AI 常拼错或凭空捏造颜色值。VTE 的 <code>$token.path</code> 强制引用设计 token，编译期拦截错误。</p>
          <div class="feature-example">
            <span class="bad">❌ AI: bg-blue-500</span>
            <span class="good">✅ VTE: $semantic.color.primary</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🌐</div>
          <h3>真正的跨端</h3>
          <p>一套 token 定义，自动输出 Web (CSS Variables)、小程序 (rpx)、React Native (StyleSheet)。无需为每个平台重写样式。</p>
          <div class="feature-platforms">
            <span class="platform">Web</span>
            <span class="platform">小程序</span>
            <span class="platform">React Native</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💚</div>
          <h3>Vue 原生体验</h3>
          <p><code>&lt;style token&gt;</code> 语法符合 Vue SFC 直觉，支持 scoped，不需要学习新的心智模型。</p>
          <div class="feature-code">
            <code>&lt;style token scoped&gt;</code>
          </div>
        </div>
      </div>

      <div class="highlight-section">
        <div class="highlight-grid">
          <div class="highlight-card">
            <div class="highlight-icon">⚡</div>
            <h4>编译期检查</h4>
            <p>无效 token 路径立即报错，支持拼写建议和自动修复。</p>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">🎨</div>
            <h4>三层 Token 结构</h4>
            <p>Primitive → Semantic → Component，清晰的设计系统架构。</p>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">🔧</div>
            <h4>IDE 支持</h4>
            <p>VS Code 扩展提供语法高亮、自动补全、跳转定义。</p>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">📦</div>
            <h4>零配置</h4>
            <p>自动检测 token 文件，开箱即用，支持自定义前缀。</p>
          </div>
        </div>
      </div>

      <div class="comparison">
        <h3 class="comparison-title">对比传统方案</h3>
        <div class="comparison-table">
          <div class="comparison-row header">
            <div class="comparison-cell">特性</div>
            <div class="comparison-cell">Tailwind</div>
            <div class="comparison-cell">UnoCSS</div>
            <div class="comparison-cell highlight">VTE</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">AI 友好</div>
            <div class="comparison-cell old">❌ 字符串类名</div>
            <div class="comparison-cell old">❌ 字符串类名</div>
            <div class="comparison-cell highlight">✅ Token 引用</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">编译期检查</div>
            <div class="comparison-cell old">❌ 运行时</div>
            <div class="comparison-cell old">❌ 运行时</div>
            <div class="comparison-cell highlight">✅ 编译期</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">跨端支持</div>
            <div class="comparison-cell old">❌ 仅 Web</div>
            <div class="comparison-cell old">❌ 仅 Web</div>
            <div class="comparison-cell highlight">✅ Web/小程序/RN</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">Vue 原生</div>
            <div class="comparison-cell old">❌ 插件</div>
            <div class="comparison-cell old">❌ 插件</div>
            <div class="comparison-cell highlight">✅ SFC 语法</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-cell">类型安全</div>
            <div class="comparison-cell old">❌ 无</div>
            <div class="comparison-cell old">❌ 无</div>
            <div class="comparison-cell highlight">✅ 完整类型</div>
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

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
}

.section-desc {
  font-size: 18px;
  color: #64748b;
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
  margin-bottom: 16px;
}

.feature-card code {
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #42b883;
}

.feature-example {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.feature-example .bad {
  color: #ef4444;
  text-decoration: line-through;
}

.feature-example .good {
  color: #22c55e;
  font-weight: 500;
}

.feature-platforms {
  display: flex;
  gap: 8px;
}

.platform {
  padding: 4px 12px;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
}

.feature-code {
  background: #1e293b;
  padding: 8px 12px;
  border-radius: 6px;
}

.feature-code code {
  color: #e2e8f0;
  font-size: 13px;
}

.highlight-section {
  margin-bottom: 80px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.highlight-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  text-align: center;
}

.highlight-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.highlight-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
}

.highlight-card p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
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
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
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
  padding: 14px 20px;
  font-size: 14px;
}

.comparison-cell.old {
  color: #94a3b8;
}

.comparison-cell.highlight {
  color: #42b883;
  font-weight: 600;
  background: rgba(66, 184, 131, 0.05) !important;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .highlight-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .comparison-row {
    grid-template-columns: 1fr 1fr;
  }

  .comparison-row.header {
    display: none;
  }
}
</style>
