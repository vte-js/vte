# Vue Token Engine (VTE)

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

> **Design Tokens First** — 样式必须通过 `$token.path` 引用，禁止硬编码，在编译期拦截错误，天然支持多端转换。

## 项目地址

```
git@github.com:vte-js/vte.git
```

## 为什么选择 VTE？

| 痛点 | 传统方案 | VTE 方案 |
|------|---------|----------|
| **AI 幻觉** | Tailwind 字符串类名导致 AI 拼错 | `$token.path` 强制引用，编译期拦截 |
| **跨端割裂** | 不同平台需要不同样式方案 | 一套 token 定义，多端输出 |
| **Vue 生态** | StyleX 偏向 React | `<style token>` 符合 Vue SFC 直觉 |

## 核心特性

- **Token 三层结构**：Primitive → Semantic → Component
- **引用语法**：`{primitive.blue.500}` 支持链式引用
- **编译期检查**：无效 token 立即报错
- **多端输出**：Web (CSS Variables)、小程序 (rpx)、React Native (StyleSheet)
- **IDE 支持**：语法高亮、自动补全、跳转定义、快速修复

## 包结构

```
vte/
├── packages/
│   ├── @vte/core              核心解析器
│   ├── @vte/vite-plugin       Vite 插件
│   ├── @vte/cli               命令行工具
│   ├── @vte/compiler          编译器
│   ├── @vte/react             React 绑定
│   ├── @vte/playground        可视化调试工具
│   ├── @vte/language-server   IDE 无关的语言服务器
│   └── vte-vscode             VS Code 扩展
├── playground/                开发测试
└── demo-project/              完整示例
```

| 包名 | 说明 | 文档 |
|------|------|------|
| `@vte/core` | Token 解析、类型定义、工具函数 | [README](packages/vte-core/README.md) |
| `@vte/vite-plugin` | Vite 插件，`<style token>` 语法支持 | [README](packages/vte-vite-plugin/README.md) |
| `@vte/playground` | 可视化调试工具，自动生成 playground | [README](packages/vte-playground/README.md) |
| `@vte/cli` | 命令行工具，validate/extract/generate | [README](packages/vte-cli/README.md) |
| `@vte/compiler` | 生成 agent.json 和 tokens.d.ts | [README](packages/vte-compiler/README.md) |
| `@vte/react` | React hooks 和 Provider | [README](packages/vte-react/README.md) |
| `@vte/language-server` | IDE 无关的语言服务器核心 | [README](packages/vte-language-server/README.md) |
| `vte-vscode` | VS Code 扩展 | [README](packages/vte-vscode/README.md) |

## 快速开始

### 安装

```bash
git clone git@github.com:vte-js/vte.git
cd vte
pnpm install
```

### 1. 定义 Tokens

```typescript
// design-tokens.ts
import { defineTokens } from "@vte/core";

export default defineTokens({
  primitive: {
    blue: { 500: "#3b82f6" },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
    },
    spacing: {
      small: "0.25rem",
      medium: "0.5rem",
    },
  },
});
```

### 2. Vue SFC 使用

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

### 3. React 使用

```tsx
import { TokenProvider, useTokenValue } from "@vte/react";

function App() {
  return (
    <TokenProvider tokenMap={tokenMap}>
      <Button />
    </TokenProvider>
  );
}

function Button() {
  const color = useTokenValue("semantic.color.primary");
  return <button style={{ background: color }}>Click me</button>;
}
```

## 命令行工具

```bash
# 验证 token 定义
vte validate design-tokens.ts

# 提取 token 路径
vte extract design-tokens.ts

# 生成平台代码
vte generate design-tokens.ts --platform web
vte generate design-tokens.ts --platform mp
vte generate design-tokens.ts --platform rn
```

## VS Code 扩展

### 安装

```bash
cd packages/vte-vscode
npm install && npm run build
```

然后在 VS Code 中按 F5 启动调试。

### 功能

| 类别 | 功能 |
|------|------|
| **核心** | 语法高亮、悬停预览、自动补全、跳转定义 |
| **智能** | 诊断警告、快速修复、重命名、Code Lens |
| **视觉** | 内联色块、内联值显示、颜色标尺 |
| **文档** | 大纲视图、class 样式预览、class 跳转 |

### 快捷键

| 操作 | 快捷键 |
|------|--------|
| 自动补全 | 输入 `$` |
| 悬停预览 | 鼠标悬停 |
| 跳转定义 | Ctrl/Cmd + 点击 |
| 重命名 | F2 |
| 快速修复 | Ctrl/Cmd + . |
| 大纲视图 | Ctrl/Cmd + Shift + O |

## VTE Language Server

IDE 无关的语言服务器核心，支持多种 IDE 接入。

```typescript
import { TokenManager, TokenHoverProvider } from "@vte/language-server";

const manager = new TokenManager({ tokenFile: "design-tokens.ts" });
const hover = new TokenHoverProvider(manager);

const result = hover.provideHover(document, position);
```

### 支持的 IDE

| IDE | 状态 | 包名 |
|-----|------|------|
| VS Code | ✅ 已实现 | `vte-vscode` |
| JetBrains | 📋 计划中 | `@vte/jetbrains` |
| Vim/Neovim | 📋 计划中 | `@vte/vim` |
| Emacs | 📋 计划中 | `@vte/emacs` |

## 平台支持

| 平台 | 输出格式 | 示例 |
|------|---------|------|
| Web | CSS Variables | `var(--vte-semantic-color-primary)` |
| 小程序 (mp) | 直接内联值 | `#3b82f6` 或 `16rpx` |
| React Native | StyleSheet 对象 | `{ color: "#3b82f6" }` |

## 项目结构

```
vte/
├── packages/
│   ├── vte-core/              # 核心解析器
│   │   ├── src/
│   │   │   ├── parser.ts      # Token 解析
│   │   │   ├── types.ts       # 类型定义
│   │   │   └── index.ts       # 导出
│   │   └── dist/
│   ├── vte-vite-plugin/       # Vite 插件
│   │   ├── src/
│   │   │   ├── index.ts       # 插件入口
│   │   │   └── codegen/       # 平台代码生成
│   │   └── dist/
│   ├── vte-cli/               # CLI 工具
│   │   └── src/
│   │       ├── cli.ts         # 入口
│   │       └── commands/      # 命令实现
│   ├── vte-compiler/          # 编译器
│   │   └── src/
│   │       ├── index.ts       # compile 函数
│   │       ├── agent.ts       # agent.json 生成
│   │       └── dts.ts         # tokens.d.ts 生成
│   ├── vte-react/             # React 绑定
│   │   └── src/
│   │       ├── index.ts       # 导出
│   │       ├── TokenProvider.tsx
│   │       └── hooks.ts       # useToken/useTokenValue
│   ├── vte-language-server/   # 语言服务器
│   │   └── src/
│   │       ├── token-manager.ts
│   │       ├── providers/     # 各种提供器
│   │       └── utils/         # 工具函数
│   └── vte-vscode/            # VS Code 扩展
│       └── src/
│           └── extension.ts   # 扩展入口
├── playground/                # 开发测试
├── demo-project/              # 完整示例
├── introduce.md               # 项目上下文档案
└── README.md                  # 本文件
```

## 开发

```bash
# 构建所有包
pnpm build

# 运行测试
pnpm test

# 启动 playground
pnpm dev

# 构建 VS Code 扩展
cd packages/vte-vscode && npm run build
```

## 测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch
```

## 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

ISC License

## 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
