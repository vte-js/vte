# 项目上下文档案：Vue Token Engine (VTE)

> **目的**：本文件用于向接续开发的 AI Agent（如 Cursor、Claude Code、ChatGPT）快速同步项目背景、现状及下一步任务

> **版本**：Day 11 - Documentation Complete

> **日期**：2026-07-04

> **项目地址**：git@github.com:vte-js/vte.git

---

## 1. 项目愿景 (The Vision)

我们正在构建一个名为 **Vue Token Engine (VTE)** 的样式方案，旨在解决现有方案的三大痛点：

1.  **AI 幻觉问题**：Tailwind 的字符串类名（如 `bg-blue-500`）导致 AI 常拼错或凭空捏造颜色（紫色问题）。
2.  **跨端割裂**：现有方案难以优雅地适配 Web、小程序（rpx）和 React Native。
3.  **Vue 生态适配**：StyleX 偏向 React 的函数式思维，且原子化类名可读性差，不符合 Vue SFC 的直观性。

**核心哲学**：**Design Tokens First**。样式必须通过 `$token.path` 引用，禁止硬编码，从而在编译期拦截错误，并天然支持多端转换。

---

## 2. 核心架构设计
### 2.1 Token 定义 (`design-tokens.ts`)
使用 `defineTokens` 定义三层结构：
- **Primitive**: 原始值（Hex, px等）。
- **Semantic**: 语义映射（如 `primary` 指向 `blue.500`）。
- **Component**: 组件级映射（如 `button.height` 指向 `spacing.medium`）。

```typescript
// 示例语法
export default defineTokens({
  semantic: {
    color: { primary: '{primitive.blue.500}' }
  }
});
```

### 2.2 SFC 语法扩展 (`<style token>`)
在 Vue SFC 中扩展 `<style token>` 块，内部仅允许使用 `$` 前缀的 Token 引用。

```vue
<style token>
.btn {
    background: $semantic.color.primary; /* 编译后变为 var(--vte-color-primary) 或具体值 */
    padding: $semantic.spacing.medium;
}
</style>
```

### 2.3 编译流水线
1. **Parse**: 解析 `design-tokens.ts`，构建 `TokenMap`（含引用链）。
2. **Transform**: Vite 插件拦截 `.vue` 文件，替换 `$token`。
3. **Codegen**: 根据 Platform（web/mp/rn）输出不同格式（CSS Variables/WXSS/StyleSheet）。

---

## 3. 当前进度 (Day 1-3)
### 3.1 已完成
- **Monorepo 初始化**：使用 pnpm workspace。
- **`@vte/core` 包创建**：包含 Token 解析逻辑。
- **`defineTokens` 函数**：作为 TS 类型锚点，实际返回原对象。
- **`parseTokens` 核心逻辑**：
    - ✅ 递归拍平嵌套对象（Dot notation）。
    - ✅ 识别 `{reference}` 语法。
    - ✅ **引用解析**：支持链式引用（如 `comp.a > sem.b > prim.c`）。
    - ✅ 基础错误处理（未解析引用）。
    - ✅ **循环引用检测**：DFS 遍历引用链，发现环时抛出带路径的错误。
- **类型推导增强 (Day 3)**：
    - ✅ `TokenPath<T>` 类型工具：从 token 定义中提取所有合法的点路径联合类型。
    - ✅ IDE 自动补全支持：输入 `$` 时可自动补全所有 token 路径。
    - ✅ 编译期路径验证：非法 token 路径会在编译时报错。

### 3.2 已完成 (Day 2)
- **`@vte/vite-plugin` 包创建**：
    - ✅ 使用 `transform` 钩子拦截 `.vue` 文件。
    - ✅ 使用 `@vue/compiler-sfc` 解析 SFC。
    - ✅ 提取 `<style token>` 内容并替换 `$token.path` 为 CSS Variables。
    - ✅ 注入 `:root { ... }` CSS 变量定义块。
    - ✅ 生成 Sourcemap 支持。
    - ✅ 支持 token 文件热重载（Dev 模式自动 full-reload）。
- **多平台 Codegen**：
    - ✅ **Web**：输出 CSS Variables（`var(--vte-...)`）。
    - ✅ **小程序 (mp)**：直接内联值（不支持 CSS Variables）。
    - ✅ **React Native (rn)**：输出 StyleSheet 格式（数字/字符串）。
- **Playground 验证**：
    - ✅ `App.vue` 使用 `<style token>` 编写 token-based 样式。
    - ✅ 运行 `pnpm run dev` 后，浏览器可正确加载转换后的 CSS。

### 3.3 已完成 (Day 3)
- **`<style token scoped>` 支持**：
    - ✅ 检测 `<style token>` 上的 `scoped` 属性。
    - ✅ 将 `<style token scoped>` 转换为 `<style scoped>` 并替换 token 引用。
    - ✅ CSS 选择器自动添加 `[data-v-xxx]` 属性实现作用域隔离。
    - ✅ CSS 变量定义保持全局注入（不受 scoped 影响）。
