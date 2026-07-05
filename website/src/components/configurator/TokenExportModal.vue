<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h3>导出 Tokens</h3>
        <button class="close-btn" @click="$emit('close')"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div class="modal-body">
        <div class="format-tabs">
          <button
            v-for="f in formats"
            :key="f.id"
            :class="['tab', { active: activeFormat === f.id }]"
            @click="activeFormat = f.id"
          >{{ f.name }}</button>
        </div>
        <pre class="code-output"><code>{{ output }}</code></pre>
      </div>
      <div class="modal-footer">
        <button class="btn secondary" @click="handleDownload"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 下载</button>
        <button class="btn primary" @click="handleCopy"><svg v-if="!copied" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> {{ copied ? '已复制' : '复制' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { TokenValue } from "../../composables/useTokenStore";
import { useTokenExport } from "../../composables/useTokenExport";

const props = defineProps<{ tokenMap: Map<string, TokenValue> }>();
defineEmits<{ close: [] }>();

const { exportContent, getExtension, copyToClipboard, downloadFile } = useTokenExport();

const activeFormat = ref("ts");
const copied = ref(false);

const formats = [
  { id: "ts", name: "TypeScript" },
  { id: "json", name: "JSON" },
  { id: "css", name: "CSS Variables" },
  { id: "scss", name: "SCSS" },
];

const output = computed(() => exportContent(props.tokenMap, activeFormat.value));

async function handleCopy() {
  await copyToClipboard(output.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 1500);
}

function handleDownload() {
  downloadFile(output.value, `design-tokens.${getExtension(activeFormat.value)}`);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 640px;
  max-width: 90vw;
  background: var(--vte-bg-alt);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--vte-border);
}

.modal-header h3 { margin: 0; color: var(--vte-text); }
.close-btn { display: flex; align-items: center; justify-content: center; border: none; background: none; cursor: pointer; color: var(--vte-text-secondary); padding: 4px; }

.modal-body {
  padding: 20px;
}

.format-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vte-border);
  padding-bottom: 8px;
}

.tab {
  padding: 6px 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: var(--vte-text-secondary);
  border-radius: 6px;
}

.tab:hover { background: var(--vte-bg); }
.tab.active { background: var(--vte-primary); color: white; }

.code-output {
  background: var(--vte-bg-code);
  color: var(--vte-text);
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 400px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid var(--vte-border);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid var(--vte-border);
}

.btn.primary {
  background: var(--vte-primary);
  color: white;
  border-color: var(--vte-primary);
}

.btn.secondary {
  background: transparent;
  color: var(--vte-text);
}
</style>
