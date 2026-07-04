# 项目上下文档案：Vue Token Engine (VTE)

> **目的**：本文件用于向接续开发的 AI Agent（如 Cursor、Claude Code、ChatGPT）快速同步项目背景、现状及下一步任务

> **版本**：Day 11 - Playground & Documentation Complete

> **日期**：2026-07-04

> **项目地址**：git@github.com:vte-js/vte.git

---

## 1. 项目愿景 (The Vision)

我们正在构建一个名为 **Vue Token Engine (VTE)** 的样式方案，旨在解决现有方案的三大痛点：

1.  **AI 幻觉问题**：Tailwind 的字符串类名（如 `bg-blue-500`）导致 AI 常拼错或凭空捏造颜色。
2.  **跨端割裂**：现有方案难以优雅地适配 Web、小程序（rpx）和 React Native。
3.  **Vue 生态适配**：StyleX 偏向 React 的函数式思维，不符合 Vue SFC 的直观性。

**核心哲学**：**Design Tokens First**。样式必须通过 `$token.path` 引用，禁止硬编码，在编译期拦截错误，天然支持多端转换。

---

## 2. 核心架构

```
@vte/core              核心解析器
@vte/vite-plugin       Vite 插件（<style token> 语法）
@vte/cli               命令行工具
@vte/compiler          编译器（agent.json + tokens.d.ts）
@vte/react             React 绑定（hooks + Provider）
@vte/playground        可视化调试工具
@vte/language-server   IDE 无关的语言服务器核心
vte-vscode             VS Code 扩展
```

### Token 三层结构

```typescript
defineTokens({
  primitive: { blue: { 500: "#3b82f6" } },      // 原始值
  semantic: { color: { primary: "{primitive.blue.500}" } }, // 语义映射
  component: { button: { height: "{semantic.spacing.medium}" } }, // 组件级
});
```

### 编译流水线

1. **Parse**: 解析 `design-tokens.ts`，构建 `TokenMap`
2. **Transform**: Vite 插件替换 `$token.path` 为 CSS Variables
3. **Codegen**: 根据平台输出不同格式（CSS Variables / rpx / StyleSheet）

---

## 3. 当前进度

### 已完成的功能

| Day | 功能 | 包 |
|-----|------|-----|
| 1-2 | Token 解析、Vite 插件、多平台 Codegen | `@vte/core`, `@vte/vite-plugin` |
| 3 | `<style token scoped>` 支持、类型推导增强 | `@vte/vite-plugin` |
| 4 | 单元测试（23 个用例） | `@vte/core`, `@vte/vite-plugin` |
| 5 | CLI 工具（validate/extract/generate） | `@vte/cli` |
| 6 | 错误提示优化（拼写建议） | `@vte/vite-plugin` |
| 7 | 编译器（agent.json + tokens.d.ts） | `@vte/compiler` |
| 8 | React 绑定（hooks + Provider） | `@vte/react` |
| 9 | 文档完善 | 全部包 |
| 10 | IDE 架构重构（language-server） | `@vte/language-server` |
| 11 | Playground 可视化调试工具 | `@vte/playground` |

### 核心功能验证

- ✅ Token 三层结构定义（Primitive → Semantic → Component）
- ✅ `<style token>` 语法编译为 CSS Variables
- ✅ `<style token scoped>` 作用域隔离
- ✅ 多平台输出（Web/小程序/RN）
- ✅ 无效 Token 诊断 + 拼写建议
- ✅ VS Code 扩展（悬停/补全/跳转/快速修复/Code Lens）
- ✅ Playground 可视化调试（暗黑模式/自动补全/复制）
- ✅ 单元测试覆盖（23 个用例）

---

## 4. 已知技术债

- **AST 解析**：`parseTokens` 使用 `require()` 执行 TS 文件，生产级应使用 `@swc/core`
- **Token 前缀**：当前使用 `--vte-{path}` 格式，可支持自定义前缀
- **VS Code 扩展**：CSS 语言服务器不识别 `$token` 语法，需配置禁用验证

---

## 5. 后续开发计划

### 短期（1-2 周）

1. **性能优化**
   - Playground 生成增加缓存机制
   - Vite 插件 token 文件监听优化
   - 语言服务器 token 加载异步化

2. **功能增强**
   - 支持 `<style token module>` (CSS Modules)
   - 支持 token 分组和折叠
   - Playground 增加 token 导出功能

3. **IDE 扩展完善**
   - VS Code 扩展发布到 Marketplace
   - JetBrains 插件开发
   - Vim/Neovim LSP 支持

### 中期（1-2 月）

1. **多端适配增强**
   - Tailwind CSS 集成
   - UnoCSS 集成
   - 原子化 CSS 输出

2. **AI 集成**
   - agent.json 格式标准化
   - AI 辅助 token 设计建议
   - 自动化 token 生成

3. **文档和示例**
   - 完整的项目模板
   - 最佳实践指南
   - 迁移指南（从 Tailwind/UnoCSS 迁移）

### 长期（3-6 月）

1. **生态系统**
   - 组件库集成（Ant Design Vue、Element Plus）
   - 设计工具集成（Figma、Sketch）
   - CI/CD 集成

2. **跨平台增强**
   - Flutter 支持
   - SwiftUI 支持
   - Web Components 支持

3. **企业级功能**
   - Token 版本管理
   - Token 变更追踪
   - Token 使用分析

---

## 6. 关键术语

| 术语 | 说明 |
|------|------|
| TokenMap | 扁平化的 Token 字典，键为点路径 |
| TokenPath\<T\> | 类型工具，提取所有合法的 token 路径 |
| Reference | `{primitive.blue.500}` 格式的引用 |
| \<style token\> | VTE 的 SFC 扩展块 |
| Platform | 编译目标：web / mp / rn |
| agent.json | AI 可读的 token 信息文件 |
| tokens.d.ts | TypeScript 类型声明文件 |

---

*End of Document*
