# Vue Token Engine (VTE) 白皮书

> **Design Tokens First — 让样式回归确定性**

---

## 摘要

Vue Token Engine (VTE) 是一个面向 Vue 生态的样式解决方案，通过强制使用 Design Tokens 引用语法，从根本上解决了 AI 辅助开发中的样式幻觉问题、跨平台样式割裂问题，以及 Vue SFC 与现代样式方案的适配问题。

---

## 1. 背景与痛点

### 1.1 AI 辅助开发的困境

随着 AI 编程助手的普及，开发者越来越依赖 AI 生成代码。然而，在样式领域，AI 面临着严重的"幻觉"问题：

```typescript
// AI 生成的代码 - 常见错误
<div class="bg-blue-500">  // 实际不存在 bg-blue-500
<div class="text-primary"> // 拼写错误
<div class="p-4 m-2">      // 无法验证的原子类
```

Tailwind CSS 等原子化框架的字符串类名让 AI 无法验证其正确性，导致：
- AI 经常拼错类名（如 `bg-blue-500` vs `bg-blue-600`）
- AI 会凭空捏造不存在的类名
- 开发者需要花费大量时间调试样式问题

### 1.2 跨平台样式的割裂

现有样式方案难以同时支持多个平台：

| 平台 | 传统方案 | 问题 |
|------|---------|------|
| Web | CSS Variables | 良好 |
| 小程序 | rpx / WXSS | 需要单独编写 |
| React Native | StyleSheet | 完全不同的语法 |

开发者往往需要为每个平台维护三套样式代码，导致：
- 代码重复率高
- 样式不一致
- 维护成本巨大

### 1.3 Vue 生态的适配问题

StyleX 等现代样式方案偏向 React 的函数式思维，与 Vue SFC 的声明式模板不兼容：

```jsx
// StyleX (React 风格)
const styles = stylex.create({
  base: { color: 'red' }
});
```

```vue
<!-- Vue SFC 风格 -->
<style scoped>
.btn { color: red; }
</style>
```

两种范式的差异导致 Vue 开发者难以享受现代样式方案的红利。

---

## 2. VTE 的解决方案

### 2.1 核心理念：Design Tokens First

VTE 的核心哲学是 **Design Tokens First**：样式必须通过 `$token.path` 引用，禁止硬编码。

```typescript
// design-tokens.ts
export default defineTokens({
  primitive: {
    blue: { 500: "#3b82f6" },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}",  // 引用语法
    },
  },
});
```

```vue
<style token>
.btn {
  /* ✅ 正确：通过 token 引用 */
  background: $semantic.color.primary;
  
  /* ❌ 错误：禁止硬编码 */
  /* background: #3b82f6; */
}
</style>
```

### 2.2 解决 AI 幻觉问题

通过强制使用 `$token.path` 语法，VTE 实现了：

1. **编译期验证**：无效的 token 路径会立即报错
2. **IDE 自动补全**：输入 `$` 时显示所有可用 token
3. **拼写检查**：AI 生成错误拼写时，系统会建议正确的 token

```
⚠ [VTE] Unknown token: "$semantic.colr.primary"
   Did you mean:
     - $semantic.color.primary
     - $semantic.color.text
```

### 2.3 解决跨平台问题

VTE 的 Token 定义是一套，输出可以是多端：

```typescript
// 一套 Token 定义
defineTokens({
  semantic: {
    color: { primary: "#3b82f6" },
    spacing: { medium: "0.5rem" },
  },
});
```

```css
/* Web 输出 */
:root {
  --vte-semantic-color-primary: #3b82f6;
  --vte-semantic-spacing-medium: 0.5rem;
}

/* 小程序输出 (rpx) */
/* #3b82f6 */
/* 16rpx */

/* React Native 输出 */
export const tokens = {
  semantic: {
    color: { primary: "#3b82f6" },
    spacing: { medium: "0.5rem" },
  },
};
```

### 2.4 解决 Vue 适配问题

VTE 扩展了 Vue SFC 语法，提供直观的 `<style token>` 块：

```vue
<style token>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.medium;
  border-radius: $semantic.borderRadius.md;
}
</style>
```

编译后输出标准的 CSS Variables，兼容所有浏览器。

---

## 3. 架构设计

### 3.1 Token 三层结构

```
Primitive (原始值)
  └── blue: { 500: "#3b82f6" }
  
Semantic (语义映射)
  └── color: { primary: "{primitive.blue.500}" }
  
Component (组件级)
  └── button: { height: "{semantic.spacing.medium}" }
```

### 3.2 编译流水线

```
design-tokens.ts
       ↓
   [Parse] ──→ TokenMap
       ↓
   [Transform] ──→ 替换 $token.path
       ↓
   [Codegen] ──→ Web / mp / rn 输出
```

### 3.3 工具链

