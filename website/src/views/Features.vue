<template>
  <div class="page-features">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">Features</span>
        <h1 class="page-title">为什么选择 VTE？</h1>
        <p class="page-desc">解决现代前端样式方案的三大核心痛点</p>
      </div>
    </div>

    <section class="features-section">
      <div class="container">
        <!-- AI 友好 -->
        <div class="feature-block">
          <div class="feature-visual">
            <div class="code-compare">
              <CodeBlock label="传统方案 - Tailwind CSS" :code="tailwindBadExample" language="html" />
              <CodeBlock label="VTE 方案 - Design Tokens" :code="vteGoodExample" language="html" />
            </div>
          </div>
          <div class="feature-text">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h2>告别 AI 幻觉</h2>
            <p>
              Tailwind 的字符串类名（如 <code>bg-blue-500</code>）导致 AI 常拼错或凭空捏造不存在的颜色值。
              VTE 的 <code>$token.path</code> 强制引用设计 token，在编译期拦截错误，并提供智能拼写建议。
            </p>
            <ul class="feature-list">
              <li>编译期类型检查，无效路径立即报错</li>
              <li>支持拼写建议和自动修复</li>
              <li>IDE 智能补全所有合法路径</li>
              <li>AI 只需记住 token 结构，无需记忆具体值</li>
            </ul>
          </div>
        </div>

        <!-- 跨端支持 -->
        <div class="feature-block reverse">
          <div class="feature-visual">
            <div class="platform-demo">
              <div class="platform-card">
                <div class="platform-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div class="platform-name">Web</div>
                <div class="platform-code">var(--vte-semantic-color-primary)</div>
              </div>
              <div class="platform-card">
                <div class="platform-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <div class="platform-name">小程序</div>
                <div class="platform-code">#3b82f6</div>
              </div>
              <div class="platform-card">
                <div class="platform-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l4-4 4 4"/><path d="M12 16V8"/></svg>
                </div>
                <div class="platform-name">React Native</div>
                <div class="platform-code">"#3b82f6"</div>
              </div>
            </div>
            <div class="platform-source">
              <CodeBlock label="design-tokens.ts" :code="platformExample" language="typescript" />
            </div>
          </div>
          <div class="feature-text">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h2>真正的跨端</h2>
            <p>
              一套 token 定义，自动输出 Web (CSS Variables)、小程序 (rpx)、React Native (StyleSheet)。
              无需为每个平台重写样式，统一的设计系统。
            </p>
            <ul class="feature-list">
              <li>Web: CSS Variables，支持主题切换</li>
              <li>小程序: 自动转换单位 (rem → rpx)</li>
              <li>React Native: StyleSheet 对象</li>
              <li>未来扩展: Flutter, SwiftUI</li>
            </ul>
          </div>
        </div>

        <!-- Vue 原生 -->
        <div class="feature-block">
          <div class="feature-visual">
            <CodeBlock label="Button.vue" :code="vueExample" language="css" />
          </div>
          <div class="feature-text">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h2>Vue 原生体验</h2>
            <p>
              <code>&lt;style token&gt;</code> 语法完全符合 Vue SFC 直觉，
              支持 <code>scoped</code> 作用域隔离，不需要学习新的心智模型。
            </p>
            <ul class="feature-list">
              <li>符合 Vue SFC 直觉的语法设计</li>
              <li>支持 scoped 作用域隔离</li>
              <li>自动注入 CSS 变量到 :root</li>
              <li>与 Vue 3 Composition API 完美配合</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "../components/CodeBlock.vue";

const tailwindBadExample = `// AI 容易拼错或捏造
<button class="bg-blue-500">
  Click me
</button>

// ❌ AI 可能生成不存在的类名
class="px-999"
class="text-red-999"`;

const vteGoodExample = `// 强制引用，编译期检查
<button class="btn">
  Click me
</button>

// ✅ 无效路径立即报错
// ✅ 支持拼写建议
// ✅ IDE 自动补全`;

const platformExample = `export default defineTokens({
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
    },
  },
});`;

const vueExample = `<template>
  <button class="btn">
    Click me
  </button>
</template>

<style token scoped>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
}
</style>`;
</script>

<style scoped>
.page-features {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
  margin: 0 auto 24px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  color: #42b883;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.page-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: #94a3b8;
}

.features-section {
  padding: 80px 24px;
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 120px;
}

.feature-block.reverse {
  direction: rtl;
}

.feature-block.reverse > * {
  direction: ltr;
}

.feature-text {
  max-width: 480px;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-text h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
}

.feature-text p {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 24px;
}

.feature-text code {
  background: rgba(66, 184, 131, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: #42b883;
  font-size: 14px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  font-size: 15px;
  color: #94a3b8;
}

.feature-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #42b883;
  font-weight: bold;
}

.code-compare {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.code-card {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(66, 184, 131, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-badge.error {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.card-badge.success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.card-badge.source {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.card-title {
  font-size: 13px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
}

.code-card pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-card code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e2e8f0;
}

.hl-comment { color: #64748b; }
.hl-error { color: #f87171; text-decoration: line-through; }
.hl-str { color: #86efac; }
.hl-tag { color: #7dd3fc; }
.hl-attr { color: #c4b5fd; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }

.platform-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.platform-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 10px;
}

.platform-icon {
  font-size: 24px;
}

.platform-name {
  font-weight: 600;
  color: #f1f5f9;
  min-width: 100px;
}

.platform-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .feature-block {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .feature-block.reverse {
    direction: ltr;
  }
}
</style>
