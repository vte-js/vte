<template>
  <div class="preview">
    <div class="preview-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <svg v-if="tab.icon === 'circle'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
        <svg v-else-if="tab.icon === 'ruler'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
        <svg v-else-if="tab.icon === 'type'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
        <svg v-else-if="tab.icon === 'layers'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>{{ tab.name }}</span>
      </button>
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
  { id: "colors", name: "颜色", icon: "circle" },
  { id: "spacing", name: "间距", icon: "ruler" },
  { id: "font", name: "字号", icon: "type" },
  { id: "shadow", name: "阴影", icon: "layers" },
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
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

@media (max-width: 768px) {
  .preview {
    border-radius: 10px;
  }

  .tab {
    padding: 10px 6px;
    font-size: 12px;
  }

  .preview-content {
    padding: 12px;
  }

  .color-grid {
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 6px;
  }

  .color-card {
    height: 56px;
    font-size: 9px;
  }

  .spacing-item {
    gap: 8px;
  }

  .spacing-bar {
    height: 20px;
    min-width: 16px;
  }

  .font-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .shadow-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  .shadow-card {
    height: 64px;
  }
}
</style>
