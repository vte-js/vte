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

    <section class="docs-content">
      <div class="container">
        <div class="docs-grid">
          <router-link to="/quickstart" class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
            </div>
            <h3>快速开始</h3>
            <p>5 分钟上手 VTE，从安装到使用的完整指南</p>
            <span class="doc-meta">4 步完成 · 预计 5 分钟</span>
          </router-link>

          <router-link to="/features" class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h3>核心概念</h3>
            <p>Token 三层结构、引用语法、跨端输出原理</p>
            <span class="doc-meta">深入理解 · 预计 10 分钟</span>
          </router-link>

          <router-link to="/packages" class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>包结构</h3>
            <p>了解 VTE 的包架构和各包功能</p>
            <span class="doc-meta">6 个包 · 按需安装</span>
          </router-link>

          <a href="https://github.com/vte-js/vte/tree/main/packages/vte-core" class="doc-card" target="_blank">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3>API 参考</h3>
            <p>完整的 TypeScript 类型定义和函数签名</p>
            <span class="doc-meta">完整 API · TypeScript</span>
          </a>

          <router-link to="/playground" class="doc-card">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3>Playground</h3>
            <p>可视化调试工具，实时预览所有 token</p>
            <span class="doc-meta">交互式 · 即时反馈</span>
          </router-link>

          <a href="https://github.com/vte-js/vte/issues" class="doc-card" target="_blank">
            <div class="doc-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3>常见问题</h3>
            <p>遇到问题？查看 FAQ 或提交 Issue</p>
            <span class="doc-meta">社区支持 · GitHub</span>
          </a>
        </div>

        <div class="quick-links">
          <h3>常用链接</h3>
          <div class="links-grid">
            <a href="https://github.com/vte-js/vte" target="_blank" class="link-card">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank" class="link-card">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>npm</span>
            </a>
            <a href="https://github.com/vte-js/vte/discussions" target="_blank" class="link-card">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Discussions</span>
            </a>
            <a href="https://github.com/vte-js/vte/releases" target="_blank" class="link-card">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Releases</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-docs {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 1100px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 64px;
}

.doc-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 28px;
  text-decoration: none;
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
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 8px;
}

.doc-card p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 16px;
}

.doc-meta {
  font-size: 12px;
  color: #64748b;
}

.quick-links {
  padding: 40px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(66, 184, 131, 0.1);
  border-radius: 16px;
}

.quick-links h3 {
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 20px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 10px;
  text-decoration: none;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.link-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  color: #f1f5f9;
}

@media (max-width: 900px) {
  .docs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
