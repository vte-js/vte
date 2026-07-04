# VTE Demo Project

Vue Token Engine 完整功能演示项目。

## 功能演示

本项目演示了 VTE 的所有核心功能：

### 1. Token 定义
- 三层结构：Primitive → Semantic → Component
- 引用语法：`{primitive.blue.500}`
- 丰富的 token 类型：颜色、间距、字号、圆角、阴影

### 2. SFC 语法
- `<style token>` 块
- `$token.path` 引用
- 无效 token 诊断
- 自动补全

### 3. VS Code 扩展
- 语法高亮
- 悬停预览
- 跳转定义
- 快速修复
- Code Lens
- 内联色块

## 组件示例

### Buttons
```vue
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
```

### Form Elements
```vue
<input class="input" />
<textarea class="textarea"></textarea>
```

### Cards
```vue
<div class="card">
  <div class="card-header">...</div>
  <div class="card-body">...</div>
</div>
```

### Alerts
```vue
<div class="alert alert-success">Success!</div>
<div class="alert alert-error">Error!</div>
```

## 运行

```bash
cd demo-project
pnpm install
pnpm dev
```

## VS Code 扩展验证

1. 用 VS Code 打开此项目
2. 按 F5 启动 VTE 扩展调试
3. 打开 `src/App.vue`
4. 测试所有功能

**注意**：项目已配置 `.vscode/settings.json` 禁用 CSS 验证，避免 `$token` 语法误报。

## 验证清单

- [ ] 输入 `$` 触发自动补全
- [ ] 鼠标悬停显示 token 值
- [ ] Ctrl/Cmd + 点击跳转定义
- [ ] 无效 token 显示黄色波浪线
- [ ] 按 Ctrl/Cmd + . 显示快速修复
- [ ] Code Lens 显示使用次数
- [ ] 颜色 token 旁边显示色块
- [ ] 非颜色 token 后面显示值
- [ ] 大纲视图显示所有 class
- [ ] 悬停在 class 上显示 CSS 样式
