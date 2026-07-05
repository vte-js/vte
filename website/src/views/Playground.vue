<template>
  <div class="page-playground">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">Playground</span>
        <h1 class="page-title">Playground</h1>
        <p class="page-desc">可视化调试工具</p>
      </div>
    </div>
    <div class="playground-content">
      <div class="container">
        <div class="playground-info">
          <div class="info-card">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
            </div>
            <h3>可视化调试</h3>
            <p>实时预览所有 token 值，支持暗黑模式切换</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3>代码高亮</h3>
            <p>支持 JSON、CSS、SCSS、JavaScript 格式导出</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </div>
            <h3>一键复制</h3>
            <p>快速复制 CSS 变量或 SCSS 变量</p>
          </div>
        </div>

        <div class="playground-cta">
          <p>启动 Playground：</p>
          <div class="command">
            <code>npx @vte-js/playground start</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-playground {
  padding-top: 80px;
}

.page-header {
  padding: 60px 24px;
  text-align: center;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
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

.page-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: #94a3b8;
}

.playground-content {
  padding: 80px 24px;
}

.playground-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.info-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}

.info-icon {
  color: #42b883;
  margin-bottom: 16px;
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 8px;
}

.info-card p {
  font-size: 14px;
  color: #94a3b8;
}

.playground-cta {
  text-align: center;
  padding: 40px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
}

.playground-cta p {
  color: #94a3b8;
  margin-bottom: 16px;
}

.command {
  display: inline-block;
  padding: 14px 24px;
  background: rgba(10, 15, 26, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 8px;
}

.command code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  color: #42b883;
}
</style>
