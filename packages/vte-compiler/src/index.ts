import { parseTokens, type TokenMap } from "@vte-js/core";
import { generateAgentJson, type AgentJson } from "./agent.js";
import { generateTokensDts } from "./dts.js";

export interface CompilerOptions {
  /** Token 文件路径 */
  tokenFile: string;
  /** 输出目录 */
  outputDir: string;
  /** 输出文件名前缀（默认 "tokens"） */
  prefix?: string;
  /** CSS 变量前缀（默认 "vte"） */
  cssPrefix?: string;
}

export interface CompileResult {
  /** 生成的 agent.json 内容 */
  agentJson: AgentJson;
  /** 生成的 tokens.d.ts 内容 */
  tokensDts: string;
  /** agent.json 文件路径 */
  agentJsonPath: string;
  /** tokens.d.ts 文件路径 */
  tokensDtsPath: string;
}

/**
 * 编译 design-tokens.ts 生成 agent.json 和 tokens.d.ts
 */
export async function compile(options: CompilerOptions): Promise<CompileResult> {
  const { tokenFile, outputDir, prefix = "tokens", cssPrefix = "vte" } = options;

  // 解析 token 文件
  const tokenMap = await parseTokens(tokenFile);

  // 生成 agent.json
  const agentJson = generateAgentJson(tokenMap, cssPrefix);

  // 生成 tokens.d.ts
  const tokensDts = generateTokensDts(tokenMap);

  const agentJsonPath = `${outputDir}/${prefix}.agent.json`;
  const tokensDtsPath = `${outputDir}/${prefix}.d.ts`;

  return {
    agentJson,
    tokensDts,
    agentJsonPath,
    tokensDtsPath,
  };
}

export { generateAgentJson, type AgentJson, type AgentToken } from "./agent.js";
export { generateTokensDts } from "./dts.js";
export type { TokenMap, TokenValue } from "@vte-js/core";
