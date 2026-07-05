<template>
  <div class="page-package-detail" v-if="pkg">
    <div class="page-header">
      <div class="container">
        <router-link to="/packages" class="back-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          返回包列表
        </router-link>
        <div class="header-content">
          <div class="package-icon" v-html="pkg.icon"></div>
          <div class="header-info">
            <h1>{{ pkg.name }}</h1>
            <p>{{ pkg.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="detail-content">
      <div class="container">
        <div class="detail-layout">
          <main class="detail-main">
            <!-- 安装 -->
            <div class="detail-section">
              <h2>安装</h2>
              <CodeBlock label="Terminal" :code="pkg.install" language="bash" />
            </div>

            <!-- 说明 -->
            <div class="detail-section">
              <h2>说明</h2>
              <p>{{ pkg.description }}</p>
            </div>

            <!-- 特性 -->
            <div class="detail-section">
              <h2>特性</h2>
              <ul class="feature-list">
                <li v-for="feature in pkg.highlights" :key="feature">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vte-primary)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- 使用示例 -->
            <div class="detail-section">
              <h2>使用示例</h2>
              <CodeBlock label="示例代码" :code="pkg.usage" language="typescript" />
            </div>

            <!-- API -->
            <div class="detail-section" v-if="pkg.apiItems && pkg.apiItems.length > 0">
              <h2>API</h2>
              <div v-for="api in pkg.apiItems" :key="api.name" class="api-item">
                <div class="api-header">
                  <span class="api-badge">API</span>
                  <code class="api-signature">{{ api.signature }}</code>
                </div>
                <p class="api-desc">{{ api.description }}</p>

                <div v-if="api.params && api.params.length > 0" class="api-params">
                  <h4>参数</h4>
                  <div class="params-table">
                    <div class="param-row header">
                      <div class="param-name">名称</div>
                      <div class="param-type">类型</div>
                      <div class="param-desc">说明</div>
                    </div>
                    <div v-for="param in api.params" :key="param.name" class="param-row">
                      <div class="param-name">{{ param.name }}</div>
                      <div class="param-type">{{ param.type }}</div>
                      <div class="param-desc">{{ param.desc }}</div>
                    </div>
                  </div>
                </div>

                <div v-if="api.returns" class="api-returns">
                  <h4>返回值</h4>
                  <p>{{ api.returns }}</p>
                </div>

                <div v-if="api.example" class="api-example">
                  <h4>示例</h4>
                  <CodeBlock label="示例" :code="api.example" language="typescript" />
                </div>
              </div>
            </div>
          </main>

          <aside class="detail-sidebar">
            <div class="sidebar-card">
              <h4>快速链接</h4>
              <a :href="pkg.npmUrl" target="_blank" class="sidebar-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                npm
              </a>
              <a :href="pkg.githubUrl" target="_blank" class="sidebar-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>

            <div class="sidebar-card">
              <h4>相关包</h4>
              <router-link
                v-for="(p, key) in relatedPackages"
                :key="key"
                :to="p.url"
                class="related-link"
              >
                {{ p.name }}
              </router-link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <div class="container">
      <h2>包未找到</h2>
      <router-link to="/packages" class="back-btn">返回包列表</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { packages } from "../data/packages";
import CodeBlock from "../components/CodeBlock.vue";

const route = useRoute();
const pkgName = computed(() => route.params.name as string);
const pkg = computed(() => packages[pkgName.value]);

const relatedPackages = computed(() => {
  if (!pkg.value) return {};
  const related: Record<string, any> = {};
  for (const [key, p] of Object.entries(packages)) {
    if (key !== pkgName.value) {
      related[key] = p;
    }
  }
  return related;
});
</script>

<style scoped>
.page-package-detail {
  padding-top: 80px;
}

.page-header {
  padding: 60px 24px 40px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vte-primary) 10%, transparent) 0%, transparent 100%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vte-text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--vte-primary);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.package-icon {
  width: 72px;
  height: 72px;
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 20%, transparent);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vte-primary);
}

.header-info h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--vte-text);
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 8px;
}

.header-info p {
  font-size: 16px;
  color: var(--vte-text-secondary);
}

.detail-content {
  padding: 60px 24px;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 48px;
}

.detail-section {
  margin-bottom: 48px;
}

.detail-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--vte-text);
  margin-bottom: 20px;
}

.detail-section p {
  font-size: 16px;
  color: var(--vte-text-secondary);
  line-height: 1.8;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vte-text) 5%, transparent);
  font-size: 15px;
  color: var(--vte-text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

.api-item {
  background: rgba(var(--vte-bg-rgb), 0.3);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 10%, transparent);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.api-item .api-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.api-badge {
  padding: 4px 10px;
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.api-signature {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--vte-primary);
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  padding: 4px 8px;
  border-radius: 4px;
}

.api-desc {
  font-size: 15px;
  color: var(--vte-text-secondary);
  margin-bottom: 16px;
}

.api-params h4,
.api-returns h4,
.api-example h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vte-text);
  margin-bottom: 12px;
}

.params-table {
  border: 1px solid color-mix(in srgb, var(--vte-text) 10%, transparent);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.params-table .param-row {
  display: grid;
  grid-template-columns: 120px 140px 1fr;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--vte-text) 5%, transparent);
}

.params-table .param-row:last-child {
  border-bottom: none;
}

.params-table .param-row.header {
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  font-weight: 600;
  font-size: 12px;
  color: var(--vte-text-secondary);
}

.params-table .param-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--vte-text);
}

.params-table .param-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--vte-primary);
}

.params-table .param-desc {
  font-size: 13px;
  color: var(--vte-text-secondary);
}

.api-returns p {
  font-size: 14px;
  color: var(--vte-text-secondary);
  margin: 0;
}

.detail-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-card {
  background: rgba(var(--vte-bg-rgb), 0.5);
  border: 1px solid color-mix(in srgb, var(--vte-primary) 15%, transparent);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.sidebar-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vte-text);
  margin-bottom: 16px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: var(--vte-text-secondary);
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.sidebar-link:hover {
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  color: var(--vte-text);
}

.related-link {
  display: block;
  padding: 10px 12px;
  color: var(--vte-text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.related-link:hover {
  background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
  color: var(--vte-primary);
}

.not-found {
  padding: 120px 24px;
  text-align: center;
}

.not-found h2 {
  font-size: 32px;
  color: var(--vte-text);
  margin-bottom: 24px;
}

.back-btn {
  color: var(--vte-primary);
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
  }
}
</style>
