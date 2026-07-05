import { transformFile } from "@swc/core";
import vm from "vm";
import fs from "fs";
import path from "path";
import type { TokenDefinition, TokenConfig } from "./types.js";

export interface TokenValue {
  path: string;
  value: string;
  raw: string;
  refs: string[];
}

export type TokenMap = Map<string, TokenValue>;

/**
 * Convert a token path to a CSS variable name.
 * @example toCssVarName("semantic.color.primary") => "--vte-semantic-color-primary"
 * @example toCssVarName("semantic.color.primary", "my") => "--my-semantic-color-primary"
 */
export function toCssVarName(tokenPath: string, prefix: string = "vte"): string {
  return `--${prefix}-${tokenPath.replace(/\./g, "-")}`;
}

/**
 * Load and evaluate a token file using @swc/core for AST transformation.
 * This replaces the unsafe require() approach with proper TS parsing.
 */
async function loadTokenFile(sourceFile: string): Promise<any> {
  const resolvedPath = path.resolve(sourceFile);

  const result = await transformFile(resolvedPath, {
    jsc: {
      parser: {
        syntax: "typescript",
        decorators: true,
      },
      target: "es2020",
    },
    module: {
      type: "commonjs",
    },
    isModule: true,
  });

  const transpiledCode = result.code;

  // Create a sandboxed context with require and module exports
  const moduleExports: any = {};
  const moduleObj = { exports: moduleExports };

  const sandbox = {
    require: (id: string) => {
      // Allow @vte-js/core for defineTokens
      if (id === "@vte-js/core" || id.endsWith("/vte-core/dist/index.js")) {
        return {
          defineTokens: (tokens: any) => tokens,
        };
      }
      // Allow node built-in modules
      if (id === "path" || id === "fs" || id === "os") {
        return require(id);
      }
      throw new Error(`[VTE] Cannot require "${id}" in token files`);
    },
    module: moduleObj,
    exports: moduleExports,
    console,
    setTimeout,
    setInterval,
    clearTimeout,
    clearInterval,
  };

  // Execute the transpiled code in sandbox
  const script = new vm.Script(transpiledCode, {
    filename: resolvedPath,
  });

  const context = vm.createContext(sandbox);
  script.runInContext(context);

  // Get the exported value (handle both default and named exports)
  const rawTokens = moduleObj.exports.default ?? moduleObj.exports;

  return rawTokens;
}

export async function parseTokens(sourceFile: string): Promise<TokenMap> {
  const rawTokens = await loadTokenFile(sourceFile);

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
