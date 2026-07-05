<template>
  <div class="editor">
    <div class="editor-header">
      <h3 class="editor-title">{{ path }}</h3>
      <button class="editor-delete" @click="$emit('remove')"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> 删除</button>
    </div>

    <div class="editor-fields">
      <div class="field">
        <label class="field-label">值</label>
        <div class="field-row">
          <input
            v-model="localValue"
            class="field-input"
            :placeholder="isColor ? '#3b82f6' : '1rem'"
            @input="handleInput"
          />
          <div v-if="isColor" class="color-picker-wrapper">
            <input type="color" :value="colorValue" class="color-picker" @input="handleColorInput" />
          </div>
        </div>
      </div>

      <div v-if="layer !== 'primitive'" class="field">
        <label class="field-label">引用</label>
        <div class="field-row">
          <label class="toggle">
            <input type="checkbox" v-model="isReference" @change="handleToggleRef" />
            <span class="toggle-label">使用引用</span>
          </label>
        </div>
        <div v-if="isReference" class="ref-picker">
          <input
            v-model="refSearch"
            class="ref-input"
            placeholder="搜索 token 路径..."
          />
          <div class="ref-dropdown">
            <div
              v-for="p in filteredRefs"
              :key="p"
              class="ref-item"
              @click="selectRef(p)"
            >
              <span class="ref-path">{{ p }}</span>
              <span class="ref-value">{{ getRefValue(p) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="field-label">解析值</label>
        <div class="resolved-value">
          <code>{{ resolvedValue }}</code>
          <span v-if="isColor && resolvedValue" class="color-swatch" :style="{ background: resolvedValue }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { TokenValue } from "../composables/useTokenStore";

const props = defineProps<{
  path: string;
  token: TokenValue | null;
  allPaths: string[];
  layer: string;
}>();

const emit = defineEmits<{
  updateValue: [value: string];
  remove: [];
}>();

const localValue = ref(props.token?.raw || "");
const isReference = ref(/^\{.+\}$/.test(props.token?.raw || ""));
const refSearch = ref("");

watch(() => props.token?.raw, (val) => {
  localValue.value = val || "";
  isReference.value = /^\{.+\}$/.test(val || "");
});

const isColor = computed(() => {
  const val = resolvedValue.value;
  return val && (val.startsWith("#") || val.startsWith("rgb"));
});

const colorValue = computed(() => {
  const val = resolvedValue.value;
  if (val && val.startsWith("#") && val.length <= 7) return val;
  return "#000000";
});

const resolvedValue = computed(() => props.token?.value || "");

const filteredRefs = computed(() => {
  const q = refSearch.value.toLowerCase();
  return props.allPaths
    .filter((p) => p !== props.path && p.toLowerCase().includes(q))
    .slice(0, 10);
});

function handleInput() {
  emit("updateValue", localValue.value);
}

function handleColorInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  localValue.value = val;
  emit("updateValue", val);
}

function handleToggleRef() {
  if (isReference.value) {
    localValue.value = "{}";
  } else {
    localValue.value = resolvedValue.value || "";
  }
  emit("updateValue", localValue.value);
}

function selectRef(path: string) {
  localValue.value = `{${path}}`;
  isReference.value = true;
  refSearch.value = "";
  emit("updateValue", localValue.value);
}

function getRefValue(path: string): string {
  return "";
}
</script>

<style scoped>
.editor {
  background: var(--vte-bg-alt);
  border: 1px solid var(--vte-border);
  border-radius: 12px;
  padding: 20px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vte-border);
}

.editor-title {
  font-size: 16px;
  font-weight: 600;
  font-family: monospace;
  margin: 0;
  color: var(--vte-primary);
}

.editor-delete {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #ef4444;
  border-radius: 6px;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 12px;
}

.editor-delete:hover {
  background: #ef4444;
  color: white;
}

.editor-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--vte-text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field-row {
  display: flex;
  gap: 8px;
}

.field-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  font-size: 14px;
  font-family: monospace;
  background: var(--vte-bg);
  color: var(--vte-text);
}

.field-input:focus {
  outline: none;
  border-color: var(--vte-primary);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.color-picker-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vte-border);
}

.color-picker {
  width: 48px;
  height: 48px;
  margin: -4px;
  border: none;
  cursor: pointer;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-label {
  color: var(--vte-text);
}

.ref-picker {
  margin-top: 8px;
}

.ref-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  font-size: 13px;
  background: var(--vte-bg);
  color: var(--vte-text);
  box-sizing: border-box;
}

.ref-input:focus {
  outline: none;
  border-color: var(--vte-primary);
}

.ref-dropdown {
  margin-top: 4px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  background: var(--vte-bg-alt);
}

.ref-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s;
}

.ref-item:hover {
  background: var(--vte-bg);
}

.ref-path {
  font-family: monospace;
  color: var(--vte-primary);
}

.ref-value {
  color: var(--vte-text-secondary);
  font-size: 12px;
}

.resolved-value {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--vte-bg);
  border-radius: 8px;
  border: 1px solid var(--vte-border);
}

.resolved-value code {
  font-family: monospace;
  font-size: 14px;
  color: var(--vte-text);
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid var(--vte-border);
}

@media (max-width: 768px) {
  .editor {
    padding: 14px;
    border-radius: 10px;
  }

  .editor-header {
    margin-bottom: 14px;
    padding-bottom: 10px;
  }

  .editor-title {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .editor-delete {
    padding: 8px 12px;
    font-size: 12px;
    min-height: 36px;
    flex-shrink: 0;
  }

  .field-input {
    padding: 10px 12px;
    font-size: 13px;
  }

  .resolved-value {
    padding: 8px 12px;
  }

  .resolved-value code {
    font-size: 13px;
    word-break: break-all;
  }
}
</style>
