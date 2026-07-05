<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg viewBox="0 0 128 128" width="32" height="32">
              <path fill="#42b883" d="M12,10 L44,10 L64,72 L84,10 L116,10 L88,104 Q64,124 40,104 Z"/>
              <path fill="#35495e" d="M32,10 L52,10 L64,32 L76,10 L96,10 L80,76 Q64,84 48,76 L32,10 Z"/>
            </svg>
            <span class="footer-name">VTE</span>
          </div>
          <p class="footer-desc">Vue Token Engine - Design Tokens First</p>
        </div>

        <div class="footer-links">
          <div class="footer-group">
            <h4>资源</h4>
            <a href="https://github.com/vte-js/vte" target="_blank">GitHub</a>
            <a href="https://www.npmjs.com/package/@vte-js/core" target="_blank">npm</a>
            <a href="/playground">Playground</a>
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
        <p>ISC License</p>
        <p>Made with 💚 by VTE Team</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 60px 24px 32px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
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

.footer-desc {
  font-size: 14px;
  line-height: 1.6;
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
  font-size: 13px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
