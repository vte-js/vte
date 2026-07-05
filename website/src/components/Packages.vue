<template>
  <section id="packages" class="packages">
    <div class="container">
      <div class="section-header">
        <div class="header-line"></div>
        <span class="section-badge">Packages</span>
        <h2 class="section-title">包结构</h2>
        <p class="section-desc">VTE 采用 monorepo 架构，按功能拆分为多个包</p>
      </div>

      <div class="packages-grid">
        <a v-for="(pkg, i) in packages" :key="pkg.name" :href="pkg.url" class="package-card" target="_blank" :style="{ animationDelay: `${i * 0.1}s` }">
          <div class="card-border"></div>
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="package-icon">{{ pkg.icon }}</div>
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
  padding: 140px 24px;
  background: #0f172a;
  position: relative;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
}

.header-line {
  width: 40px;
  height: 2px;
  background: #42b883;
  margin: 0 auto 20px;
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
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
}

.section-desc {
  font-size: 18px;
  color: #94a3b8;
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
  animation: fadeInUp 0.6s ease-out backwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.package-card:hover {
  border-color: rgba(66, 184, 131, 0.5);
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(66, 184, 131, 0.15);
}

.package-card:hover .card-glow {
  opacity: 1;
}

.package-card:hover .card-border {
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
  font-size: 24px;
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
  font-family: 'SF Mono', Monaco, monospace;
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
