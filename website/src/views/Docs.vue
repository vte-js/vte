<template>
  <div class="page-docs">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">Documentation</span>
        <h1 class="page-title">文档</h1>
        <p class="page-desc">完整的 API 文档和使用指南</p>
      </div>
    </div>
    <div class="docs-content">
      <div class="container">
        <div class="docs-grid">
          <div class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <h3>快速开始</h3>
            <p>5 分钟上手 VTE，从安装到使用</p>
            <router-link to="/quickstart" class="doc-link">查看 →</router-link>
          </div>
          <div class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h3>核心概念</h3>
            <p>Token 三层结构、引用语法、跨端输出</p>
            <router-link to="/features" class="doc-link">查看 →</router-link>
          </div>
          <div class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3>API 参考</h3>
            <p>完整的 API 文档和类型定义</p>
            <a href="https://github.com/vte-js/vte" class="doc-link" target="_blank">查看 →</a>
          </div>
          <div class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3>常见问题</h3>
            <p>遇到问题？查看 FAQ</p>
            <a href="https://github.com/vte-js/vte/issues" class="doc-link" target="_blank">查看 →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-docs {
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

.docs-content {
  padding: 80px 24px;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.doc-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s;
}

.doc-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateY(-4px);
}

.doc-icon {
  color: #42b883;
  margin-bottom: 16px;
}

.doc-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 8px;
}

.doc-card p {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.doc-link {
  color: #42b883;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.doc-link:hover {
  color: #6dd5a0;
}
</style>
