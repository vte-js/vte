<template>
  <footer class="footer">
    <div class="footer-border"></div>
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg viewBox="0 0 128 128" width="32" height="32">
              <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
              <path fill="#546e7a" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
            </svg>
            <span class="footer-name">Vue Token Engine</span>
          </div>
          <p class="footer-desc">Design Tokens First — 让样式必须通过 token 引用，编译期拦截错误，天然支持多端转换。</p>
          <div class="footer-badges">
            <a href="https://github.com/vte-js/vte" target="_blank" class="badge">
              <img src="https://img.shields.io/badge/license-ISC-green" alt="License">
            </a>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank" class="badge">
              <img src="https://img.shields.io/npm/v/@vte-js/core" alt="npm">
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-group">
            <h4>产品</h4>
            <a href="#features">Features</a>
            <a href="#quickstart">Quick Start</a>
            <a href="#packages">Packages</a>
            <a href="/playground">Playground</a>
          </div>
          <div class="footer-group">
            <h4>资源</h4>
            <a href="https://github.com/vte-js/vte" target="_blank">GitHub</a>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank">npm</a>
            <a href="https://github.com/vte-js/vte/issues" target="_blank">Issues</a>
          </div>
          <div class="footer-group">
            <h4>包</h4>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank">@vte-js/core</a>
            <a href="https://www.npmjs.com/package/@vte-js/vite-plugin" target="_blank">@vte-js/vite-plugin</a>
            <a href="https://www.npmjs.com/package/@vte-js/cli" target="_blank">@vte-js/cli</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} VTE Team</p>
        <p>ISC License · Made with 💚</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: #0f172a;
  padding: 80px 24px 32px;
  position: relative;
}

.footer-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 64px;
  margin-bottom: 60px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-name {
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
}

.footer-desc {
  font-size: 14px;
  line-height: 1.7;
  color: #94a3b8;
  max-width: 320px;
  margin-bottom: 20px;
}

.footer-badges {
  display: flex;
  gap: 8px;
}

.badge img {
  height: 20px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-group h4 {
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-group a {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.footer-group a:hover {
  color: #42b883;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #64748b;
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
