import type { TokenMap } from "@vte/core";

/**
 * React Native 平台：输出 StyleSheet 格式
 * RN 不支持 CSS，需要转换为 JS 对象
 * 例如: padding: $semantic.spacing.medium -> padding: 8
 */
export function generateRnVars(_map: TokenMap): string {
  // RN 在 JS 层处理，不需要 CSS 变量定义
  return "";
}

export function replaceTokenRefs(
  content: string,
  map: TokenMap,
): string {
  // RN 直接内联值（数字或字符串）
  return content.replace(/\$([\w][\w.]*)/g, (match, tokenPath: string) => {
    const token = map.get(tokenPath);
    if (token) {
      // 如果是纯数字，返回数字；否则返回带引号的字符串
      const num = Number(token.value);
      if (!isNaN(num) && token.value !== "") {
        return String(num);
      }
      return `"${token.value}"`;
    }
    return match;
  });
}

export const rnPlatform = {
  name: "rn" as const,
  generateVars: generateRnVars,
  replaceRefs: replaceTokenRefs,
};
