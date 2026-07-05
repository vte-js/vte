<template>
  <div class="api-item">
    <div class="api-header">
      <span :class="['api-badge', badgeClass]">{{ item.badge }}</span>
      <h3>{{ item.name }}</h3>
    </div>
    <code class="api-signature">{{ item.signature }}</code>
    <p class="api-desc">{{ item.description }}</p>

    <div v-if="item.params && item.params.length > 0" class="api-params">
      <h4>参数</h4>
      <div class="params-table">
        <div class="param-row header">
          <div class="param-name">名称</div>
          <div class="param-type">类型</div>
          <div class="param-desc">说明</div>
        </div>
        <div v-for="param in item.params" :key="param.name" class="param-row">
          <div class="param-name">{{ param.name }}</div>
          <div class="param-type">{{ param.type }}</div>
          <div class="param-desc">{{ param.desc }}</div>
        </div>
      </div>
    </div>

    <div v-if="item.returns" class="api-returns">
      <h4>返回值</h4>
      <p>{{ item.returns }}</p>
    </div>

    <div v-if="item.code" class="api-code">
      <CodeBlock label="类型定义" :code="item.code" language="typescript" />
    </div>

    <div v-if="item.example" class="api-example">
      <h4>示例</h4>
      <CodeBlock label="示例" :code="item.example" language="typescript" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";

const props = defineProps<{
  item: {
    name: string;
    badge: string;
    signature: string;
    description: string;
    params?: { name: string; type: string; desc: string }[];
    returns?: string;
    code?: string;
    example?: string;
  };
}>();

const badgeClass = computed(() => {
  const map: Record<string, string> = {
    Function: "function",
    Async: "async",
    Type: "type",
    Interface: "type",
    Plugin: "plugin",
    Syntax: "syntax",
    Component: "component",
    Hook: "hook",
    Class: "class",
    Method: "method",
    Command: "command",
  };
  return map[props.item.badge] || "default";
});
</script>

<style scoped>
.api-item {
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(66, 184, 131, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.api-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.api-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.api-badge.function { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
.api-badge.async { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
.api-badge.type { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
.api-badge.plugin { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
.api-badge.syntax { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
.api-badge.component { background: rgba(244, 114, 182, 0.2); color: #f472b6; }
.api-badge.hook { background: rgba(251, 146, 60, 0.2); color: #fb923c; }
.api-badge.class { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
.api-badge.method { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
.api-badge.command { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }

.api-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
}

.api-signature {
  display: block;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #42b883;
  margin-bottom: 12px;
  overflow-x: auto;
}

.api-desc {
  font-size: 15px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 16px;
}

.api-params h4,
.api-returns h4,
.api-code h4,
.api-example h4 {
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 16px 0 10px;
}

.api-returns p {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.params-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.params-table .param-row {
  display: grid;
  grid-template-columns: 120px 140px 1fr;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.params-table .param-row:last-child {
  border-bottom: none;
}

.params-table .param-row.header {
  background: rgba(66, 184, 131, 0.1);
  font-weight: 600;
  font-size: 12px;
  color: #94a3b8;
}

.params-table .param-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #f1f5f9;
}

.params-table .param-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #42b883;
}

.params-table .param-desc {
  font-size: 13px;
  color: #94a3b8;
}
</style>
