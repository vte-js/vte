"use client";

import { useContext, useCallback } from "react";
import type { TokenMap } from "@vte/core";
import { TokenContext, type TokenContextValue } from "./context.js";

/**
 * 获取 token 上下文的内部 hook
 */
function useTokenContext(): TokenContextValue {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error(
      "[VTE] useToken must be used within a TokenProvider. " +
        "Wrap your component with <TokenProvider tokenMap={...}>.",
    );
  }
  return context;
}

/**
 * useToken hook - 获取完整的 token 上下文
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { tokenMap, platform, getToken, getTokenValue } = useToken();
 *
 *   return (
 *     <div style={{ color: getTokenValue("semantic.color.primary") }}>
 *       Hello
 *     </div>
 *   );
 * }
 * ```
 */
export function useToken(): TokenContextValue {
  return useTokenContext();
}

/**
 * useTokenValue hook - 获取单个 token 的值
 *
 * @param path - Token 路径（如 "semantic.color.primary"）
 * @param platform - 可选的目标平台
 * @returns Token 的值
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const color = useTokenValue("semantic.color.primary");
 *   const spacing = useTokenValue("semantic.spacing.medium", "mp");
 *
 *   return (
 *     <div style={{ color, padding: spacing }}>
 *       Hello
 *     </div>
 *   );
 * }
 * ```
 */
export function useTokenValue(
  path: string,
  platform?: "web" | "mp" | "rn",
): string | number | undefined {
  const { getTokenValue } = useTokenContext();
  return getTokenValue(path, platform);
}

/**
 * useTokenMap hook - 获取完整的 token 映射
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const tokenMap = useTokenMap();
 *
 *   const colors = Array.from(tokenMap.entries())
 *     .filter(([key]) => key.startsWith("semantic.color"))
 *     .map(([key, value]) => ({ key, value: value.value }));
 *
 *   return (
 *     <ul>
 *       {colors.map(({ key, value }) => (
 *         <li key={key}>{key}: {value}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useTokenMap(): TokenMap {
  const { tokenMap } = useTokenContext();
  return tokenMap;
}

/**
 * useTokenStyle hook - 生成样式对象
 *
 * @param styles - 样式映射，值为 token 路径
 * @returns 处理后的样式对象
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const style = useTokenStyle({
 *     color: "semantic.color.primary",
 *     backgroundColor: "semantic.color.background",
 *     padding: "semantic.spacing.medium",
 *   });
 *
 *   return <div style={style}>Hello</div>;
 * }
 * ```
 */
export function useTokenStyle<T extends Record<string, string>>(
  styles: T,
): { [K in keyof T]: string | number } {
  const { getTokenValue } = useTokenContext();

  const result = {} as { [K in keyof T]: string | number };

  for (const [key, tokenPath] of Object.entries(styles)) {
    const value = getTokenValue(tokenPath);
    if (value !== undefined) {
      (result as any)[key] = value;
    }
  }

  return result;
}
