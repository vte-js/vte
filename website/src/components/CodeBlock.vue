<template>
  <div class="code-block">
    <div class="code-header">
      <span class="code-label">{{ displayLabel }}</span>
      <button class="copy-btn" @click="copyCode" :aria-label="copied ? 'Copied' : 'Copy code'">
        <svg v-if="!copied" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre class="code-content"><code ref="codeRef" :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";

const props = defineProps<{
  label?: string;
  code: string;
  language?: string;
}>();

const copied = ref(false);

const displayLabel = computed(() => props.label || props.language || "");
const codeRef = ref<HTMLElement | null>(null);

function highlight() {
  nextTick(() => {
    if (codeRef.value) {
      Prism.highlightElement(codeRef.value);
    }
  });
}

onMounted(() => {
  highlight();
});

watch(() => props.code, () => {
  highlight();
});

function copyCode() {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>

<style>
.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
  max-width: 100%;
  min-width: 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-label {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(66, 184, 131, 0.2);
  border: none;
  color: #42b883;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(66, 184, 131, 0.3);
}

.code-content {
  padding: 16px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  max-width: 100%;
}

@media (max-width: 768px) {
  .code-content {
    padding: 12px;
    font-size: 12px;
    line-height: 1.6;
  }
}

/* Prism.js Dark Theme */
code[class*="language-"],
pre[class*="language-"] {
  color: #e2e8f0;
  background: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.7;
  tab-size: 4;
  hyphens: none;
}

pre[class*="language-"] {
  padding: 16px;
  overflow: auto;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #64748b;
}

.token.punctuation {
  color: #94a3b8;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #fbbf24;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #86efac;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #f472b6;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #c084fc;
}

.token.function,
.token.class-name {
  color: #60a5fa;
}

.token.regex,
.token.important,
.token.variable {
  color: #fb923c;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}
</style>
