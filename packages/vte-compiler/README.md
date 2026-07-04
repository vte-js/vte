# @vte/compiler

Vue Token Engine 的编译器，生成 `agent.json`（AI 可读）和 `tokens.d.ts`（TypeScript 类型）。

## 安装

```bash
npm install @vte/compiler
# 或
pnpm add @vte/compiler
```

## API

### `compile(options)`

编译 token 文件，生成输出文件。

```typescript
import { compile } from "@vte/compiler";

const result = await compile({
  tokenFile: "./design-tokens.ts",
  outputDir: "./dist",
  prefix: "tokens",  // 可选，默认 "tokens"
});

// 写入文件
fs.writeFileSync(result.agentJsonPath, JSON.stringify(result.agentJson, null, 2));
fs.writeFileSync(result.tokensDtsPath, result.tokensDts);
```

## 输出文件

### `agent.json`

AI 可读的 token 信息文件，包含：

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-07-04T09:10:22.386Z",
  "tokens": {
    "semantic.color.primary": {
      "value": "#3b82f6",
      "original": "{primitive.blue.500}",
      "refs": ["primitive.blue.500"],
      "platform": {
        "web": "var(--vte-semantic-color-primary)",
        "mp": "#3b82f6",
        "rn": "#3b82f6"
      }
    }
  },
  "paths": ["semantic.color.primary", ...],
  "tree": { "semantic": { "color": { "primary": null } } },
  "stats": {
    "total": 11,
    "primitives": 7,
    "references": 4
  }
}
```

用途：
- AI 工具读取后可理解可用 token
- 变更追踪（通过 `refs` 字段）
- 多平台值（web/mp/rn）

### `tokens.d.ts`

TypeScript 类型声明文件：

```typescript
// 所有合法的 token 路径
export type TokenPaths =
  | "semantic.color.primary"
  | "semantic.spacing.small"
  | ...;

// Token 映射类型
export interface TokenMap {
  "semantic.color.primary": "#3b82f6";
  ...
}

// Token 常量值
export const tokens = {
  semantic: {
    color: { primary: "#3b82f6" },
  },
} as const;
```

用途：
- IDE 自动补全
- 类型安全的 token 访问

## 类型说明

```typescript
interface AgentToken {
  value: string;        // 解析后的值
  original: string;     // 原始值（可能是引用）
  refs: string[];       // 引用链
  platform: {
    web: string;        // CSS Variable 格式
    mp: string;         // 小程序格式（rpx）
    rn: number | string; // React Native 格式
  };
}
```

## License

ISC
