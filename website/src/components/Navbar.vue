<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <router-link to="/" class="nav-brand">
        <svg viewBox="0 0 128 128" width="28" height="28">
          <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
          <path :fill="isDark ? '#546e7a' : '#35495e'" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
        </svg>
        <span>VTE</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/features" class="nav-link">Features</router-link>
        <router-link to="/quickstart" class="nav-link">Quick Start</router-link>
        <router-link to="/packages" class="nav-link">Packages</router-link>
        <router-link to="/docs" class="nav-link">Docs</router-link>
      </div>

      <div class="nav-actions">
        <button class="theme-toggle" @click="$emit('toggle-theme')" :title="isDark ? 'Light mode' : 'Dark mode'">
          <svg v-if="isDark" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <a href="https://github.com/vte-js/vte" class="nav-github" target="_blank">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  isDark: boolean;
}>();

defineEmits<{
  toggleTheme: [];
}>();

const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 24px;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--vte-border);
  padding: 12px 24px;
}

.dark .navbar.scrolled {
  background: rgba(15, 23, 42, 0.8);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  color: var(--vte-text);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: var(--vte-text-secondary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--vte-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--vte-border);
  background: var(--vte-bg);
  color: var(--vte-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-toggle:hover {
  border-color: var(--vte-primary);
  background: rgba(66, 184, 131, 0.1);
}

.nav-github {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--vte-border);
  background: var(--vte-bg);
  color: var(--vte-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-github:hover {
  border-color: var(--vte-primary);
  background: rgba(66, 184, 131, 0.1);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
