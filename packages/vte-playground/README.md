# @vte/playground

Vue Token Engine 的可视化调试工具，根据项目的 `design-tokens.ts` 自动生成 playground。

## 功能

- **自动生成**：根据项目 tokens 动态生成 playground
- **暗黑模式**：支持亮色/暗色主题切换
- **Token 编辑器**：实时查看 CSS 变量和值
- **自动补全**：输入 token 路径时自动过滤
- **复制功能**：一键复制 token 路径和 CSS 变量
- **分类展示**：颜色、间距、字号、圆角、阴影自动分组

## 使用

### 安装

```bash
npm install @vte/playground
# 或
pnpm add @vte/playground
```

### 生成 Playground

```bash
# 在项目根目录执行
vte-playground generate

# 或使用 pnpm
pnpm --filter @vte/playground exec vte-playground generate

# 指定 token 文件
vte-playground generate --token-file src/tokens.ts

# 指定输出目录
vte-playground generate --output .my-playground
```

### 启动 Playground

```bash
cd .vte-playground
pnpm install
pnpm dev
```

## 生成的文件

```
.vte-playground/
├── Playground.vue     # 自动生成的 playground 组件
├── main.ts            # 入口文件
├── index.html         # HTML 入口
├── vite.config.ts     # Vite 配置（自动指向项目 token 文件）
└── package.json       # 依赖配置
```

## 功能演示

### 1. Token 分类展示

根据 token 类型自动分组：
- 🎨 颜色（color）
- 📐 间距（spacing）
- 📝 字号（fontSize）
- 🔲 圆角（borderRadius）
- 🌫️ 阴影（shadow）

### 2. Token 编辑器

输入 token 路径实时查看：
- CSS Variable 格式
- 原始值
- 颜色预览（仅颜色 token）

### 3. 暗黑模式

点击 Header 右侧的 🌙/☀️ 按钮切换主题。

### 4. 复制功能

点击 Token Path、CSS Variable 或 Value 行，或点击 📋 按钮复制。

## CLI 命令

```bash
# 生成 playground
vte-playground generate [token-file] [options]

# 选项
#   -o, --output <dir>    输出目录（默认 .vte-playground）
```

## 配置

生成的 `vite.config.ts` 会自动配置：
- token 文件路径（相对路径）
- Vue 插件
- VTE 插件

如需自定义，编辑生成的文件即可。

## License

ISC
