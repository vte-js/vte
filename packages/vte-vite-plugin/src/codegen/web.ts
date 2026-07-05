import type { TokenMap } from "@vte-js/core";
import { toCssVarName } from "@vte-js/core";

/**
 * Web 平台：输出 CSS Variables
 * 例如: $semantic.color.primary -> var(--vte-semantic-color-primary)
 */
export function generateWebVars(map: TokenMap, cssPrefix: string = "vte"): string {
  const lines: string[] = [":root {"];
  for (const [tokenPath, token] of map) {
    const varName = toCssVarName(tokenPath, cssPrefix);
    lines.push(`  ${varName}: ${token.value};`);
  }
  lines.push("}");
  return lines.join("\n");
}

export function replaceTokenRefs(
  content: string,
  map: TokenMap,
  cssPrefix: string = "vte",
): string {
  // 匹配 $token.path 和 $token."path-with-quotes" 两种格式
  // 支持连字符：$semantic.spacing-lg, $semantic.color.primary-hover
  return content.replace(/\$([\w][\w.\-]*)(?:"([\w\-]+)")?/g, (match, tokenPath: string, quotedPart: string) => {
    // 构建完整路径（移除引号，保留连字符）
    const fullPath = quotedPart ? `${tokenPath}${quotedPart}` : tokenPath;

    // 检查直接匹配
    if (map.has(fullPath)) {
      const varName = toCssVarName(fullPath, cssPrefix);
      return `var(${varName})`;
    }

    // 尝试带连字符的路径（如 primary-hover）
    const hyphenPath = quotedPart ? `${tokenPath}-${quotedPart}` : null;
    if (hyphenPath && map.has(hyphenPath)) {
      const varName = toCssVarName(hyphenPath, cssPrefix);
      return `var(${varName})`;
    }

    return match;
  });
}

export function createWebPlatform(cssPrefix: string = "vte") {
  return {
    name: "web" as const,
    generateVars: (map: TokenMap) => generateWebVars(map, cssPrefix),
    replaceRefs: (content: string, map: TokenMap) => replaceTokenRefs(content, map, cssPrefix),
  };
}

export const webPlatform = createWebPlatform();