- **Playground 示例**：
    - ✅ `ScopedButton.vue` 使用 `<style token scoped>` 验证作用域隔离。

### 3.4 代码位置
- **Parser**: `packages/vte-core/src/parser.ts`
- **Types**: `packages/vte-core/src/types.ts` (`TokenPath<T>`)
- **Vite Plugin**: `packages/vte-vite-plugin/src/index.ts`
- **Codegen**: `packages/vte-vite-plugin/src/codegen/{web,mp,rn}.ts`
- **Token 定义**: `playground/design-tokens.ts`
- **Vue 示例**: `playground/App.vue`, `playground/ScopedButton.vue`
- **Vite 配置**: `playground/vite.config.ts`

### 3.5 已完成 (Day 4)
- **单元测试**：
    - ✅ 使用 Vitest 编写 23 个测试用例，全部通过。
    - ✅ `@vte/core` 测试：token 解析、引用解析、循环引用检测、未解析引用、深度嵌套。
    - ✅ `@vte/vite-plugin` 测试：web/mp/rn 三平台 codegen、token 替换、边界情况。

### 3.6 已完成 (Day 5)
- **`@vte/cli` 命令行工具**：
    - ✅ `vte validate [file]`：验证 token 定义，显示 token 树。
    - ✅ `vte extract [file]`：提取 token 路径，支持 `--json` 输出。
    - ✅ `vte generate [file]`：生成平台代码（web/mp/rn），支持 `--output` 写入文件。
    - ✅ 错误处理：循环引用、未解析引用的友好错误提示。

### 3.7 已完成 (Day 6)
- **错误提示优化**：
    - ✅ 未解析 token 路径的友好警告信息。
    - ✅ 基于编辑距离的相似路径推荐（拼写错误检测）。
    - ✅ 编译期输出警告，不阻断编译。

### 3.8 已完成 (Day 7)
- **`@vte/compiler` 包**：
    - ✅ `compile()` 函数：解析 token 文件并生成输出文件。
    - ✅ `agent.json`：AI 可读的 token 信息，包含值、引用链、平台值（web/mp/rn）。
    - ✅ `tokens.d.ts`：TypeScript 类型声明，支持 IDE 自动补全。

### 3.9 已完成 (Day 8)
- **`@vte/react` 包**：
    - ✅ `TokenProvider`：React Context Provider，注入 token 映射和平台配置。
    - ✅ `useToken` hook：获取完整 token 上下文（tokenMap、platform、getToken、getTokenValue）。
    - ✅ `useTokenValue` hook：按路径获取单个 token 值，支持平台转换。
    - ✅ `useTokenMap` hook：获取完整 token 映射。
    - ✅ `useTokenStyle` hook：将 token 路径映射转换为样式对象。

### 3.10 已知待办/技术债
- **AST 解析**：当前 `parseTokens` 使用 `require()` 直接执行 TS 文件。生产级方案应使用 `@swc/core` 解析 AST 以保安全。
- **Token 变量命名规范**：当前使用 `--vte-{path}` 格式，可考虑支持自定义前缀。

---

## 4. 下一步计划 (Day 9)

**目标**：完善 VTE 文档和 AI 集成。

### 4.1 任务清单
1.  ~~**Token 类型推导增强**~~ ✅ 已完成：
    - ✅ 实现 `TokenPath<T>` 类型工具，从 token 定义中提取所有合法路径。
    - ✅ IDE 自动补全支持，编译期路径验证。
2.  ~~**`<style token scoped>` 支持**~~ ✅ 已完成：
    - ✅ `<style token scoped>` 正确转换为 `<style scoped>` 并替换 token 引用。
    - ✅ CSS 选择器添加 `[data-v-xxx]` 属性实现作用域隔离。
    - ✅ CSS 变量定义保持全局注入。
3.  ~~**单元测试**~~ ✅ 已完成：
    - ✅ 23 个测试用例，覆盖 parser、codegen (web/mp/rn)、defineTokens。
4.  ~~**VTE CLI**~~ ✅ 已完成：
    - ✅ `vte validate`：验证 token 定义，显示 token 树。
    - ✅ `vte extract`：提取 token 路径，支持 JSON 输出。
    - ✅ `vte generate`：生成 web/mp/rn 平台代码。
5.  ~~**错误提示优化**~~ ✅ 已完成：
    - ✅ 未解析 token 路径的友好警告信息。
    - ✅ 基于编辑距离的相似路径推荐（拼写错误检测）。
    - ✅ 编译期输出警告，不阻断编译。
6.  ~~**@vte/compiler**~~ ✅ 已完成：
    - ✅ `compile()` 函数：解析 token 文件并生成输出文件。
    - ✅ `agent.json`：AI 可读的 token 信息，包含值、引用链、平台值。
    - ✅ `tokens.d.ts`：TypeScript 类型声明，支持 IDE 自动补全。
