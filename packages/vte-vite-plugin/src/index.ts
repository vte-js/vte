import type { Plugin, ViteDevServer } from "vite";
import type { ResolvedConfig } from "vite";
import { parse } from "@vue/compiler-sfc";
import path from "path";
import fs from "fs";
import MagicString from "magic-string";
import { parseTokens, type TokenMap } from "@vte/core";
import {
  type Platform,
  type PlatformAdapter,
  getPlatformAdapter,
} from "./codegen/index.js";
import { findSimilarTokens, formatTokenError } from "./similar.js";

export interface VtePluginOptions {
  tokenFile?: string;
  platform?: Platform;
}

export default function vtePlugin(options: VtePluginOptions = {}): Plugin {
  const platform: Platform = options.platform ?? "web";
  let adapter: PlatformAdapter;

  let config: ResolvedConfig;
  let tokenMap: TokenMap | null = null;
  let cssVarBlock: string | null = null;
  let tokenFilePath: string | null = null;
  let server: ViteDevServer | null = null;

  function getTokenFilePath(root: string): string {
    if (options.tokenFile) {
      return path.resolve(root, options.tokenFile);
    }
    const candidates = [
      "design-tokens.ts",
      "tokens.ts",
      "src/design-tokens.ts",
      "src/tokens.ts",
    ];
    for (const candidate of candidates) {
      const p = path.resolve(root, candidate);
      if (fs.existsSync(p)) return p;
    }
    throw new Error(
      "[VTE] Cannot find design tokens file. " +
        `Looked for: ${candidates.join(", ")}. ` +
        "Set tokenFile option to specify custom path.",
    );
  }

  async function loadTokenMap(root: string): Promise<TokenMap> {
    const filePath = getTokenFilePath(root);
    tokenFilePath = filePath;
    tokenMap = await parseTokens(filePath);
    cssVarBlock = adapter.generateVars(tokenMap);
    return tokenMap;
  }

  async function reloadTokenMap(): Promise<void> {
    if (!config) return;
    try {
      await loadTokenMap(config.root);
      console.log(`[VTE] Token map reloaded (platform: ${platform})`);

      if (server) {
        server.ws.send({ type: "full-reload" });
      }
    } catch (e) {
      console.error("[VTE] Failed to reload token map:", e);
    }
  }

  return {
    name: "@vte/vite-plugin",
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      adapter = getPlatformAdapter(platform);
      console.log(`[VTE] Platform: ${platform}`);
    },

    configureServer(_server) {
      server = _server;

      _server.watcher.on("change", (file) => {
        if (tokenFilePath && path.resolve(file) === tokenFilePath) {
          console.log("[VTE] Token file changed, reloading...");
          reloadTokenMap();
        }
      });
    },

    async transform(code, id) {
      if (!id.endsWith(".vue")) return null;

      const { descriptor, errors } = parse(code, {
        filename: id,
        sourceMap: true,
      });

      if (errors.length > 0) {
        for (const err of errors) {
          console.error("[VTE] SFC parse error:", err);
        }
        return null;
      }

      const tokenStyles = descriptor.styles.filter(
        (s) => "token" in s.attrs || s.lang === "token",
      );

      if (tokenStyles.length === 0) return null;

      const map = await loadTokenMap(config.root);
      if (!adapter) return null;

      const s = new MagicString(code);

      // 收集所有合法的 token 路径，用于查找相似路径
      const validPaths = Array.from(map.keys());

      for (const styleBlock of tokenStyles) {
        const contentStart = styleBlock.loc.start.offset;
        const contentEnd = styleBlock.loc.end.offset;
        const replaced = adapter.replaceRefs(styleBlock.content, map);
        s.update(contentStart, contentEnd, replaced);

        // 检查未解析的 token 引用并发出警告
        const unresolvedTokens = findUnresolvedTokens(styleBlock.content, map);
        for (const token of unresolvedTokens) {
          const suggestions = findSimilarTokens(token, validPaths);
          const message = formatTokenError(token, suggestions);
          this.warn(message);
        }

        // 处理 <style token scoped> -> <style scoped>
        // 向前搜索找到 <style 开始标签的位置
        if (styleBlock.attrs.scoped !== undefined) {
          const beforeContent = code.substring(0, contentStart);
          const styleTagStart = beforeContent.lastIndexOf("<style");
          if (styleTagStart !== -1) {
            const originalTag = code.substring(styleTagStart, contentStart);
            // 替换整个开始标签：<style token ...> -> <style scoped ...>
            const scopedTag = originalTag.replace(
              /<style\s+token([^>]*)>/,
              (_match, attrs: string) => {
                // 移除 token 和 scoped 属性，然后添加 scoped
                const cleanedAttrs = attrs
                  .replace(/\btoken\b/, "")
                  .replace(/\bscoped\b/, "")
                  .replace(/\s+/g, " ")
                  .trim();
                return `<style scoped${cleanedAttrs ? " " + cleanedAttrs : ""}>`;
              },
            );
            s.update(styleTagStart, contentStart, scopedTag);
          }
        }
      }

      // 注入变量定义（web 平台为 :root 块，其他平台为空）
      if (cssVarBlock) {
        const cssVarStyle = `\n<style>\n${cssVarBlock}\n</style>`;
        const lastStyleEnd = code.lastIndexOf("</style>");
        if (lastStyleEnd !== -1) {
          const insertPos = lastStyleEnd + "</style>".length;
          s.appendLeft(insertPos, cssVarStyle);
        } else {
          s.append(cssVarStyle);
        }
      }

      return {
        code: s.toString(),
        map: s.generateMap({
          source: id,
          includeContent: true,
          hires: true,
        }),
      };
    },
  };
}

/**
 * 查找内容中未解析的 token 引用
 */
function findUnresolvedTokens(content: string, map: TokenMap): string[] {
  const unresolved: string[] = [];
  const regex = /\$([\w][\w.]*)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const tokenPath = match[1];
    if (!map.has(tokenPath)) {
      // 去重
      if (!unresolved.includes(tokenPath)) {
        unresolved.push(tokenPath);
      }
    }
  }

  return unresolved;
}
