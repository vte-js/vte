# 项目上下文档案：Vue Token Engine (VTE)

> **目的**：本文件用于向接续开发的 AI Agent（如 Cursor、Claude Code、ChatGPT）快速同步项目背景、现状及下一步任务

> **版本**：Day 12 - Token Configurator & Light Mode Complete

> **日期**：2026-07-05

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
@vte-js/core              核心解析器
@vte-js/vite-plugin       Vite 插件（<style token> 语法）
@vte-js/cli               命令行工具
@vte-js/compiler          编译器（agent.json + tokens.d.ts）
@vte-js/react             React 绑定（hooks + Provider）
@vte-js/playground        可视化调试工具（CLI 生成）
@vte-js/language-server   IDE 无关的语言服务器核心
@vte-js/vscode             VS Code 扩展
vte-website               官方网站（含 Token Configurator）
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
| 1-2 | Token 解析、Vite 插件、多平台 Codegen | `@vte-js/core`, `@vte-js/vite-plugin` |
| 3 | `<style token scoped>` 支持、类型推导增强 | `@vte-js/vite-plugin` |
| 4 | 单元测试（25 个用例） | `@vte-js/core`, `@vte-js/vite-plugin` |
| 5 | CLI 工具（validate/extract/generate） | `@vte-js/cli` |
| 6 | 错误提示优化（拼写建议） | `@vte-js/vite-plugin` |
| 7 | 编译器（agent.json + tokens.d.ts） | `@vte-js/compiler` |
| 8 | React 绑定（hooks + Provider） | `@vte-js/react` |
| 9 | 文档完善 | 全部包 |
| 10 | IDE 架构重构（language-server） | `@vte-js/language-server` |
| 11 | Playground 可视化调试工具 | `@vte-js/playground` |
| 12 | VS Code 扩展发布 + Token Configurator | `@vte-js/vscode`, `vte-website` |

### 核心功能验证

- ✅ Token 三层结构定义（Primitive → Semantic → Component）
- ✅ `<style token>` 语法编译为 CSS Variables
- ✅ `<style token scoped>` 作用域隔离
- ✅ 多平台输出（Web/小程序/RN）
- ✅ 无效 Token 诊断 + 拼写建议
- ✅ VS Code 扩展（悬停/补全/跳转/快速修复/Code Lens）— 已发布 Marketplace v1.0.2
- ✅ Playground 可视化调试（暗黑模式/自动补全/复制/导出）
- ✅ Playground 增强（Watch 模式/搜索过滤/多平台预览/依赖关系图）
- ✅ Token Configurator（可视化编辑器/模板/导入导出/实时预览）
- ✅ 网站亮色/暗色模式完整适配
- ✅ 单元测试覆盖（25 个用例）
- ✅ Changesets 自动化版本管理

### npm 发布状态

| 包 | 版本 | 状态 |
|---|------|------|
| `@vte-js/core` | 1.0.0 | ✅ 已发布 |
| `@vte-js/vite-plugin` | 1.0.0 | ✅ 已发布 |
| `@vte-js/cli` | 1.0.0 | ✅ 已发布 |
| `@vte-js/compiler` | 1.0.0 | ✅ 已发布 |
| `@vte-js/react` | 1.0.0 | ✅ 已发布 |
| `@vte-js/language-server` | 1.0.2 | ✅ 已发布 |
| `@vte-js/playground` | 1.1.0 | ✅ 已发布 |
| `@vte-js/vscode` | 1.0.2 | ✅ Marketplace |

---

## 4. 关键命令

```bash
pnpm dev              # 生成并启动 Playground（.vte-playground/）
pnpm dev:website      # 启动网站开发服务器（含 Token Configurator）
pnpm build:website    # 构建网站
pnpm test             # 运行单元测试
pnpm changeset        # 添加 changeset（版本管理）
pnpm version-packages # 更新版本号 + changelog
pnpm release          # 构建 + 发布所有包
```

---

## 5. 已知限制

- **CSS 语言服务器**：VS Code 内置 CSS 语言服务器不识别 `$token` 语法，需在 `.vscode/settings.json` 配置 `"css.validate": false` 禁用验证。
- **Token Configurator**：引用选择器的 `getRefValue()` 函数未实现（返回空字符串），需要接入 tokenMap 获取引用值。
- **Playground CLI**：`vte-playground start` 生成的项目需要在 workspace 内才能正确解析 `workspace:*` 依赖。

---

## 6. 后续开发计划

### 短期（1-2 周）

1. **Token Configurator 完善**
   - 引用选择器显示引用值
   - localStorage 持久化优化
   - 移动端响应式适配

2. **VS Code 扩展增强**
   - 引用链可视化
   - Token 使用统计
   - 批量重命名

3. **Playground 优化**
   - 响应式布局
   - Token 搜索高亮
   - 导入/导出功能增强

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

## 7. 关键术语

| 术语 | 说明 |
|------|------|
| TokenMap | 扁平化的 Token 字典，键为点路径 |
| TokenPath\<T\> | 类型工具，提取所有合法的 token 路径 |
| Reference | `{primitive.blue.500}` 格式的引用 |
| \<style token\> | VTE 的 SFC 扩展块 |
| Platform | 编译目标：web / mp / rn |
| agent.json | AI 可读的 token 信息文件 |
| tokens.d.ts | TypeScript 类型声明文件 |
| Changesets | monorepo 版本管理工具 |

---

*End of Document*
