<template>
  <div class="app" :class="{ dark: isDark }">
    <MouseGlow />
    <ScanLines />
    <FloatingOrbs />
    <Navbar :is-dark="isDark" @toggle-theme="isDark = !isDark" />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import MouseGlow from "./components/MouseGlow.vue";
import ScanLines from "./components/ScanLines.vue";
import FloatingOrbs from "./components/FloatingOrbs.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const isDark = ref(true);

watch(isDark, (val) => {
  document.documentElement.classList.toggle("dark", val);
}, { immediate: true });
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --vte-primary: #42b883;
  --vte-primary-light: #6dd5a0;
  --vte-dark: #35495e;
  --vte-bg: #0f172a;
  --vte-bg-rgb: 15, 23, 42;
  --vte-bg-alt: #1e293b;
  --vte-bg-alt-rgb: 30, 41, 59;
  --vte-bg-code: #0a0f1a;
  --vte-text: #f1f5f9;
  --vte-text-secondary: #94a3b8;
  --vte-border: #334155;
  --vte-gradient: linear-gradient(135deg, #42b883 0%, #35495e 100%);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--vte-bg);
  color: var(--vte-text);
  line-height: 1.6;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
}

::selection {
  background: rgba(66, 184, 131, 0.4);
  color: white;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--vte-bg-alt);
}

::-webkit-scrollbar-thumb {
  background: var(--vte-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  color: var(--vte-primary);
}

/* Light mode */
html:not(.dark) {
  --vte-bg: #ffffff;
  --vte-bg-rgb: 255, 255, 255;
  --vte-bg-alt: #f8fafc;
  --vte-bg-alt-rgb: 248, 250, 252;
  --vte-bg-code: #f1f5f9;
  --vte-text: #1e293b;
  --vte-text-secondary: #64748b;
  --vte-border: #e2e8f0;
}

code, pre {
  font-family: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
}
</style>
