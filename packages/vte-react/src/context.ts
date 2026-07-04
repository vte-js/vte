"use client";

import { createContext, useContext } from "react";
import type { TokenMap, TokenValue } from "@vte/core";

/**
 * Token 上下文的值
 */
export interface TokenContextValue {
  /** Token 映射 */
  tokenMap: TokenMap;
  /** 当前平台 */
  platform: "web" | "mp" | "rn";
  /** 获取 token 值 */
  getToken: (path: string) => string | undefined;
  /** 获取 token 的平台特定值 */
  getTokenValue: (path: string, platform?: "web" | "mp" | "rn") => string | number | undefined;
}

/**
 * 默认的 token 上下文
 */
export const TokenContext = createContext<TokenContextValue | null>(null);

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
