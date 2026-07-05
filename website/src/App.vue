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
import { ref, onMounted } from "vue";
import MouseGlow from "./components/MouseGlow.vue";
import ScanLines from "./components/ScanLines.vue";
import FloatingOrbs from "./components/FloatingOrbs.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const isDark = ref(true);

onMounted(() => {
  document.documentElement.classList.add("dark");
});
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
  --vte-bg-alt: #1e293b;
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
  background: var(--vte-primary);
}

code, pre {
  font-family: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
}
</style>
