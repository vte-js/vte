<template>
  <div class="drawer-overlay" @click.self="$emit('close')">
    <div class="drawer">
      <div class="drawer-header">
        <h3>选择模板</h3>
        <button class="close-btn" @click="$emit('close')"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div class="template-list">
        <div
          v-for="t in templates"
          :key="t.id"
          class="template-card"
          @click="$emit('select', t)"
        >
          <span class="template-icon">{{ t.icon }}</span>
          <div class="template-info">
            <h4>{{ t.name }}</h4>
            <p>{{ t.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTokenTemplates } from "../../composables/useTokenTemplates";

defineEmits<{ close: []; select: [template: any] }>();

const { getTemplates } = useTokenTemplates();
const templates = getTemplates();
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 380px;
  max-width: 90vw;
  background: var(--vte-bg-alt);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--vte-border);
}

.drawer-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--vte-text);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vte-text-secondary);
  padding: 4px;
}

.template-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--vte-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.template-card:hover {
  border-color: var(--vte-primary);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.15);
}

.template-icon {
  font-size: 32px;
}

.template-info h4 {
  margin: 0 0 4px;
  font-size: 15px;
  color: var(--vte-text);
}

.template-info p {
  margin: 0;
  font-size: 13px;
  color: var(--vte-text-secondary);
}
</style>
