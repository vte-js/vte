import type { TokenMap } from "@vte/core";

/**
 * Web 平台：输出 CSS Variables
 * 例如: $semantic.color.primary -> var(--vte-semantic-color-primary)
 */
export function generateWebVars(map: TokenMap): string {
  const lines: string[] = [":root {"];
  for (const [tokenPath, token] of map) {
    const varName = `--vte-${tokenPath.replace(/\./g, "-")}`;
    lines.push(`  ${varName}: ${token.value};`);
  }
  lines.push("}");
  return lines.join("\n");
}

export function replaceTokenRefs(
  content: string,
  map: TokenMap,
): string {
  return content.replace(/\$([\w][\w.]*)/g, (match, tokenPath: string) => {
    if (map.has(tokenPath)) {
      const varName = `--vte-${tokenPath.replace(/\./g, "-")}`;
      return `var(${varName})`;
    }
    return match;
  });
}

export const webPlatform = {
  name: "web" as const,
  generateVars: generateWebVars,
  replaceRefs: replaceTokenRefs,
};
