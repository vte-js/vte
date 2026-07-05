import type { TokenMap } from "@vte-js/core";

/**
 * 小程序平台 (mp)：输出 WXSS 变量
 * 小程序不支持 CSS Variables，需要将值内联
 * 例如: $semantic.color.primary -> #3b82f6
 */
export function generateMpVars(_map: TokenMap): string {
  // 小程序不支持 :root 变量定义，返回空
  return "";
}

export function replaceTokenRefs(
  content: string,
  map: TokenMap,
): string {
  // 小程序直接内联值，不使用 CSS Variables
  return content.replace(/\$([\w][\w.]*)/g, (match, tokenPath: string) => {
    const token = map.get(tokenPath);
    if (token) {
      return token.value;
    }
    return match;
  });
}

export const mpPlatform = {
  name: "mp" as const,
  generateVars: generateMpVars,
  replaceRefs: replaceTokenRefs,
};
