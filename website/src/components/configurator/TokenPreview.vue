<template>
  <div class="preview">
    <div class="preview-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >{{ tab.icon }} {{ tab.name }}</button>
    </div>

    <div class="preview-content">
      <div v-if="activeTab === 'colors'" class="color-grid">
        <div v-for="[path, token] in colorTokens" :key="path" class="color-card" :style="{ background: token.value }">
          <span class="color-name">{{ path.split('.').pop() }}</span>
          <span class="color-hex">{{ token.value }}</span>
        </div>
        <div v-if="colorTokens.length === 0" class="empty">暂无颜色 token</div>
      </div>

      <div v-if="activeTab === 'spacing'" class="spacing-list">
        <div v-for="[path, token] in spacingTokens" :key="path" class="spacing-item">
          <div class="spacing-bar" :style="{ width: `calc(${token.value} * 20)` }"></div>
          <span class="spacing-label">{{ path.split('.').pop() }}: {{ token.value }}</span>
        </div>
        <div v-if="spacingTokens.length === 0" class="empty">暂无间距 token</div>
      </div>

      <div v-if="activeTab === 'font'" class="font-list">
        <div v-for="[path, token] in fontTokens" :key="path" class="font-item">
          <p class="font-preview" :style="{ fontSize: token.value }">The quick brown fox</p>
          <span class="font-label">{{ path.split('.').pop() }}: {{ token.value }}</span>
        </div>
        <div v-if="fontTokens.length === 0" class="empty">暂无字号 token</div>
      </div>

      <div v-if="activeTab === 'shadow'" class="shadow-grid">
        <div v-for="[path, token] in shadowTokens" :key="path" class="shadow-card" :style="{ boxShadow: token.value }">
          <span class="shadow-label">{{ path.split('.').pop() }}</span>
        </div>
        <div v-if="shadowTokens.length === 0" class="empty">暂无阴影 token</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { TokenValue } from "../composables/useTokenStore";

const props = defineProps<{
  tokenMap: Map<string, TokenValue>;
  activePath?: string | null;
}>();

const activeTab = ref("colors");

// Auto-switch tab based on selected token
watch(() => props.activePath, (path) => {
  if (!path) return;
  if (path.includes("color")) activeTab.value = "colors";
  else if (path.includes("spacing")) activeTab.value = "spacing";
  else if (path.includes("fontSize")) activeTab.value = "font";
  else if (path.includes("shadow")) activeTab.value = "shadow";
});

const tabs = [
  { id: "colors", name: "颜色", icon: "🎨" },
  { id: "spacing", name: "间距", icon: "📐" },
  { id: "font", name: "字号", icon: "📝" },
  { id: "shadow", name: "阴影", icon: "🌫️" },
];

const colorTokens = computed(() =>
  Array.from(props.tokenMap.entries()).filter(([, t]) => t.value && (t.value.startsWith("#") || t.value.startsWith("rgb")))
);

const spacingTokens = computed(() =>
  Array.from(props.tokenMap.entries()).filter(([p]) => p.includes("spacing"))
);

const fontTokens = computed(() =>
  Array.from(props.tokenMap.entries()).filter(([p]) => p.includes("fontSize"))
);

const shadowTokens = computed(() =>
  Array.from(props.tokenMap.entries()).filter(([p]) => p.includes("shadow"))
);
</script>

<style scoped>
.preview {
  background: var(--vte-bg-alt);
  border: 1px solid var(--vte-border);
  border-radius: 12px;
  overflow: hidden;
}

.preview-tabs {
  display: flex;
  border-bottom: 1px solid var(--vte-border);
}

.tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: var(--vte-text-secondary);
  transition: all 0.15s;
}

.tab:hover {
  background: var(--vte-bg);
}

.tab.active {
  color: var(--vte-primary);
  border-bottom: 2px solid var(--vte-primary);
  font-weight: 600;
}

.preview-content {
  padding: 16px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.color-card {
  height: 70px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 10px;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.spacing-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spacing-bar {
  height: 24px;
  background: var(--vte-primary);
  border-radius: 4px;
  min-width: 20px;
}

.spacing-label {
  font-size: 12px;
  color: var(--vte-text-secondary);
  font-family: monospace;
}

.font-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.font-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.font-preview {
  margin: 0;
  color: var(--vte-text);
}

.font-label {
  font-size: 12px;
  color: var(--vte-text-secondary);
  font-family: monospace;
  white-space: nowrap;
}

.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.shadow-card {
  height: 80px;
  background: var(--vte-bg-alt);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shadow-label {
  font-size: 12px;
  color: var(--vte-text-secondary);
}

.empty {
  padding: 24px;
  text-align: center;
  color: var(--vte-text-secondary);
  font-size: 13px;
}
</style>
