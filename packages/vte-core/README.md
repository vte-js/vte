# @vte-js/core

Vue Token Engine 的核心包，提供 token 解析和类型工具。

## 安装

```bash
npm install @vte-js/core
# 或
pnpm add @vte-js/core
```

## API

### `defineTokens<T>(tokens)`

定义设计 tokens，返回类型安全的 token 配置。

```typescript
import { defineTokens } from "@vte-js/core";

const tokens = defineTokens({
  primitive: {
    blue: {
      500: "#3b82f6",
    },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}", // 引用语法
      background: "#ffffff",
    },
  },
});
```

### `parseTokens(sourceFile)`

解析 token 文件，返回扁平化的 TokenMap。

```typescript
import { parseTokens } from "@vte-js/core";

const tokenMap = await parseTokens("./design-tokens.ts");

// tokenMap 是 Map<string, TokenValue>
// Key: "semantic.color.primary"
// Value: { path, value, raw, refs }
```

### `TokenPath<T>` 类型

从 token 定义中提取所有合法路径的联合类型，用于 IDE 自动补全。

```typescript
import { type TokenPath } from "@vte-js/core";

type Paths = TokenPath<typeof tokens>;
// "primitive" | "primitive.blue" | "primitive.blue.500" | ...
```

### `TokenMap` 类型

```typescript
interface TokenValue {
  path: string;      // token 路径
  value: string;     // 解析后的值
  raw: string;       // 原始值
  refs: string[];    // 引用链
}

type TokenMap = Map<string, TokenValue>;
```

## Token 语法

### 直接值

```typescript
defineTokens({
  color: {
    primary: "#3b82f6",
    spacing: "0.5rem",
  },
});
```

### 引用语法

使用 `{path}` 语法引用其他 token：

```typescript
defineTokens({
  primitive: {
    blue: { 500: "#3b82f6" },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}", // 引用 primitive.blue.500
    },
  },
});
```

### 支持链式引用

```typescript
defineTokens({
  primitive: { blue: { 500: "#3b82f6" } },
  semantic: { color: { primary: "{primitive.blue.500}" } },
  component: { button: { bg: "{semantic.color.primary}" } },
});
// component.button.bg → semantic.color.primary → primitive.blue.500 → #3b82f6
```

## 错误处理

### 循环引用

```typescript
// ❌ 会抛出错误
defineTokens({
  a: "{b}",
  b: "{a}",
});
// Error: [VTE] Circular reference detected: a → b → a
```

### 未解析引用

```typescript
// ❌ 会抛出错误
defineTokens({
  color: "{nonexistent.path}",
});
// Error: [VTE] Unresolved reference: "{nonexistent.path}" in token "color"
```

## License

ISC
