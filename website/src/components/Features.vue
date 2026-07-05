<template>
  <section id="features" class="features">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Features</span>
        <h2 class="section-title">为什么选择 VTE？</h2>
        <p class="section-desc">解决现代前端样式方案的三大痛点</p>
      </div>

      <div class="features-grid">
        <div class="feature-card glass">
          <div class="feature-icon-wrap">
            <span class="feature-icon">🤖</span>
          </div>
          <h3>告别 AI 幻觉</h3>
          <p>Tailwind 的字符串类名导致 AI 常拼错或凭空捏造。VTE 的 <code>$token.path</code> 强制引用，编译期拦截错误。</p>
          <div class="feature-compare">
            <div class="compare-item bad">
              <span class="compare-icon">✕</span>
              <span>AI: bg-blue-500</span>
            </div>
            <div class="compare-item good">
              <span class="compare-icon">✓</span>
              <span>VTE: $semantic.color.primary</span>
            </div>
          </div>
        </div>

        <div class="feature-card glass">
          <div class="feature-icon-wrap">
            <span class="feature-icon">🌐</span>
          </div>
          <h3>真正的跨端</h3>
          <p>一套 token 定义，自动输出 Web、小程序、React Native。无需为每个平台重写样式。</p>
          <div class="feature-platforms">
            <div class="platform-tag">Web</div>
            <div class="platform-tag">小程序</div>
            <div class="platform-tag">RN</div>
          </div>
        </div>

        <div class="feature-card glass">
          <div class="feature-icon-wrap">
            <span class="feature-icon">💚</span>
          </div>
          <h3>Vue 原生体验</h3>
          <p><code>&lt;style token&gt;</code> 语法符合 Vue SFC 直觉，支持 scoped，零学习成本。</p>
          <div class="feature-tag">
            <code>&lt;style token scoped&gt;</code>
          </div>
        </div>
      </div>

      <div class="highlights">
        <div class="highlight-item" v-for="item in highlights" :key="item.icon">
          <div class="highlight-icon">{{ item.icon }}</div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>

      <div class="comparison-section">
        <h3 class="comparison-title">对比传统方案</h3>
        <div class="comparison-table">
          <div class="table-header">
            <div class="th">特性</div>
            <div class="th">Tailwind</div>
            <div class="th">UnoCSS</div>
            <div class="th highlight">VTE</div>
          </div>
          <div class="table-row" v-for="row in comparison" :key="row.feature">
            <div class="td feature">{{ row.feature }}</div>
            <div class="td old">{{ row.tailwind }}</div>
            <div class="td old">{{ row.unocss }}</div>
            <div class="td highlight">{{ row.vte }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlights = [
  { icon: "⚡", title: "编译期检查", desc: "无效 token 立即报错，支持拼写建议" },
  { icon: "🎨", title: "三层结构", desc: "Primitive → Semantic → Component" },
  { icon: "🔧", title: "IDE 支持", desc: "语法高亮、自动补全、跳转定义" },
  { icon: "📦", title: "零配置", desc: "开箱即用，支持自定义前缀" },
];

const comparison = [
  { feature: "AI 友好", tailwind: "✕ 字符串类名", unocss: "✕ 字符串类名", vte: "✓ Token 引用" },
  { feature: "编译期检查", tailwind: "✕ 运行时", unocss: "✕ 运行时", vte: "✓ 编译期" },
  { feature: "跨端支持", tailwind: "✕ 仅 Web", unocss: "✕ 仅 Web", vte: "✓ Web/小程序/RN" },
  { feature: "Vue 原生", tailwind: "✕ 插件", unocss: "✕ 插件", vte: "✓ SFC 语法" },
  { feature: "类型安全", tailwind: "✕ 无", unocss: "✕ 无", vte: "✓ 完整类型" },
];
</script>

<style scoped>
.features {
  padding: 120px 24px;
  background: var(--vte-bg-alt);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
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
  font-size: 44px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vte-text);
  letter-spacing: -0.02em;
}

.section-desc {
  font-size: 18px;
  color: var(--vte-text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.dark .glass {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(51, 65, 85, 0.8);
}

.feature-card {
  padding: 32px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon-wrap {
  width: 56px;
  height: 56px;
  background: var(--vte-gradient);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon {
  font-size: 28px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--vte-text);
}

.feature-card p {
  color: var(--vte-text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
  font-size: 15px;
}

.feature-card code {
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, monospace;
  color: var(--vte-primary);
  font-size: 13px;
}

.feature-compare {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.compare-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'SF Mono', Monaco, monospace;
}

.compare-item.bad {
  color: #ef4444;
  text-decoration: line-through;
  opacity: 0.7;
}

.compare-item.good {
  color: #22c55e;
  font-weight: 500;
}

.compare-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.compare-item.bad .compare-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.compare-item.good .compare-icon {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.feature-platforms {
  display: flex;
  gap: 8px;
}

.platform-tag {
  padding: 6px 14px;
  background: var(--vte-bg-alt);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vte-text-secondary);
}

.feature-tag {
  background: var(--vte-bg-code);
  padding: 12px 16px;
  border-radius: 8px;
}

.feature-tag code {
  color: #e2e8f0;
  background: none;
  padding: 0;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

.highlight-item {
  text-align: center;
  padding: 32px 20px;
  background: var(--vte-bg);
  border-radius: 16px;
  border: 1px solid var(--vte-border);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  border-color: var(--vte-primary);
  transform: translateY(-4px);
}

.highlight-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.highlight-item h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--vte-text);
}

.highlight-item p {
  font-size: 14px;
  color: var(--vte-text-secondary);
}

.comparison-section {
  background: var(--vte-bg);
  border-radius: 20px;
  padding: 48px;
  border: 1px solid var(--vte-border);
}

.comparison-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  color: var(--vte-text);
}

.comparison-table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vte-border);
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  background: var(--vte-bg-code);
}

.th {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.th.highlight {
  background: rgba(66, 184, 131, 0.2);
  color: var(--vte-primary);
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  border-top: 1px solid var(--vte-border);
}

.table-row:nth-child(even) {
  background: var(--vte-bg-alt);
}

.td {
  padding: 14px 20px;
  font-size: 14px;
  color: var(--vte-text-secondary);
}

.td.feature {
  font-weight: 600;
  color: var(--vte-text);
}

.td.old {
  text-decoration: line-through;
  opacity: 0.6;
}

.td.highlight {
  color: var(--vte-primary);
  font-weight: 600;
  background: rgba(66, 184, 131, 0.03);
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .highlights {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .th:nth-child(2),
  .th:nth-child(3),
  .td:nth-child(2),
  .td:nth-child(3) {
    display: none;
  }
}
</style>
