import type { TokenMap } from "@vte-js/core";
import { toCssVarName } from "@vte-js/core";

/**
 * Agent JSON 中的单个 token 信息
 */
export interface AgentToken {
  /** token 的值 */
  value: string;
  /** 原始引用语法（如 {primitive.blue.500}），如果是直接值则与 value 相同 */
  original: string;
  /** 引用链（用于变更追踪） */
  refs: string[];
  /** 分平台的值 */
  platform: {
    web: string;
    mp: string;
    rn: number | string;
  };
}

/**
 * Agent JSON 的完整结构
 */
export interface AgentJson {
  /** 版本号 */
  version: string;
  /** 生成时间 */
  generatedAt: string;
  /** 所有 token 的扁平映射 */
  tokens: Record<string, AgentToken>;
  /** 按层级组织的 token 树 */
  tree: Record<string, any>;
  /** 所有合法路径的列表（用于自动补全） */
  paths: string[];
  /** 统计信息 */
  stats: {
    total: number;
    primitives: number;
    references: number;
  };
}

/**
 * 将值转换为小程序格式（rpx）
 */
function toMpValue(value: string): string {
  // 如果是 px 单位，转换为 rpx（1px = 2rpx）
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const num = parseFloat(pxMatch[1]);
    return `${num * 2}rpx`;
  }

  // rem 单位转换（假设 1rem = 16px）
  const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    const num = parseFloat(remMatch[1]);
    return `${num * 16 * 2}rpx`;
  }

  // 颜色值保持不变
  return value;
}

/**
 * 将值转换为 React Native 格式
 */
function toRnValue(value: string): number | string {
  // 数值型（无单位）直接返回数字
  if (/^\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  // px 单位返回数字
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }

  // 其他返回字符串
  return value;
}

/**
 * 构建 token 树
 */
function buildTree(map: TokenMap): Record<string, any> {
  const tree: Record<string, any> = {};

  for (const [path] of map) {
    const parts = path.split(".");
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = null;
  }

  return tree;
}

/**
 * 从 tokenMap 生成 agent.json
 */
export function generateAgentJson(map: TokenMap, cssPrefix: string = "vte"): AgentJson {
  const tokens: Record<string, AgentToken> = {};
  const paths: string[] = [];
  let primitives = 0;
  let references = 0;

  for (const [path, token] of map) {
    const isRef = token.refs.length > 0;
    if (isRef) {
      references++;
    } else {
      primitives++;
    }

    tokens[path] = {
      value: token.value,
      original: isRef ? token.raw : token.value,
      refs: token.refs,
      platform: {
        web: `var(${toCssVarName(path, cssPrefix)})`,
        mp: toMpValue(token.value),
        rn: toRnValue(token.value),
      },
    };

    paths.push(path);
  }

  return {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    tokens,
    tree: buildTree(map),
    paths,
    stats: {
      total: map.size,
      primitives,
      references,
    },
  };
}
