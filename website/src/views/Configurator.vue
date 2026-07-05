<template>
  <div class="configurator">
    <header class="config-header">
      <div class="config-header-content">
        <div>
          <h1 class="config-title">Token Configurator</h1>
          <p class="config-desc">可视化创建和编辑 Design Tokens</p>
        </div>
        <div class="config-actions">
          <button class="action-btn" @click="showTemplates = true">📋 模板</button>
          <button class="action-btn" @click="showImport = true">📥 导入</button>
          <button class="action-btn primary" @click="showExport = true">📤 导出</button>
          <button class="action-btn danger" @click="handleClear">🗑️ 清空</button>
        </div>
      </div>
    </header>

    <div class="config-body">
      <TokenSidebar
        :tree="tree"
        :active-layer="activeLayer"
        :active-path="activePath"
        @select-layer="activeLayer = $event"
        @select-token="selectToken"
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

@media (max-width: 768px) {
  .config-header-content { flex-direction: column; align-items: flex-start; }
  .config-body { flex-direction: column; }
}
</style>
