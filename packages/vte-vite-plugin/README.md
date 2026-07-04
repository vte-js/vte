# @vte/vite-plugin

Vue Token Engine 的 Vite 插件，支持在 Vue SFC 中使用 `<style token>` 语法。

## 安装

```bash
npm install @vte/vite-plugin
# 或
pnpm add @vte/vite-plugin
```

## 使用

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte({
      // 可选配置
      tokenFile: "design-tokens.ts",  // token 文件路径
      platform: "web",                // 目标平台: web | mp | rn
    }),
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

## 配置

```typescript
vte({
  // token 文件路径（相对于项目根目录）
  tokenFile: "design-tokens.ts",

  // 目标平台
  // - "web": 输出 CSS Variables（默认）
  // - "mp": 直接内联值（小程序）
  // - "rn": 输出 StyleSheet 格式（React Native）
  platform: "web",
})
```

## 平台支持

### Web

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

## License

ISC
