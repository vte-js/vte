<template>
  <div class="app" :class="{ dark: isDark }">
    <MouseGlow />
    <ScanLines />
    <FloatingOrbs />
    <Navbar :is-dark="isDark" :menu-open="menuOpen" @toggle-theme="isDark = !isDark" @toggle-menu="menuOpen = !menuOpen" />
    <router-view />
    <Footer />

    <!-- Mobile drawer rendered outside navbar to avoid transition context -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <div class="mobile-overlay" @click="menuOpen = false"></div>
      <div class="mobile-drawer">
        <router-link to="/features" class="mobile-link" @click="menuOpen = false">Features</router-link>
        <router-link to="/quickstart" class="mobile-link" @click="menuOpen = false">Quick Start</router-link>
        <router-link to="/packages" class="mobile-link" @click="menuOpen = false">Packages</router-link>
        <router-link to="/docs" class="mobile-link" @click="menuOpen = false">Docs</router-link>
        <router-link to="/configurator" class="mobile-link" @click="menuOpen = false">Configurator</router-link>
        <div class="mobile-actions">
          <button class="mobile-action-btn" @click="isDark = !isDark; menuOpen = false">
            {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </button>
          <a href="https://github.com/vte-js/vte" class="mobile-action-btn" target="_blank" @click="menuOpen = false">
            GitHub
          </a>
        </div>
      </div>
    </div>
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
const menuOpen = ref(false);

watch(isDark, (val) => {
  document.documentElement.classList.toggle("dark", val);
}, { immediate: true });

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
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
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--vte-bg);
  color: var(--vte-text);
  line-height: 1.6;
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

/* Mobile menu */
.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .mobile-menu.open {
    pointer-events: auto;
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .mobile-menu.open .mobile-overlay {
    opacity: 1;
  }

  .mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: var(--vte-bg);
    border-left: 1px solid var(--vte-border);
    padding: 80px 24px 24px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    z-index: 10000;
  }

  .mobile-menu.open .mobile-drawer {
    transform: translateX(0);
  }

  .mobile-link {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    color: var(--vte-text-secondary);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s;
    min-height: 44px;
  }

  .mobile-link:hover,
  .mobile-link.router-link-active {
    background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
    color: var(--vte-primary);
  }

  .mobile-actions {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--vte-border);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-action-btn {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    color: var(--vte-text-secondary);
    text-decoration: none;
    font-size: 15px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    border-radius: 8px;
    transition: all 0.2s;
    min-height: 44px;
  }

  .mobile-action-btn:hover {
    background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
    color: var(--vte-text);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: clamp(28px, 8vw, 40px) !important;
  }

  .page-desc {
    font-size: 16px !important;
  }

  .page-header {
    padding: 60px 20px 40px !important;
  }

  .container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

}
</style>
