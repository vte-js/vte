<template>
  <div class="page-not-found">
    <div class="container">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-desc">你访问的页面不存在或已被移除</p>
      <router-link to="/" class="back-home">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        返回首页
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
}

.container {
  max-width: 500px;
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  background: linear-gradient(135deg, #42b883 0%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 24px;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 12px;
}

.error-desc {
  font-size: 16px;
  color: #94a3b8;
  margin-bottom: 32px;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(66, 184, 131, 0.15);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 8px;
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.back-home:hover {
  background: rgba(66, 184, 131, 0.25);
  transform: translateX(-4px);
}
</style>
