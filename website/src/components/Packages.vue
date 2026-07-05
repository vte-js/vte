<template>
  <section id="packages" class="packages">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Packages</span>
        <h2 class="section-title">包结构</h2>
        <p class="section-desc">VTE 采用 monorepo 架构，按功能拆分为多个包</p>
      </div>

      <div class="packages-grid">
        <a v-for="pkg in packages" :key="pkg.name" :href="pkg.url" class="package-card" target="_blank">
          <div class="package-icon">{{ pkg.icon }}</div>
          <div class="package-info">
            <div class="package-name">{{ pkg.name }}</div>
            <div class="package-desc">{{ pkg.desc }}</div>
          </div>
          <svg class="package-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const packages = [
  { icon: "🎯", name: "@vte-js/core", desc: "核心解析器、类型定义、工具函数", url: "https://www.npmjs.com/package/@vte-js/core" },
  { icon: "⚡", name: "@vte-js/vite-plugin", desc: "Vite 插件，<style token> 语法支持", url: "https://www.npmjs.com/package/@vte-js/vite-plugin" },
  { icon: "🛠️", name: "@vte-js/cli", desc: "命令行工具，validate/extract/generate", url: "https://www.npmjs.com/package/@vte-js/cli" },
  { icon: "📦", name: "@vte-js/compiler", desc: "生成 agent.json 和 tokens.d.ts", url: "https://www.npmjs.com/package/@vte-js/compiler" },
  { icon: "⚛️", name: "@vte-js/react", desc: "React hooks 和 Provider", url: "https://www.npmjs.com/package/@vte-js/react" },
  { icon: "🎮", name: "@vte-js/playground", desc: "可视化调试工具", url: "https://www.npmjs.com/package/@vte-js/playground" },
];
</script>

<style scoped>
.packages {
  padding: 120px 24px;
  background: var(--vte-bg-alt);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
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
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vte-text);
}

.section-desc {
  font-size: 17px;
  color: var(--vte-text-secondary);
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.package-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--vte-bg);
  border: 1px solid var(--vte-border);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.package-card:hover {
  border-color: var(--vte-primary);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(66, 184, 131, 0.1);
}

.package-icon {
  width: 48px;
  height: 48px;
  background: var(--vte-bg-alt);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.package-info {
  flex: 1;
  min-width: 0;
}

.package-name {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 15px;
  font-weight: 600;
  color: var(--vte-text);
  margin-bottom: 4px;
}

.package-desc {
  font-size: 13px;
  color: var(--vte-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.package-arrow {
  color: var(--vte-text-secondary);
  flex-shrink: 0;
  transition: all 0.2s;
}

.package-card:hover .package-arrow {
  color: var(--vte-primary);
  transform: translateX(4px);
}

@media (max-width: 600px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
