<template>
  <div class="configurator">
    <header class="config-header">
      <div class="config-header-content">
        <div class="config-header-left">
          <button class="action-btn sidebar-toggle" @click="showSidebar = !showSidebar" aria-label="Toggle sidebar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          </button>
          <div>
            <h1 class="config-title">Token Configurator</h1>
            <p class="config-desc">可视化创建和编辑 Design Tokens</p>
          </div>
        </div>
        <div class="config-actions">
          <button class="action-btn" @click="showTemplates = true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> 模板</button>
          <button class="action-btn" @click="showImport = true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 导入</button>
          <button class="action-btn primary" @click="showExport = true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> 导出</button>
          <button class="action-btn danger" @click="handleClear"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> 清空</button>
        </div>
      </div>
    </header>

    <div class="config-body">
      <div class="sidebar-overlay" v-if="showSidebar" @click="showSidebar = false"></div>
      <TokenSidebar
        :tree="tree"
        :active-layer="activeLayer"
        :active-path="activePath"
        :class="{ 'sidebar-open': showSidebar }"
        @select-layer="activeLayer = $event"
        @select-token="handleSelectTokenMobile"
        @add-token="handleAddToken"
        @remove-token="handleRemoveToken"
      />

      <div class="config-main">
        <div class="config-search">
          <input v-model="searchQuery" class="search-input" placeholder="搜索 token..." />
          <span class="token-count">{{ tokenMap.size }} tokens</span>
        </div>

        <TokenEditor
          v-if="activePath"
          :path="activePath"
          :token="activeToken"
          :all-paths="allPaths"
          :layer="activeLayer"
          @update-value="handleUpdateValue"
          @remove="handleRemoveToken(activeLayer, activePath)"
        />
        <div v-else class="empty-editor">
          <p>选择左侧的 token 进行编辑，或点击「模板」快速开始</p>
        </div>

        <TokenPreview :token-map="tokenMap" :active-path="activePath" />
      </div>
    </div>

    <TemplateDrawer v-if="showTemplates" @close="showTemplates = false" @select="handleSelectTemplate" />
    <TokenImportModal v-if="showImport" @close="showImport = false" @import="handleImport" />
    <TokenExportModal v-if="showExport" :token-map="tokenMap" @close="showExport = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTokenStore } from "../composables/useTokenStore";
import TokenSidebar from "../components/configurator/TokenSidebar.vue";
import TokenEditor from "../components/configurator/TokenEditor.vue";
import TokenPreview from "../components/configurator/TokenPreview.vue";
import TemplateDrawer from "../components/configurator/TemplateDrawer.vue";
import TokenImportModal from "../components/configurator/TokenImportModal.vue";
import TokenExportModal from "../components/configurator/TokenExportModal.vue";

const store = useTokenStore();
const { tree, activePath, activeLayer, searchQuery, tokenMap, allPaths } = store;

const showTemplates = ref(false);
const showImport = ref(false);
const showExport = ref(false);
const showSidebar = ref(false);

function handleSelectTokenMobile(path: string) {
  selectToken(path);
  if (window.innerWidth <= 768) {
    showSidebar.value = false;
  }
}

const activeToken = computed(() => {
  if (!activePath.value) return null;
  return tokenMap.value.get(activePath.value) || null;
});

function selectToken(path: string) {
  activePath.value = path;
  // Sync activeLayer from the token path
  if (path.startsWith("primitive.")) activeLayer.value = "primitive";
  else if (path.startsWith("semantic.")) activeLayer.value = "semantic";
  else if (path.startsWith("component.")) activeLayer.value = "component";
}

function handleAddToken(layer: string, path: string) {
  store.addToken(layer, path);
  activePath.value = path;
}

function handleRemoveToken(layer: string, path: string) {
  store.removeToken(layer, path);
  if (activePath.value === path) activePath.value = null;
}

function handleUpdateValue(value: string) {
  if (activePath.value) {
    store.updateTokenValue(activeLayer.value, activePath.value, value);
  }
}

function handleSelectTemplate(template: any) {
  store.loadTemplate(template.tokens);
  showTemplates.value = false;
  activePath.value = null;
}

function handleImport(tree: any) {
  store.importTokens(tree);
  showImport.value = false;
  activePath.value = null;
}

function handleClear() {
  if (confirm("确定要清空所有 token 吗？")) {
    store.clearAll();
  }
}
</script>

<style scoped>
.configurator {
  min-height: 100vh;
  background: var(--vte-bg);
  color: var(--vte-text);
  padding-top: 72px;
}

.config-header {
  background: var(--vte-bg-alt);
  border-bottom: 1px solid var(--vte-border);
  padding: 16px 32px;
}

.config-header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.config-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: var(--vte-text);
}

.config-desc {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--vte-text-secondary);
}

.config-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  background: var(--vte-bg);
  color: var(--vte-text);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vte-primary);
}

.action-btn.primary {
  background: var(--vte-primary);
  color: white;
  border-color: var(--vte-primary);
}

.action-btn.danger {
  color: #ef4444;
  border-color: #ef4444;
}

.action-btn.danger:hover {
  background: #ef4444;
  color: white;
}

.config-body {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  height: calc(100vh - 72px);
  overflow: hidden;
}

.config-main {
  flex: 1;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  min-height: 0;
}

.config-main > :last-child {
  flex-shrink: 0;
}

.config-search {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  font-size: 14px;
  background: var(--vte-bg-alt);
  color: var(--vte-text);
}

.search-input:focus {
  outline: none;
  border-color: var(--vte-primary);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.token-count {
  font-size: 13px;
  color: var(--vte-text-secondary);
  white-space: nowrap;
}

.empty-editor {
  padding: 48px 24px;
  text-align: center;
  color: var(--vte-text-secondary);
  background: var(--vte-bg-alt);
  border-radius: 12px;
  border: 1px dashed var(--vte-border);
}

.config-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-toggle {
  display: none;
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .configurator {
    padding-top: 60px;
  }

  .config-header {
    padding: 10px 12px;
  }

  .config-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .config-header-left {
    width: 100%;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    flex-shrink: 0;
  }

  .config-title {
    font-size: 16px;
  }

  .config-desc {
    font-size: 12px;
  }

  .config-actions {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .action-btn {
    min-height: 40px;
    padding: 6px 8px;
    font-size: 12px;
    text-align: center;
    justify-content: center;
  }

  .config-body {
    flex-direction: column;
    position: relative;
    height: calc(100vh - 60px);
  }

  .config-main {
    padding: 12px;
    gap: 12px;
  }

  .search-input {
    padding: 10px 12px;
    font-size: 14px;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .config-body :deep(.sidebar) {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    width: 280px;
    min-width: 280px;
  }

  .config-body :deep(.sidebar.sidebar-open) {
    transform: translateX(0);
  }
}
</style>
