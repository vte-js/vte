<template>
  <section class="comparison-section">
    <div class="container">
      <div class="comparison-header">
        <h3>对比传统方案</h3>
        <div class="header-decoration">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="comparison-table">
        <div class="table-header">
          <div class="th">特性</div>
          <div class="th">Tailwind</div>
          <div class="th">UnoCSS</div>
          <div class="th highlight">VTE</div>
        </div>
        <div class="table-row" v-for="(row, i) in comparison" :key="i">
          <div class="td feature">{{ row.feature }}</div>
          <div class="td old">{{ row.tailwind }}</div>
          <div class="td old">{{ row.unocss }}</div>
          <div class="td highlight">{{ row.vte }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const comparison = [
  { feature: "AI 友好", tailwind: "✕ 字符串类名", unocss: "✕ 字符串类名", vte: "✓ Token 引用" },
  { feature: "编译期检查", tailwind: "✕ 运行时", unocss: "✕ 运行时", vte: "✓ 编译期" },
  { feature: "跨端支持", tailwind: "✕ 仅 Web", unocss: "✕ 仅 Web", vte: "✓ Web/小程序/RN" },
  { feature: "Vue 原生", tailwind: "✕ 插件", unocss: "✕ 插件", vte: "✓ SFC 语法" },
  { feature: "类型安全", tailwind: "✕ 无", unocss: "✕ 无", vte: "✓ 完整类型" },
];
</script>

<style scoped>
.comparison-section {
  padding: 80px 24px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.comparison-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 36px;
}

.comparison-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: #f1f5f9;
}

.header-decoration {
  display: flex;
  gap: 6px;
}

.header-decoration span {
  width: 8px;
  height: 8px;
  background: #42b883;
  border-radius: 2px;
  animation: pulse-dot 2s ease-in-out infinite;
}

.header-decoration span:nth-child(2) { animation-delay: 0.2s; }
.header-decoration span:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse-dot {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.comparison-table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  background: rgba(66, 184, 131, 0.1);
}

.th {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.th.highlight {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s;
}

.table-row:hover {
  background: rgba(66, 184, 131, 0.05);
}

.table-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.td {
  padding: 14px 20px;
  font-size: 14px;
  color: #94a3b8;
}

.td.feature {
  font-weight: 600;
  color: #e2e8f0;
}

.td.old {
  text-decoration: line-through;
  opacity: 0.5;
}

.td.highlight {
  color: #42b883;
  font-weight: 600;
  background: rgba(66, 184, 131, 0.05);
}
</style>
