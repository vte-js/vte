/**
 * 查找与目标路径相似的 token 路径
 * 使用编辑距离算法提供修复建议
 */

/**
 * 计算两个字符串的编辑距离
 */
function editDistance(a: string, b: string): number {
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
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1,     // 插入
          dp[i - 1][j - 1] + 1, // 替换
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * 查找相似的 token 路径
 * @param target 目标路径（不存在的路径）
 * @param validPaths 所有合法的 token 路径
 * @param maxSuggestions 最大建议数量
 * @returns 相似的路径列表，按相似度排序
 */
export function findSimilarTokens(
  target: string,
  validPaths: string[],
  maxSuggestions: number = 3,
): string[] {
  // 计算每个合法路径与目标路径的相似度
  const scored = validPaths
    .map((path) => ({
      path,
      distance: editDistance(target, path),
      // 前缀匹配加分
      prefixBonus: target.startsWith(path.split(".").slice(0, -1).join("."))
        ? -1
        : 0,
    }))
    .sort((a, b) => (a.distance + a.prefixBonus) - (b.distance + b.prefixBonus));

  // 返回最相似的路径
  return scored
    .slice(0, maxSuggestions)
    .filter((item) => item.distance <= Math.max(target.length, 5) / 2)
    .map((item) => item.path);
}

/**
 * 格式化错误信息，包含修复建议
 */
export function formatTokenError(
  unresolvedPath: string,
  suggestions: string[],
): string {
  let message = `[VTE] Unknown token: "$${unresolvedPath}"`;

  if (suggestions.length > 0) {
    message += "\n";
    message += "   Did you mean:\n";
    for (const s of suggestions) {
      message += `     - $${s}\n`;
    }
  } else {
    message += "\n";
    message += "   This token does not exist in your design tokens.\n";
    message += "   Check your design-tokens.ts file.";
  }

  return message;
}
