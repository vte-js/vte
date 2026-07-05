/**
 * Token 管理器
 * 负责 token 的解析、缓存和查询
 */

import vm from "vm";
import type { TokenInfo, Range, Position, Location } from "./types.js";
import { isColorValue } from "./utils/color.js";
import { parseStyleBlock, type StyleInfo } from "./style-parser.js";

/**
 * Token 管理器配置
 */
export interface TokenManagerConfig {
  /** token 文件路径 */
  tokenFile: string;
  /** 缓存有效期（毫秒） */
  cacheTtl?: number;
}

/**
 * Token 管理器
 */
export class TokenManager {
  private tokenMap: Map<string, TokenInfo> | null = null;
  private tokenFileUri: string | null = null;
  private tokenFileLineMap: Map<string, number> | null = null;
  private styleMap: Map<string, StyleInfo> | null = null;
  private lastUpdate: number = 0;
  private config: TokenManagerConfig;

  constructor(config: TokenManagerConfig) {
    this.config = {
      cacheTtl: 30000,
      ...config,
    };
  }

  /**
   * 获取所有 token
   */
  getTokenMap(): Map<string, TokenInfo> | null {
    return this.tokenMap;
  }

  /**
   * 获取单个 token
   */
  getToken(path: string): TokenInfo | undefined {
    return this.tokenMap?.get(path);
  }

  /**
   * 检查 token 是否存在
   */
  hasToken(path: string): boolean {
    return this.tokenMap?.has(path) ?? false;
  }

  /**
   * 获取所有 token 路径
   */
  getTokenPaths(): string[] {
    return Array.from(this.tokenMap?.keys() ?? []);
  }

  /**
   * 查找相似的 token
   */
  findSimilarTokens(target: string, maxResults: number = 3): string[] {
    if (!this.tokenMap) return [];

    const paths = Array.from(this.tokenMap.keys());
    const scored = paths
      .map((path) => ({
        path,
        distance: this.editDistance(target, path),
      }))
      .sort((a, b) => a.distance - b.distance);

    return scored
      .slice(0, maxResults)
      .filter((item) => item.distance <= Math.max(target.length, 5) / 2)
      .map((item) => item.path);
  }

  /**
   * 解析 token 文件内容
   */
  async parseTokenFile(content: string, uri: string): Promise<void> {
    this.tokenMap = new Map();
    this.tokenFileUri = uri;
    this.tokenFileLineMap = new Map();

    try {
      // Convert ES module syntax to CommonJS (token files are simple enough for regex)
      let code = content;
      // import { x } from "y" → const { x } = require("y")
      code = code.replace(/import\s+(\{[^}]+\})\s+from\s+["']([^"']+)["'];?\s*/g, 'const $1 = require("$2");\n');
      // export default → module.exports =
      code = code.replace(/export\s+default\s+/, "module.exports = ");

      // Create sandboxed context for execution
      const moduleExports: any = {};
      const moduleObj = { exports: moduleExports };

      const sandbox = {
        require: (id: string) => {
          if (id === "@vte-js/core" || id.endsWith("/vte-core/dist/index.js")) {
            return {
              defineTokens: (tokens: any) => tokens,
            };
          }
          throw new Error(`Cannot require "${id}" in token files`);
        },
        module: moduleObj,
        exports: moduleExports,
        console,
      };

      const script = new vm.Script(code, { filename: uri });
      const context = vm.createContext(sandbox);
      script.runInContext(context);

      const tokens = moduleObj.exports.default ?? moduleObj.exports;

      this.parseObject(tokens);
      this.resolveReferences();
      this.buildLineMap(content);
    } catch (e) {
      console.error("VTE: Failed to parse token file", e);
    }
  }

  /**
   * 递归解析对象
   */
  private parseObject(obj: any, prefix: string = ""): void {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        this.parseObject(value, path);
      } else if (typeof value === "string") {
        const refMatch = value.match(/^\{(.+)\}$/);
        if (refMatch) {
          this.tokenMap!.set(path, {
            path,
            value: "",
            raw: value,
            isColor: false,
          });
        } else {
          this.tokenMap!.set(path, {
            path,
            value,
            raw: value,
            isColor: isColorValue(value),
          });
        }
      }
    }
  }

  /**
   * 解析引用值
   */
  private resolveReferences(): void {
    for (const [, token] of this.tokenMap!) {
      if (token.raw.startsWith("{")) {
        const refPath = token.raw.slice(1, -1);
        const refToken = this.tokenMap!.get(refPath);
        if (refToken) {
          token.value = refToken.value;
          token.isColor = refToken.isColor;
        }
      }
    }
  }

  /**
   * 构建行号映射
   */
  private buildLineMap(content: string): void {
    const lines = content.split("\n");
    const pathStack: string[] = [];
    const indentStack: number[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("/*")) {
        continue;
      }

      const indent = line.length - line.trimStart().length;

      while (indentStack.length > 0 && indent <= indentStack[indentStack.length - 1]) {
        pathStack.pop();
        indentStack.pop();
      }

      const kvMatch = trimmed.match(/^(?:(\w+)|"([^"]+)")\s*:/);
      if (kvMatch) {
        const key = kvMatch[1] ?? kvMatch[2];
        const fullPath = [...pathStack, key].join(".");
        this.tokenFileLineMap!.set(fullPath, i);

        if (trimmed.includes("{") && !trimmed.includes("}")) {
          pathStack.push(key);
          indentStack.push(indent);
        }
      }
    }
  }

  /**
   * 获取 token 定义位置
   */
  getTokenDefinition(tokenPath: string): Location | null {
    if (!this.tokenFileUri || !this.tokenFileLineMap) return null;

    const line = this.tokenFileLineMap.get(tokenPath);
    if (line === undefined) return null;

    return {
      uri: this.tokenFileUri,
      range: {
        start: { line, character: 0 },
        end: { line, character: 0 },
      },
    };
  }

  /**
   * 解析文档中的样式块
   */
  parseDocumentStyles(content: string): void {
    this.styleMap = parseStyleBlock(content);
  }

  /**
   * 获取 class 的样式信息
   */
  getClassStyle(className: string): StyleInfo | undefined {
    return this.styleMap?.get(className);
  }

  /**
   * 获取所有 class 名称
   */
  getClassNames(): string[] {
    return Array.from(this.styleMap?.keys() ?? []);
  }

  /**
   * 计算编辑距离
   */
  private editDistance(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + 1,
          );
        }
      }
    }

    return dp[m][n];
  }
}