7.  ~~**@vte/react**~~ ✅ 已完成：
    - ✅ `TokenProvider`：React Context Provider，注入 token 映射和平台配置。
    - ✅ `useToken` hook：获取完整 token 上下文。
    - ✅ `useTokenValue` hook：按路径获取单个 token 值。
    - ✅ `useTokenMap` hook：获取完整 token 映射。
    - ✅ `useTokenStyle` hook：将 token 路径映射转换为样式对象。
8.  ~~**文档完善**~~ ✅ 已完成：
    - ✅ 为 `@vte/core`、`@vte/vite-plugin`、`@vte/cli`、`@vte/compiler`、`@vte/react` 编写 API 文档。
    - ✅ 包含使用示例和最佳实践。

### 3.10 已完成 (Day 10)
- **IDE 扩展架构重构**：
    - ✅ 创建 `@vte/language-server`（VTE Language Server）：IDE 无关的语言服务器核心。
    - ✅ `TokenManager`：Token 管理器，支持解析、缓存、查询。
    - ✅ Provider 接口：Hover、Completion、Definition、Diagnostic、CodeLens、DocumentSymbol。
    - ✅ 重构 `vte-vscode`：使用 language-server 作为核心，VS Code 适配器。
    - ✅ 支持多 IDE 扩展：JetBrains、Vim、Emacs 等可轻松接入。

### 4.2 验收标准
- IDE 中输入 `$` 时可自动补全所有 token 路径。
- `<style token scoped>` 正确生成 scoped CSS 变量引用。
- 错误信息包含具体的修复建议。
- `agent.json` 可被 AI 工具读取并理解可用 token。
- React 组件可通过 hooks 访问 design tokens。

---

## 5. 给接续 AI 的指令 (Prompt for Next AI)

> 你是参与 **Vue Token Engine (VTE)** 项目的 AI 工程师。
>
> **当前状态**：Day 1-8 已完成。
> - `@vte/core`：Token 解析器，支持 `{reference}` 语法、链式引用、循环引用检测。
> - `TokenPath<T>` 类型工具：从 token 定义中提取所有合法路径，支持 IDE 自动补全。
> - `@vte/vite-plugin`：Vite 插件，拦截 `<style token>` 块，将 `$token.path` 替换为 CSS Variables（Web）或内联值（mp/rn）。
> - `<style token scoped>`：支持 scoped styles，CSS 选择器自动添加 `[data-v-xxx]` 属性。
> - `@vte/cli`：命令行工具，支持 validate/extract/generate 命令。
> - `@vte/compiler`：编译器，生成 `agent.json`（AI 可读）和 `tokens.d.ts`（TypeScript 类型）。
> - `@vte/react`：React 绑定，提供 `TokenProvider` 和 hooks（useToken/useTokenValue/useTokenMap/useTokenStyle）。
> - 错误提示：未解析 token 路径的友好警告和拼写建议。
> - 单元测试：23 个测试用例覆盖核心功能。
> - Playground：`App.vue`（非 scoped）和 `ScopedButton.vue`（scoped）验证通过。
>
> **你的任务**（Day 9）：
> 1. 阅读 `packages/vte-core/src/parser.ts` 和 `packages/vte-vite-plugin/src/index.ts`，理解当前实现。
> 2. **文档完善**：
>    - 为 `@vte/core`、`@vte/vite-plugin`、`@vte/cli`、`@vte/compiler`、`@vte/react` 编写 API 文档。
>    - 添加使用示例和最佳实践。
>
> **约束**：优先使用 TypeScript，保持代码模块化。不要引入不必要的运行时依赖。

---

## 6. 关键术语表 (Glossary)

- **TokenMap**: 扁平化的 Token 字典，键为点路径，值为包含 `value` 和 `refs` 的对象。
- **TokenPath<T>**: 类型工具，从 token 定义中提取所有合法的点路径联合类型，用于 IDE 自动补全和编译期路径验证。
- **Reference**: 形如 `{primitive.blue.500}` 的字符串，表示对另一个 Token 的引用。
- **`<style token>`**: VTE 定义的 SFC 扩展块，用于编写受 Token 约束的样式。
- **Platform**: 编译目标，目前规划为 `web`、`mp`（小程序）、`rn`（React Native）。
- **VTE CLI**: 命令行工具，支持 `validate`（验证）、`extract`（提取路径）、`generate`（生成代码）命令。
- **agent.json**: AI 可读的 token 信息文件，包含值、引用链、平台值，用于让 AI 理解可用 token。
- **tokens.d.ts**: TypeScript 类型声明文件，提供 token 路径和值的类型定义。
- **TokenProvider**: React Context Provider，注入 token 映射和平台配置到组件树。
- **useToken**: React hook，获取完整 token 上下文（tokenMap、platform、getToken、getTokenValue）。
- **useTokenValue**: React hook，按路径获取单个 token 值，支持平台转换。

---
*End of Document
