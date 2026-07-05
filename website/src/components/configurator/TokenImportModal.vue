<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h3>导入 Tokens</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <p class="hint">支持 JSON、TypeScript (defineTokens)、CSS Variables 格式</p>
        <textarea
          v-model="content"
          class="import-textarea"
          placeholder="粘贴 token 内容..."
          rows="12"
        ></textarea>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
      <div class="modal-footer">
        <button class="btn secondary" @click="$emit('close')">取消</button>
        <button class="btn primary" @click="handleImport" :disabled="!content.trim()">导入</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenImport } from "../../composables/useTokenImport";

const emit = defineEmits<{ close: []; import: [tree: any] }>();

const content = ref("");
const error = ref("");
const { importContent } = useTokenImport();

function handleImport() {
  error.value = "";
  try {
    const tree = importContent(content.value);
    emit("import", tree);
  } catch (e: any) {
    error.value = e.message;
  }
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
  width: 560px;
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
.close-btn { border: none; background: none; font-size: 24px; cursor: pointer; color: var(--vte-text-secondary); }

.modal-body {
  padding: 20px;
}

.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--vte-text-secondary);
}

.import-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vte-border);
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
  background: var(--vte-bg);
  color: var(--vte-text);
  box-sizing: border-box;
}

.import-textarea:focus {
  outline: none;
  border-color: var(--vte-primary);
}

.error {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(239,68,68,0.1);
  color: #ef4444;
  border-radius: 6px;
  font-size: 13px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid var(--vte-border);
}

.btn {
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

.btn.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.secondary {
  background: transparent;
  color: var(--vte-text);
}
</style>
