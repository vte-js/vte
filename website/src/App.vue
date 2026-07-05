<template>
  <div class="app">
    <Hero />
    <Features />
    <QuickStart />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Hero from "./components/Hero.vue";
import Features from "./components/Features.vue";
import QuickStart from "./components/QuickStart.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --vte-primary: #42b883;
  --vte-dark: #35495e;
  --vte-bg: #ffffff;
  --vte-bg-secondary: #f8fafc;
  --vte-text: #1e293b;
  --vte-text-secondary: #64748b;
  --vte-border: #e2e8f0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--vte-bg);
  color: var(--vte-text);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}
</style>
