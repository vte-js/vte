<template>
  <aside class="sidebar">
    <div v-for="layer in layers" :key="layer.id" class="layer-section">
      <div class="layer-header" @click="toggleLayer(layer.id)">
        <span class="layer-icon">{{ expanded[layer.id] ? '▼' : '▶' }}</span>
        <span class="layer-name">{{ layer.icon }} {{ layer.name }}</span>
        <span class="layer-count">{{ getLayerCount(layer.id) }}</span>
      </div>
      <div v-if="expanded[layer.id]" class="layer-content">
        <div v-for="(node, key) in getLayerNodes(layer.id)" :key="key" class="token-node">
          <div
            :class="['token-item', { active: activePath === `${layer.id}.${key}` }]"
            @click="$emit('selectToken', `${layer.id}.${key}`)"
          >
            <span class="token-name">{{ key }}</span>
            <span v-if="isLeaf(node)" class="token-val">{{ node.value || '—' }}</span>
            <button v-if="isLeaf(node)" class="token-del" @click.stop="$emit('removeToken', layer.id, `${layer.id}.${key}`)">×</button>
          </div>
          <div v-if="!isLeaf(node)" class="token-children">
            <div v-for="(child, childKey) in node.children" :key="childKey">
              <div
                :class="['token-item child', { active: activePath === `${layer.id}.${key}.${childKey}` }]"
                @click="$emit('selectToken', `${layer.id}.${key}.${childKey}`)"
              >
                <span class="token-name">{{ childKey }}</span>
                <span class="token-val">{{ child.value || '—' }}</span>
                <button class="token-del" @click.stop="$emit('removeToken', layer.id, `${layer.id}.${key}.${childKey}`)">×</button>
              </div>
            </div>
          </div>
        </div>
        <div class="add-token">
          <input
            v-model="newTokenPath"
            class="add-input"
            :placeholder="`添加 ${layer.id} token...`"
            @keyup.enter="handleAdd(layer.id)"
          />
          <button class="add-btn" @click="handleAdd(layer.id)">+</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { TokenNode } from "../composables/useTokenStore";

const props = defineProps<{
  tree: Record<string, Record<string, TokenNode>>;
  activeLayer: string;
  activePath: string | null;
}>();

const emit = defineEmits<{
  selectLayer: [layer: string];
  selectToken: [path: string];
  addToken: [layer: string, path: string];
  removeToken: [layer: string, path: string];
}>();

const layers = [
  { id: "primitive", name: "原始值", icon: "🎨" },
  { id: "semantic", name: "语义层", icon: "📐" },
  { id: "component", name: "组件层", icon: "🧩" },
];

const expanded = reactive<Record<string, boolean>>({ primitive: true, semantic: true, component: true });
const newTokenPath = ref("");

function toggleLayer(layer: string) {
  expanded[layer] = !expanded[layer];
  emit("selectLayer", layer);
}

function isLeaf(node: TokenNode): boolean {
  return !node.children || Object.keys(node.children).length === 0;
}

function getLayerNodes(layer: string): Record<string, TokenNode> {
  return props.tree[layer] || {};
}

function getLayerCount(layer: string): number {
  let count = 0;
  function walk(nodes: Record<string, any>) {
    for (const node of Object.values(nodes)) {
      if (node.children && Object.keys(node.children).length > 0) walk(node.children);
      else count++;
    }
  }
  walk(getLayerNodes(layer));
  return count;
}

function handleAdd(layer: string) {
  const path = newTokenPath.value.trim();
  if (path) {
    emit("addToken", layer, path);
    newTokenPath.value = "";
  }
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  background: var(--vte-bg-alt);
  border-right: 1px solid var(--vte-border);
  overflow-y: auto;
  padding: 12px 0;
}

.layer-section {
  margin-bottom: 4px;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--vte-text);
  transition: background 0.15s;
}

.layer-header:hover {
  background: var(--vte-bg);
}

.layer-icon {
  font-size: 10px;
  width: 12px;
  color: var(--vte-text-secondary);
}

.layer-count {
  margin-left: auto;
  font-size: 11px;
  color: var(--vte-text-secondary);
  background: var(--vte-bg);
  padding: 2px 6px;
  border-radius: 10px;
}

.layer-content {
  padding: 0 8px;
}

.token-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s;
}

.token-item:hover {
  background: var(--vte-bg);
}

.token-item.active {
  background: rgba(66, 184, 131, 0.15);
  color: var(--vte-primary);
}

.token-item.child {
  padding-left: 28px;
}

.token-name {
  flex: 1;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.token-val {
  font-size: 11px;
  color: var(--vte-text-secondary);
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.token-del {
  opacity: 0;
  border: none;
  background: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
  transition: opacity 0.15s;
}

.token-item:hover .token-del {
  opacity: 1;
}

.add-token {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
}

.add-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid var(--vte-border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--vte-bg);
  color: var(--vte-text);
}

.add-input:focus {
  outline: none;
  border-color: var(--vte-primary);
}

.add-btn {
  padding: 6px 10px;
  border: 1px solid var(--vte-border);
  border-radius: 6px;
  background: var(--vte-primary);
  color: white;
  cursor: pointer;
  font-size: 14px;
}
</style>
