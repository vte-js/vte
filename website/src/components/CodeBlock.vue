<template>
  <div class="code-block">
    <div class="code-header">
      <span class="code-label">{{ label }}</span>
      <button class="copy-btn" @click="copyCode">
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
    <pre><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  label: string;
  code: string;
  language?: string;
}>();

const copied = ref(false);

const highlightedCode = computed(() => {
  return highlightSyntax(props.code, props.language);
});

function highlightSyntax(code: string, language?: string): string {
  // Escape HTML first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // TypeScript/JavaScript highlighting
  html = html
    // Comments
    .replace(/(\/\/.*$)/gm, '<span class="hl-comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>')
    // Strings (single, double, backtick)
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="hl-string">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="hl-string">$1</span>')
    .replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="hl-string">$1</span>')
    // Keywords
    .replace(/\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|extends|new|async|await|typeof|instanceof|interface|type|enum)\b/g, '<span class="hl-keyword">$1</span>')
    // Functions
    .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="hl-fn">$1</span>(')
    // Numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>')
    // Vue/React tags
    .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>')
    // CSS properties (for style blocks)
    .replace(/([\w-]+)\s*:/g, '<span class="hl-prop">$1</span>:');

  return html;
}

function copyCode() {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>

<style scoped>
.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
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

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #e2e8f0;
}

:deep(.hl-keyword) { color: #c084fc; }
:deep(.hl-string) { color: #86efac; }
:deep(.hl-number) { color: #fbbf24; }
:deep(.hl-comment) { color: #64748b; font-style: italic; }
:deep(.hl-fn) { color: #60a5fa; }
:deep(.hl-tag) { color: #7dd3fc; }
:deep(.hl-prop) { color: #93c5fd; }
:deep(.hl-type) { color: #22d3ee; }
</style>
