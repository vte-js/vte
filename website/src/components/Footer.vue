<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg viewBox="0 0 128 128" width="36" height="36">
              <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
              <path fill="#546e7a" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
            </svg>
            <div>
              <span class="footer-name">VTE</span>
              <span class="footer-full">Vue Token Engine</span>
            </div>
          </div>
          <p class="footer-desc">Design Tokens First — 让样式必须通过 token 引用，编译期拦截错误，天然支持多端转换。</p>
          <div class="footer-badges">
            <a href="https://github.com/vte-js/vte/actions" target="_blank" class="badge">
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
            <a href="#quickstart">快速开始</a>
            <a href="/playground">Playground</a>
            <a href="https://github.com/vte-js/vte" target="_blank">GitHub</a>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank">npm</a>
          </div>
          <div class="footer-group">
            <h4>包</h4>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank">@vte-js/core</a>
            <a href="https://www.npmjs.com/package/@vte-js/vite-plugin" target="_blank">@vte-js/vite-plugin</a>
            <a href="https://www.npmjs.com/package/@vte-js/cli" target="_blank">@vte-js/cli</a>
            <a href="https://www.npmjs.com/package/@vte-js/compiler" target="_blank">@vte-js/compiler</a>
          </div>
          <div class="footer-group">
            <h4>社区</h4>
            <a href="https://github.com/vte-js/vte/issues" target="_blank">Issue Tracker</a>
            <a href="https://github.com/vte-js/vte/pulls" target="_blank">Pull Requests</a>
            <a href="https://github.com/vte-js/vte/discussions" target="_blank">Discussions</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© {{ currentYear }} VTE Team. ISC License.</p>
        <p class="footer-credit">Made with 💚 by <a href="https://github.com/vte-js" target="_blank">VTE Team</a></p>
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
  color: #94a3b8;
  padding: 80px 24px 32px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 64px;
  margin-bottom: 48px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.footer-full {
  display: block;
  font-size: 12px;
  color: #64748b;
}

.footer-desc {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #94a3b8;
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
  gap: 32px;
}

.footer-group h4 {
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-group a {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
  transition: color 0.2s ease;
}

.footer-group a:hover {
  color: #42b883;
}

.footer-bottom {
  border-top: 1px solid #1e293b;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.footer-credit a {
  color: #42b883;
  text-decoration: none;
}

.footer-credit a:hover {
  text-decoration: underline;
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
