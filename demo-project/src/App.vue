<template>
  <div class="app">
    <header class="header">
      <h1 class="title">VTE Demo Project</h1>
      <p class="subtitle">Vue Token Engine 完整功能演示</p>
    </header>

    <main class="main">
      <!-- 按钮组件 -->
      <section class="section">
        <h2 class="section-title">Buttons</h2>
        <div class="button-group">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-error">Error</button>
        </div>
        <div class="button-group">
          <button class="btn btn-outline">Outline</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-disabled" disabled>Disabled</button>
        </div>
      </section>

      <!-- 表单组件 -->
      <section class="section">
        <h2 class="section-title">Form Elements</h2>
        <div class="form-group">
          <label class="label">Email</label>
          <input type="email" class="input" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label class="label">Password</label>
          <input type="password" class="input input-error" placeholder="Enter your password" />
          <span class="error-text">Password is required</span>
        </div>
        <div class="form-group">
          <label class="label">Message</label>
          <textarea class="textarea" placeholder="Enter your message"></textarea>
        </div>
      </section>

      <!-- 卡片组件 -->
      <section class="section">
        <h2 class="section-title">Cards</h2>
        <div class="card-grid">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Card Title</h3>
            </div>
            <div class="card-body">
              <p class="card-text">This is a card component with token-based styling.</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-sm">Action</button>
            </div>
          </div>

          <div class="card card-bordered">
            <div class="card-header">
              <h3 class="card-title">Bordered Card</h3>
            </div>
            <div class="card-body">
              <p class="card-text">This card has a border.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 状态提示 -->
      <section class="section">
        <h2 class="section-title">Alerts</h2>
        <div class="alert alert-success">
          <span class="alert-icon">✓</span>
          <span>Success! Your changes have been saved.</span>
        </div>
        <div class="alert alert-warning">
          <span class="alert-icon">⚠</span>
          <span>Warning! Please review your changes.</span>
        </div>
        <div class="alert alert-error">
          <span class="alert-icon">✕</span>
          <span>Error! Something went wrong.</span>
        </div>
        <div class="alert alert-info">
          <span class="alert-icon">ℹ</span>
          <span>Info: This is an informational message.</span>
        </div>
      </section>

      <!-- 颜色展示 -->
      <section class="section">
        <h2 class="section-title">Colors</h2>
        <div class="color-grid">
          <div class="color-swatch" style="background: #3b82f6;">Primary</div>
          <div class="color-swatch" style="background: #6b7280;">Secondary</div>
          <div class="color-swatch" style="background: #22c55e;">Success</div>
          <div class="color-swatch" style="background: #eab308;">Warning</div>
          <div class="color-swatch" style="background: #ef4444;">Error</div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p class="footer-text">Built with Vue Token Engine</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style token>
/* 应用容器 */
.app {
  min-height: 100vh;
  background: $semantic.color.background;
  color: $semantic.color.text;
}

/* 头部 */
.header {
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
  padding: $semantic.spacing.xl;
  text-align: center;
}

.title {
  font-size: $semantic.fontSize."3xl";
  font-weight: $semantic.fontWeight.bold;
  margin-bottom: $semantic.spacing.sm;
}

.subtitle {
  font-size: $semantic.fontSize.lg;
  opacity: 0.9;
}

/* 主内容 */
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: $semantic.spacing.xl;
}

/* 区块 */
.section {
  margin-bottom: $semantic.spacing.xl;
}

.section-title {
  font-size: $semantic.fontSize.xl;
  font-weight: $semantic.fontWeight.semibold;
  margin-bottom: $semantic.spacing.md;
  color: $semantic.color.text;
}

/* 按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  font-size: $semantic.fontSize.base;
  font-weight: $semantic.fontWeight.medium;
  border-radius: $semantic.borderRadius.md;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background: $semantic.color.primary;
  color: $semantic.color.text-inverse;
}

.btn-primary:hover {
  background: $semantic.color."primary-hover";
}

.btn-secondary {
  background: $semantic.color.secondary;
  color: $semantic.color.text-inverse;
}

.btn-success {
  background: $semantic.color.success;
  color: $semantic.color.text-inverse;
}

.btn-warning {
  background: $semantic.color.warning;
  color: $semantic.color.text;
}

.btn-error {
  background: $semantic.color.error;
  color: $semantic.color.text-inverse;
}

.btn-outline {
  background: transparent;
  border-color: $semantic.color.border;
  color: $semantic.color.text;
}

.btn-ghost {
  background: transparent;
  color: $semantic.color.primary;
}

.btn-ghost:hover {
  background: $semantic.color."background-secondary";
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sm {
  padding: $semantic.spacing.xs $semantic.spacing.sm;
  font-size: $semantic.fontSize.sm;
}

.button-group {
  display: flex;
  gap: $semantic.spacing.sm;
  margin-bottom: $semantic.spacing.md;
  flex-wrap: wrap;
}

/* 表单 */
.form-group {
  margin-bottom: $semantic.spacing.md;
}

.label {
  display: block;
  font-size: $semantic.fontSize.sm;
  font-weight: $semantic.fontWeight.medium;
  margin-bottom: $semantic.spacing.xs;
  color: $semantic.color.text;
}

.input,
.textarea {
  width: 100%;
  padding: $semantic.spacing.sm $semantic.spacing.md;
  font-size: $semantic.fontSize.base;
  border: 1px solid $semantic.color.border;
  border-radius: $semantic.borderRadius.md;
  transition: border-color 0.2s;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: $semantic.color."border-focus";
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: $semantic.color.error;
}

.error-text {
  font-size: $semantic.fontSize.sm;
  color: $semantic.color.error;
  margin-top: $semantic.spacing.xs;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

/* 卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $semantic.spacing.md;
}

.card {
  background: $semantic.color.background;
  border-radius: $semantic.borderRadius.lg;
  box-shadow: $semantic.shadow.md;
  overflow: hidden;
}

.card-bordered {
  border: 1px solid $semantic.color.border;
}

.card-header {
  padding: $semantic.spacing.md;
  border-bottom: 1px solid $semantic.color.border;
}

.card-title {
  font-size: $semantic.fontSize.lg;
  font-weight: $semantic.fontWeight.semibold;
}

.card-body {
  padding: $semantic.spacing.md;
}

.card-text {
  color: $semantic.color."text-secondary";
}

.card-footer {
  padding: $semantic.spacing.md;
  border-top: 1px solid $semantic.color.border;
  background: $semantic.color."background-secondary";
}

/* 警告提示 */
.alert {
  display: flex;
  align-items: center;
  gap: $semantic.spacing.sm;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
  margin-bottom: $semantic.spacing.sm;
}

.alert-icon {
  font-size: $semantic.fontSize.lg;
}

.alert-success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.alert-warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.alert-info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

/* 颜色展示 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: $semantic.spacing.md;
}

.color-swatch {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: $semantic.fontWeight.medium;
  border-radius: $semantic.borderRadius.md;
  box-shadow: $semantic.shadow.sm;
}

/* 页脚 */
.footer {
  background: $semantic.color."background-secondary";
  padding: $semantic.spacing.xl;
  text-align: center;
  border-top: 1px solid $semantic.color.border;
}

.footer-text {
  color: $semantic.color."text-secondary";
}
</style>
