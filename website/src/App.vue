<template>
  <div class="app" :class="{ dark: isDark }">
    <Navbar :is-dark="isDark" @toggle-theme="isDark = !isDark" />
    <Hero />
    <Features />
    <CodeDemo />
    <QuickStart />
    <Packages />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Features from "./components/Features.vue";
import CodeDemo from "./components/CodeDemo.vue";
import QuickStart from "./components/QuickStart.vue";
import Packages from "./components/Packages.vue";
import Footer from "./components/Footer.vue";

const isDark = ref(false);

onMounted(() => {
  isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --vte-primary: #42b883;
  --vte-primary-light: #6dd5a0;
  --vte-dark: #35495e;
  --vte-bg: #ffffff;
  --vte-bg-alt: #f8fafc;
  --vte-bg-code: #0f172a;
  --vte-text: #0f172a;
  --vte-text-secondary: #64748b;
  --vte-border: #e2e8f0;
  --vte-gradient: linear-gradient(135deg, #42b883 0%, #35495e 100%);
}

.dark {
  --vte-bg: #0f172a;
  --vte-bg-alt: #1e293b;
  --vte-bg-code: #020617;
  --vte-text: #f1f5f9;
  --vte-text-secondary: #94a3b8;
  --vte-border: #334155;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--vte-bg);
  color: var(--vte-text);
  line-height: 1.6;
  transition: background 0.3s, color 0.3s;
}

.app {
  min-height: 100vh;
}

::selection {
  background: rgba(66, 184, 131, 0.3);
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
  background: var(--vte-text-secondary);
}
</style>
