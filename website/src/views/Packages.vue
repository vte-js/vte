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
    <PackagesContent />
  </div>
</template>

<script setup lang="ts">
import PackagesContent from "../components/PackagesContent.vue";
</script>

<style scoped>
.page-packages {
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
</style>
