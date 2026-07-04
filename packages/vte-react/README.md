# @vte/react

Vue Token Engine 的 React 绑定，提供 hooks 访问 design tokens。

## 安装

```bash
npm install @vte/react
# 或
pnpm add @vte/react
```

## 使用

### TokenProvider

在应用根部注入 token 上下文：

```tsx
import { TokenProvider } from "@vte/react";
import { tokenMap } from "./tokens";

function App() {
  return (
    <TokenProvider tokenMap={tokenMap} platform="web">
      <MyComponent />
    </TokenProvider>
  );
}
```

### useTokenValue

获取单个 token 的值：

```tsx
import { useTokenValue } from "@vte/react";

function MyComponent() {
  const color = useTokenValue("semantic.color.primary");

  return <div style={{ color }}>Hello</div>;
}
```

支持平台转换：

```tsx
// Web: var(--vte-semantic-color-primary)
const webColor = useTokenValue("semantic.color.primary");

// 小程序: #3b82f6
const mpColor = useTokenValue("semantic.color.primary", "mp");

// React Native: #3b82f6
const rnColor = useTokenValue("semantic.color.primary", "rn");
```

### useTokenStyle

将 token 路径映射转换为样式对象：

```tsx
import { useTokenStyle } from "@vte/react";

function MyComponent() {
  const style = useTokenStyle({
    color: "semantic.color.primary",
    backgroundColor: "semantic.color.background",
    padding: "semantic.spacing.medium",
  });

  // style = {
  //   color: "var(--vte-semantic-color-primary)",
  //   backgroundColor: "var(--vte-semantic-color-background)",
  //   padding: "var(--vte-semantic-spacing-medium)",
  // }

  return <div style={style}>Hello</div>;
}
```

### useTokenMap

获取完整的 token 映射：

```tsx
import { useTokenMap } from "@vte/react";

function TokenList() {
  const tokenMap = useTokenMap();

  const colors = Array.from(tokenMap.entries())
    .filter(([key]) => key.startsWith("semantic.color"))
    .map(([key, value]) => ({ key, value: value.value }));

  return (
    <ul>
      {colors.map(({ key, value }) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  );
}
```

### useToken

获取完整的 token 上下文：

```tsx
import { useToken } from "@vte/react";

function MyComponent() {
  const { tokenMap, platform, getToken, getTokenValue } = useToken();

  return (
    <div>
      <p>Platform: {platform}</p>
      <p>Primary color: {getToken("semantic.color.primary")}</p>
    </div>
  );
}
```

## 组件示例

### Button 组件

```tsx
import { useTokenValue, useTokenStyle } from "@vte/react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary" }: ButtonProps) {
  const primaryColor = useTokenValue("semantic.color.primary") as string;
  const bgColor = useTokenValue("semantic.color.background") as string;

  const style = useTokenStyle({
    padding: "semantic.spacing.medium",
  });

  return (
    <button
      style={{
        ...style,
        backgroundColor: variant === "primary" ? primaryColor : bgColor,
        color: variant === "primary" ? "#fff" : "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
```

## 平台值转换

| 原始值 | Web | 小程序 (mp) | React Native |
|--------|-----|-------------|--------------|
| `#3b82f6` | `var(--vte-xxx)` | `#3b82f6` | `#3b82f6` |
| `0.5rem` | `var(--vte-xxx)` | `16rpx` | `0.5rem` |
| `16px` | `var(--vte-xxx)` | `32rpx` | `16` |
| `8` | `var(--vte-xxx)` | `8` | `8` |

## License

ISC
