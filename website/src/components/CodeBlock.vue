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
    <pre class="code-content"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  label: string;
  code: string;
}>();

const copied = ref(false);

const highlightedCode = computed(() => highlightCode(props.code));

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightCode(code: string): string {
  const lines = code.split('\n');
  return lines.map(line => highlightLine(line)).join('\n');
}

function highlightLine(line: string): string {
  // Check for comment
  const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
  if (commentMatch) {
    return commentMatch[1] + '<span class="hl-comment">' + escapeHtml(commentMatch[2]) + '</span>';
  }

  // Check for import/export statement
  const importMatch = line.match(/^(\s*)(import|export)\s+(.*?)\s+from\s+('.*?'|".*?")/);
  if (importMatch) {
    return importMatch[1] + 
           '<span class="hl-keyword">' + importMatch[2] + '</span> ' +
           escapeHtml(importMatch[3]) + ' ' +
           '<span class="hl-keyword">from</span> ' +
           '<span class="hl-string">' + escapeHtml(importMatch[4]) + '</span>';
  }

  // Check for const/let/var declaration
  const declMatch = line.match(/^(\s*)(const|let|var)\s+(\w+)\s*=\s*(.*)$/);
  if (declMatch) {
    return declMatch[1] + 
           '<span class="hl-keyword">' + declMatch[2] + '</span> ' +
           '<span class="hl-var">' + escapeHtml(declMatch[3]) + '</span> = ' +
           highlightExpression(declMatch[4]);
  }

  // Check for function declaration
  const fnMatch = line.match(/^(\s*)(function)\s+(\w+)\s*\((.*?)\)/);
  if (fnMatch) {
    return fnMatch[1] + 
           '<span class="hl-keyword">' + fnMatch[2] + '</span> ' +
           '<span class="hl-fn">' + escapeHtml(fnMatch[3]) + '</span>(' +
           escapeHtml(fnMatch[4]) + ')';
  }

  // Check for return statement
  const returnMatch = line.match(/^(\s*)(return)\s+(.*)$/);
  if (returnMatch) {
    return returnMatch[1] + '<span class="hl-keyword">return</span> ' + highlightExpression(returnMatch[2]);
  }

  // Default: just escape HTML
  return escapeHtml(line);
}

function highlightExpression(expr: string): string {
  // Highlight strings
  let result = expr.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, 
    '<span class="hl-string">$1</span>');
  
  // Highlight numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
  
  // Highlight function calls
  result = result.replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="hl-fn">$1</span>(');
  
  return result;
}

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
  color: #e2e8f0;
}

.hl-keyword { color: #c084fc; }
.hl-string { color: #86efac; }
.hl-number { color: #fbbf24; }
.hl-comment { color: #64748b; font-style: italic; }
.hl-fn { color: #60a5fa; }
.hl-var { color: #e2e8f0; }
.hl-tag { color: #7dd3fc; }
.hl-prop { color: #93c5fd; }
</style>
