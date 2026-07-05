<template>
  <section class="packages-content">
    <div class="container">
      <div class="packages-grid">
        <a v-for="(pkg, i) in packages" :key="pkg.name" :href="pkg.url" class="package-card" target="_blank">
          <div class="card-border"></div>
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="package-icon" v-html="pkg.icon"></div>
            <div class="package-info">
              <div class="package-name">{{ pkg.name }}</div>
              <div class="package-desc">{{ pkg.desc }}</div>
            </div>
            <div class="package-arrow">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const packages = [
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    name: "@vte-js/core",
    desc: "核心解析器、类型定义、工具函数",
    url: "https://www.npmjs.com/package/@vte-js/core",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    name: "@vte-js/vite-plugin",
    desc: "Vite 插件，<style token> 语法支持",
    url: "https://www.npmjs.com/package/@vte-js/vite-plugin",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    name: "@vte-js/cli",
    desc: "命令行工具，validate/extract/generate",
    url: "https://www.npmjs.com/package/@vte-js/cli",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    name: "@vte-js/compiler",
    desc: "生成 agent.json 和 tokens.d.ts",
    url: "https://www.npmjs.com/package/@vte-js/compiler",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    name: "@vte-js/react",
    desc: "React hooks 和 Provider",
    url: "https://www.npmjs.com/package/@vte-js/react",
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>`,
    name: "@vte-js/playground",
    desc: "可视化调试工具",
    url: "https://www.npmjs.com/package/@vte-js/playground",
  },
];
</script>

<style scoped>
.packages-content {
  padding: 80px 24px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.package-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s ease;
}

.package-card:hover {
  border-color: rgba(66, 184, 131, 0.5);
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(66, 184, 131, 0.15);
}

.package-card:hover .card-glow {
  opacity: 1;
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.5), transparent, rgba(34, 211, 238, 0.5));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(66, 184, 131, 0.12) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
}

.package-icon {
  width: 52px;
  height: 52px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
  flex-shrink: 0;
  transition: all 0.3s;
}

.package-card:hover .package-icon {
  background: rgba(66, 184, 131, 0.2);
  border-color: rgba(66, 184, 131, 0.4);
  transform: scale(1.1);
}

.package-info {
  flex: 1;
  min-width: 0;
}

.package-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.package-desc {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.package-arrow {
  color: #64748b;
  flex-shrink: 0;
  transition: all 0.3s;
}

.package-card:hover .package-arrow {
  color: #42b883;
  transform: translateX(6px);
}

@media (max-width: 600px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
