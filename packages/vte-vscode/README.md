# VTE VS Code Extension

基于 **VTE Language Server** 的 VS Code 扩展，为 Vue Token Engine 的 `<style token>` 块提供完整的 IDE 支持。

## 功能

### 核心功能
- **语法高亮**：`$token.path` 语法的语法高亮
- **悬停预览**：鼠标悬停显示 token 值、颜色预览、引用链
- **自动补全**：输入 `$` 后自动补全 token 路径，颜色 token 显示色块图标
- **跳转定义**：Ctrl/Cmd + 点击跳转到 token 定义

### 智能功能
- **诊断警告**：无效 token 显示黄色波浪线警告
- **快速修复**：自动建议相似的 token 路径
- **重命名**：F2 重命名 token，自动更新所有引用
- **Code Lens**：显示 token 使用次数（当前文件和项目级）

### 视觉增强
- **内联色块**：颜色 token 旁边显示色块
- **内联值显示**：非颜色 token 后面显示解析后的值（灰色斜体）
- **颜色标尺**：右侧标尺显示颜色标记

### 文档支持
- **大纲视图**：显示所有 class 和选择器
- **class 支持**：悬停和跳转支持 template 中的 class 名称
- **class 样式预览**：悬停在 class 名称上显示 CSS 样式（带语法高亮）

## 架构

```
@vte-js/language-server  ← IDE 无关核心
└── @vte-js/vscode       ← VS Code 适配器（本包）
```

## 安装

### 开发模式

```bash
cd packages/vte-vscode
npm install
npm run build
```

然后在 VS Code 中：
1. 按 `F5` 启动调试
2. 选择 "Run Extension"
3. 在新窗口中打开 VTE 项目

### 项目级配置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false
}
```

## 使用

### 快捷键

| 操作 | 快捷键 |
|------|--------|
| 自动补全 | 输入 `$` |
| 悬停预览 | 鼠标悬停 |
| 跳转定义 | Ctrl/Cmd + 点击 |
| 重命名 | F2 |
| 快速修复 | Ctrl/Cmd + . |
| 大纲视图 | Ctrl/Cmd + Shift + O |

### Code Lens

每个 token 首次出现的位置显示使用次数：

```
2 usages in file    5 usages in project
.btn {
  background: $semantic.color.primary;
}
```

### Class 操作

```vue
<template>
  <button class="btn">Click me</button>
</template>

<style token>
.btn {
  background: $semantic.color.primary;
}
</style>
```

悬停在 class 名称上会显示 CSS 样式和可点击的 token 链接。

## 配置

```json
{
  "vte.tokenFile": "design-tokens.ts"
}
```

## License

ISC
