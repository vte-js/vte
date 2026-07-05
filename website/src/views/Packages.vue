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
          <router-link
            v-for="(pkg, key) in packages"
            :key="key"
            :to="pkg.url"
            class="package-card"
          >
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
              <code>{{ pkg.install }}</code>
              <button class="copy-btn" @click.prevent="copyInstall(pkg.install)" :aria-label="copied === pkg.install ? '已复制' : '复制'">
                <svg v-if="copied !== pkg.install" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ copied === pkg.install ? '已复制' : '复制' }}
              </button>
            </div>
            <div class="package-link">
              查看文档
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { packages } from "../data/packages";

const copied = ref<string | null>(null);

function copyInstall(text: string) {
  navigator.clipboard.writeText(text);
  copied.value = text;
  setTimeout(() => { copied.value = null; }, 1500);
}
</script>

<style scoped>
.page-packages {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vte-primary) 10%, transparent) 0%, transparent 100%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vte-primary), transparent);
  margin: 0 auto 24px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 30%, transparent);
  color: var(--vte-primary);
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
  color: var(--vte-text);
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: var(--vte-text-secondary);
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
  background: rgba(var(--vte-bg-rgb), 0.5);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 15%, transparent);
  border-radius: 16px;
  padding: 28px;
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.package-card:hover {
  border-color: color-mix(in srgb, var(--vte-primary) 40%, transparent);
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
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 20%, transparent);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vte-primary);
}

.package-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--vte-text);
  font-family: 'JetBrains Mono', monospace;
}

.package-version {
  font-size: 12px;
  color: var(--vte-text-secondary);
}

.package-desc {
  font-size: 14px;
  color: var(--vte-text-secondary);
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
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 20%, transparent);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vte-primary);
}

.package-install {
  background: #0f172a;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  margin-top: auto;
  border: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.package-install code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #4ade80;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(66, 184, 131, 0.2);
  border: none;
  color: #42b883;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: rgba(66, 184, 131, 0.3);
}

.package-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--vte-primary);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.package-card:hover .package-link {
  color: #6dd5a0;
}

@media (max-width: 768px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
