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
import { packages } from "../data/packages";
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
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
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
  margin-top: auto;
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
