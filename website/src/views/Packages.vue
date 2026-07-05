<template>
  <div class="page-packages">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">Packages</span>
        <h1 class="page-title">包结构</h1>
        <p class="page-desc">VTE 采用 monorepo 架构，按功能拆分为多个包</p>
      </div>
    </div>

    <section class="packages-content">
      <div class="container">
        <div class="packages-grid">
          <div v-for="pkg in packages" :key="pkg.name" class="package-card">
            <div class="package-header">
              <div class="package-icon" v-html="pkg.icon"></div>
              <div class="package-info">
                <h3>{{ pkg.name }}</h3>
                <span class="package-version">v1.0.0</span>
              </div>
            </div>
            <p class="package-desc">{{ pkg.desc }}</p>
            <div class="package-features">
              <span v-for="feature in pkg.features" :key="feature" class="feature-tag">{{ feature }}</span>
            </div>
            <div class="package-install">
              <code>pnpm add {{ pkg.name }}</code>
            </div>
            <a :href="pkg.url" class="package-link" target="_blank">
              查看文档
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const packages = [
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    name: "@vte-js/core",
    desc: "核心解析器，包含 Token 解析、类型定义、工具函数。是所有其他包的基础依赖。",
    features: ["Token 解析", "类型推导", "循环引用检测", "多端支持"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-core",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    name: "@vte-js/vite-plugin",
    desc: "Vite 插件，提供 <style token> 语法支持，自动编译为 CSS Variables。",
    features: ["<style token>", "scoped 支持", "多平台输出", "HMR 热更新"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-vite-plugin",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    name: "@vte-js/cli",
    desc: "命令行工具，提供 validate、extract、generate 等命令。",
    features: ["Token 验证", "路径提取", "代码生成", "批量处理"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-cli",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    name: "@vte-js/compiler",
    desc: "编译器，生成 agent.json 和 tokens.d.ts 类型声明文件。",
    features: ["agent.json", "tokens.d.ts", "类型推导", "AI 友好"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-compiler",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    name: "@vte-js/react",
    desc: "React 绑定，提供 hooks 和 Provider，支持 React 项目使用 VTE。",
    features: ["useToken", "useTokenValue", "TokenProvider", "跨平台"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-react",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>`,
    name: "@vte-js/playground",
    desc: "可视化调试工具，实时预览所有 token 值，支持导出。",
    features: ["实时预览", "暗黑模式", "代码导出", "Token 搜索"],
    url: "https://github.com/vte-js/vte/tree/main/packages/vte-playground",
  },
];
</script>

<style scoped>
.page-packages {
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

.packages-content {
  padding: 80px 24px;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.package-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s;
}

.package-card:hover {
  border-color: rgba(66, 184, 131, 0.4);
  transform: translateY(-4px);
}

.package-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.package-icon {
  width: 56px;
  height: 56px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}

.package-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  font-family: 'JetBrains Mono', monospace;
}

.package-version {
  font-size: 12px;
  color: #64748b;
}

.package-desc {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 16px;
}

.package-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.feature-tag {
  padding: 4px 10px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 6px;
  font-size: 12px;
  color: #42b883;
}

.package-install {
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.package-install code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #e2e8f0;
}

.package-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #42b883;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.package-link:hover {
  color: #6dd5a0;
}

@media (max-width: 768px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
