# @vte/vite-plugin

Vue Token Engine 的 Vite 插件，支持在 Vue SFC 中使用 `<style token>` 语法。

## 安装

```bash
npm install @vte/vite-plugin
# 或
pnpm add @vte/vite-plugin
```

## 快速开始

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte(),
  ],
});
```

## SFC 语法

### `<style token>`

在 Vue SFC 中使用 `<style token>` 块编写 token-based 样式：

```vue
<template>
  <button class="btn">Click me</button>
</template>

<style token>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.medium;
}
</style>
```

编译后输出：

```css
.btn {
  background: var(--vte-semantic-color-primary);
  padding: var(--vte-semantic-spacing-medium);
}

:root {
  --vte-semantic-color-primary: #3b82f6;
  --vte-semantic-spacing-medium: 0.5rem;
}
```

### `<style token scoped>`

支持 Vue scoped styles：

```vue
<style token scoped>
.btn {
  background: $semantic.color.primary;
}
</style>
```

编译后输出：

```css
.btn[data-v-xxx] {
  background: var(--vte-semantic-color-primary);
}
```

### 带引号的 Token 路径

支持包含连字符的 token 路径：

```vue
<style token>
.btn:hover {
  background: $semantic.color."primary-hover";
}
</style>
```

编译后输出：

```css
.btn:hover {
  background: var(--vte-semantic-color-primary-hover);
}
```

## 配置选项

```typescript
vte({
  // token 文件路径（相对于项目根目录）
  tokenFile: "design-tokens.ts",

  // 目标平台: "web" | "mp" | "rn"
  platform: "web",

  // 构建时输出配置
  output: {
    types: true,      // 生成 tokens.d.ts（TypeScript 类型声明）
    css: true,        // 生成 tokens.css（CSS 变量定义）
    agentJson: true,  // 生成 tokens.agent.json（AI 可读格式）
    prefix: "tokens", // 输出文件名前缀（默认 "tokens"）
  },
})
```

### 输出配置详情

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `types` | `boolean` | `true` | 生成 `tokens.d.ts` TypeScript 类型声明 |
| `css` | `boolean` | `true` | 生成 `tokens.css` CSS 变量定义文件 |
| `agentJson` | `boolean` | `true` | 生成 `tokens.agent.json` AI 可读格式 |
| `prefix` | `string` | `"tokens"` | 输出文件名前缀 |

### 自定义前缀示例

```typescript
vte({
  output: {
    prefix: "design-tokens",
  },
})
// 生成: design-tokens.css, design-tokens.d.ts, design-tokens.agent.json
```

### 禁用特定输出

```typescript
vte({
  output: {
    types: false,    // 不生成 .d.ts
    css: false,      // 不生成 .css
    agentJson: true, // 只生成 .agent.json
  },
})
```

## 构建产物

构建后会在 `dist` 目录生成以下文件：

```
dist/
├── index.html          # HTML 入口
├── assets/
│   ├── index-*.css     # 编译后的 CSS（token 已替换）
│   └── index-*.js      # 编译后的 JS
├── tokens.css          # CSS 变量定义文件
├── tokens.d.ts         # TypeScript 类型声明
└── tokens.agent.json   # AI 可读的 token 信息
```

## 平台支持

### Web（默认）

输出 CSS Variables，通过 `:root` 注入：

```css
:root {
  --vte-semantic-color-primary: #3b82f6;
}
.btn {
  background: var(--vte-semantic-color-primary);
}
```

### 小程序 (mp)

直接内联值，不使用 CSS Variables：

```css
.btn {
  background: #3b82f6;
}
```

### React Native

输出 StyleSheet 格式：

```javascript
export const tokens = {
  semantic: {
    color: { primary: "#3b82f6" },
  },
};
```

## 错误提示

当使用不存在的 token 时，插件会输出警告并提供修复建议：

```
⚠ [VTE] Unknown token: "$semantic.colr.primary"
   Did you mean:
     - $semantic.color.primary
     - $semantic.color.text
```

## 热重载

修改 `design-tokens.ts` 文件后，插件会自动触发 full-reload。

## 验证 CSS 语法

由于 VTE 使用自定义的 `$token` 语法，VS Code 的 CSS 语言服务器会报告语法错误。建议在项目中添加 `.vscode/settings.json`：

```json
{
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false
}
```

## License

ISC
