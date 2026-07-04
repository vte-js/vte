import type { TokenDefinition, TokenConfig } from "./types.js";

export interface TokenValue {
  path: string;
  value: string;
  raw: string;
  refs: string[];
}

export type TokenMap = Map<string, TokenValue>;

export async function parseTokens(sourceFile: string): Promise<TokenMap> {
  const sourceCode = require(sourceFile);
  const rawTokens = sourceCode.default ?? sourceCode;

  const tokenMap: TokenMap = new Map();
  const refGraph: Record<string, string[]> = {};

  function flatten(obj: any, prefix: string = "") {
    for (const key in obj) {
      const path = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (
        typeof value === "string" &&
        value.startsWith("{") &&
        value.endsWith("}")
      ) {
        const refPath = value.slice(1, -1);
        refGraph[path] = [refPath];
        tokenMap.set(path, {
          path,
          value: "",
          raw: value,
          refs: [refPath],
        });
      } else if (typeof value === "object" && value !== null) {
        flatten(value, path);
      } else {
        tokenMap.set(path, {
          path,
          value: String(value),
          raw: String(value),
          refs: [],
        });
      }
    }
  }

  flatten(rawTokens);

  // 循环引用检测：DFS 沿引用链遍历，发现环则抛出带路径的错误
  function detectCircularRefs() {
    const visiting = new Set<string>();
    const visited = new Set<string>();

    function dfs(node: string, chain: string[]) {
      if (visited.has(node)) return;
      if (visiting.has(node)) {
        const cycleStart = chain.indexOf(node);
        const cycle = chain.slice(cycleStart).concat(node);
        throw new Error(
          `[VTE] Circular reference detected: ${cycle.join(" → ")}`,
        );
      }

      visiting.add(node);
      chain.push(node);

      const refs = refGraph[node];
      if (refs) {
        for (const ref of refs) {
          dfs(ref, chain);
        }
      }

      chain.pop();
      visiting.delete(node);
      visited.add(node);
    }

    for (const node of Object.keys(refGraph)) {
      dfs(node, []);
    }
  }

  detectCircularRefs();

  // BFS 解析引用
  function resolveRefs() {
    let changed = true;
    const maxDepth = 10;
    let depth = 0;

    while (changed && depth < maxDepth) {
      changed = false;
      depth++;

      for (const [path, token] of tokenMap) {
        if (token.refs.length > 0 && !token.value) {
          const refPath = token.refs[0];
          const refToken = tokenMap.get(refPath);

          if (refToken?.value) {
            token.value = refToken.value;
            changed = true;
          }
        }
      }
    }

    for (const [path, token] of tokenMap) {
      if (token.refs.length > 0 && !token.value) {
        throw new Error(
          `[VTE] Unresolved reference: "${token.raw}" in token "${path}". ` +
            `Check if "${token.refs[0]}" exists.`,
        );
      }
    }
  }

  resolveRefs();

  return tokenMap;
}

export function defineTokens<T extends object>(
  tokens: TokenDefinition<T>,
): TokenConfig<T> {
  return tokens as TokenConfig<T>;
}
