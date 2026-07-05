"use client";

import React, { useMemo } from "react";
import type { TokenMap } from "@vte-js/core";
import { TokenContext, type TokenContextValue } from "./context.js";

/**
 * Token Provider 的属性
 */
export interface TokenProviderProps {
  /** Token 映射 */
  tokenMap: TokenMap;
  /** 目标平台 */
  platform?: "web" | "mp" | "rn";
  /** 子组件 */
  children: React.ReactNode;
}

/**
 * 将值转换为小程序格式（rpx）
 */
function toMpValue(value: string): string {
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const num = parseFloat(pxMatch[1]);
    return `${num * 2}rpx`;
  }

  const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    const num = parseFloat(remMatch[1]);
    return `${num * 16 * 2}rpx`;
  }

  return value;
}

/**
 * 将值转换为 React Native 格式
 */
function toRnValue(value: string): number | string {
  if (/^\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }

  return value;
}

/**
 * Token Provider 组件
 *
 * @example
 * ```tsx
 * import { TokenProvider } from "@vte/react";
 * import { tokenMap } from "./tokens";
 *
 * function App() {
 *   return (
 *     <TokenProvider tokenMap={tokenMap} platform="web">
 *       <MyComponent />
 *     </TokenProvider>
 *   );
 * }
 * ```
 */
export function TokenProvider({
  tokenMap,
  platform = "web",
  children,
}: TokenProviderProps) {
  const contextValue = useMemo<TokenContextValue>(() => {
    const getToken = (path: string): string | undefined => {
      return tokenMap.get(path)?.value;
    };

    const getTokenValue = (
      path: string,
      targetPlatform?: "web" | "mp" | "rn",
    ): string | number | undefined => {
      const token = tokenMap.get(path);
      if (!token) return undefined;

      const p = targetPlatform ?? platform;
      const value = token.value;

      switch (p) {
        case "web":
          return `var(--vte-${path.replace(/\./g, "-")})`;
        case "mp":
          return toMpValue(value);
        case "rn":
          return toRnValue(value);
        default:
          return value;
      }
    };

    return {
      tokenMap,
      platform,
      getToken,
      getTokenValue,
    };
  }, [tokenMap, platform]);

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
}