| 工具 | 用途 |
|------|------|
| `@vte/core` | Token 解析、类型定义 |
| `@vte/vite-plugin` | Vite 插件，编译时转换 |
| `@vte/cli` | 命令行工具 |
| `@vte/compiler` | 生成 agent.json、tokens.d.ts |
| `@vte/react` | React 绑定 |
| `@vte/playground` | 可视化调试 |
| `vte-vscode` | VS Code 扩展 |

---

## 4. 使用场景

### 4.1 新项目启动

```bash
# 1. 安装 VTE
pnpm add @vte/core @vte/vite-plugin

# 2. 定义 Token
# design-tokens.ts
export default defineTokens({
  semantic: {
    color: { primary: "#3b82f6" },
  },
});

# 3. 配置 Vite
// vite.config.ts
import vte from "@vte/vite-plugin";
export default defineConfig({
  plugins: [vte()],
});

# 4. 开始使用
// <style token>
// .btn { background: $semantic.color.primary; }
```

### 4.2 AI 辅助开发

```vue
<!-- AI 生成代码时，VTE 会自动验证 -->
<style token>
.btn {
  /* AI 会自动使用正确的 token */
  background: $semantic.color.primary;
  padding: $semantic.spacing.medium;
}
</style>
```

### 4.3 跨平台开发

```typescript
// 一套 Token，多端输出
const tokens = defineTokens({
  semantic: {
    color: { primary: "#3b82f6" },
  },
});

// Web: CSS Variables
// 小程序: rpx
// React Native: StyleSheet
```

---

## 5. 技术优势

### 5.1 类型安全

```typescript
type TokenPath = "semantic.color.primary" | "semantic.spacing.medium" | ...;

// 编译期验证
const path: TokenPath = "$semantic.color.primary"; // ✅
const bad: TokenPath = "$semantic.nonexistent";    // ❌ 编译错误
```

### 5.2 零运行时开销

VTE 在编译时完成所有转换，运行时没有任何额外开销：

```css
/* 编译前 */
.btn { background: $semantic.color.primary; }

/* 编译后 - 纯 CSS Variables */
.btn { background: var(--vte-semantic-color-primary); }
```

### 5.3 渐进式采用

VTE 可以与现有样式方案共存，支持渐进式迁移：

```vue
<style>
/* 传统 CSS - 仍然有效 */
.old-btn { color: red; }
</style>

<style token>
/* VTE Token 样式 */
.new-btn { color: $semantic.color.primary; }
</style>
```

---

## 6. 生态系统

### 6.1 IDE 支持

| IDE | 状态 | 功能 |
|-----|------|------|
| VS Code | ✅ 已发布 | 语法高亮、自动补全、跳转定义、快速修复 |
| JetBrains | 📋 计划中 | 基于 Language Server Protocol |
| Vim/Neovim | 📋 计划中 | LSP 集成 |

### 6.2 框架支持

| 框架 | 状态 | 说明 |
|------|------|------|
| Vue 3 | ✅ 完全支持 | `<style token>` 语法 |
| React | ✅ 完全支持 | TokenProvider + hooks |
| Nuxt | 📋 计划中 | 自动集成 |
| Next.js | 📋 计划中 | 适配中 |

### 6.3 平台支持

| 平台 | 状态 | 输出格式 |
|------|------|---------|
| Web | ✅ 完全支持 | CSS Variables |
| 小程序 | ✅ 完全支持 | rpx / WXSS |
| React Native | ✅ 完全支持 | StyleSheet |
| Flutter | 📋 计划中 | ThemeData |
| SwiftUI | 📋 计划中 | Color/Font |

---

## 7. 路线图

### 短期（1-2 周）

- [ ] VS Code 扩展发布到 Marketplace
- [ ] JetBrains 插件开发
- [ ] Playground 功能增强

### 中期（1-2 月）

- [ ] Tailwind CSS 集成
- [ ] UnoCSS 集成
- [ ] AI 辅助 token 设计
- [ ] 完整的项目模板

### 长期（3-6 月）

- [ ] 组件库集成（Ant Design Vue、Element Plus）
- [ ] 设计工具集成（Figma、Sketch）
- [ ] 企业级功能（版本管理、变更追踪）

---

## 8. 结语

Vue Token Engine 不仅仅是一个样式工具，它代表了一种新的开发范式：**让样式回归确定性**。

在 AI 辅助开发日益普及的今天，我们需要一种能够与 AI 协作的样式方案。VTE 通过强制使用 Design Tokens 引用语法，让 AI 能够正确理解和生成样式代码，同时保持了开发者的灵活性和跨平台的能力。

我们相信，VTE 将成为 Vue 生态中样式开发的标准方案，让每一位开发者都能享受到确定性带来的开发体验提升。

---

**Vue Token Engine** - Design Tokens First

*让样式回归确定性*

