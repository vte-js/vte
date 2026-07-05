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
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">Terminal</span>
                  <button class="copy-btn" @click="copyInstall">
                    {{ copiedInstall ? '✓ 已复制' : '复制' }}
                  </button>
                </div>
                <pre><code>{{ pkg.install }}</code></pre>
              </div>
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
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#42b883" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- 使用示例 -->
            <div class="detail-section">
              <h2>使用示例</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">示例代码</span>
                  <button class="copy-btn" @click="copyUsage">
                    {{ copiedUsage ? '✓ 已复制' : '复制' }}
                  </button>
                </div>
                <pre><code>{{ pkg.usage }}</code></pre>
              </div>
            </div>

            <!-- API -->
            <div class="detail-section" v-if="pkg.api">
              <h2>API</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">API Reference</span>
                  <button class="copy-btn" @click="copyApi">
                    {{ copiedApi ? '✓ 已复制' : '复制' }}
                  </button>
                </div>
                <pre><code>{{ pkg.api }}</code></pre>
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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { packages } from "../data/packages";

const route = useRoute();
const pkgName = computed(() => route.params.name as string);
const pkg = computed(() => packages[pkgName.value]);

const copiedInstall = ref(false);
const copiedUsage = ref(false);
const copiedApi = ref(false);

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

function copyInstall() {
  if (pkg.value) {
    navigator.clipboard.writeText(pkg.value.install);
    copiedInstall.value = true;
    setTimeout(() => { copiedInstall.value = false; }, 2000);
  }
}

function copyUsage() {
  if (pkg.value) {
    navigator.clipboard.writeText(pkg.value.usage);
    copiedUsage.value = true;
    setTimeout(() => { copiedUsage.value = false; }, 2000);
  }
}

function copyApi() {
  if (pkg.value && pkg.value.api) {
    navigator.clipboard.writeText(pkg.value.api);
    copiedApi.value = true;
    setTimeout(() => { copiedApi.value = false; }, 2000);
  }
}
</script>

<style scoped>
.page-package-detail {
  padding-top: 80px;
}

.page-header {
  padding: 60px 24px 40px;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #42b883;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.package-icon {
  width: 72px;
  height: 72px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}

.header-info h1 {
  font-size: 36px;
  font-weight: 800;
  color: #f1f5f9;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 8px;
}

.header-info p {
  font-size: 16px;
  color: #94a3b8;
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
  color: #f1f5f9;
  margin-bottom: 20px;
}

.detail-section p {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.8;
}

.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-label {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
}

.copy-btn {
  background: rgba(66, 184, 131, 0.2);
  border: none;
  color: #42b883;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(66, 184, 131, 0.3);
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #e2e8f0;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 15px;
  color: #94a3b8;
}

.feature-list li:last-child {
  border-bottom: none;
}

.detail-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.sidebar-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 16px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.sidebar-link:hover {
  background: rgba(66, 184, 131, 0.1);
  color: #f1f5f9;
}

.related-link {
  display: block;
  padding: 10px 12px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.related-link:hover {
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
}

.not-found {
  padding: 120px 24px;
  text-align: center;
}

.not-found h2 {
  font-size: 32px;
  color: #f1f5f9;
  margin-bottom: 24px;
}

.back-btn {
  color: #42b883;
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
