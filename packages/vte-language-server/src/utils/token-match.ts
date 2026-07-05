/**
 * Token path matching utilities
 */

const TOKEN_REGEX = /\$((?:[\w]+|"[^"]+")(?:\.(?:[\w]+|"[^"]+"))*)/g;

export interface TokenMatch {
  /** Normalized token path (quotes removed) */
  path: string;
  /** Match start index */
  start: number;
  /** Match end index */
  end: number;
}

/**
 * Find all token references in text, handling quoted keys like "3xl"
 * Returns normalized paths with quotes stripped
 */
export function findTokenMatches(text: string): TokenMatch[] {
  const matches: TokenMatch[] = [];
  TOKEN_REGEX.lastIndex = 0;
  let match;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    const rawPath = match[1];
    const normalizedPath = rawPath.replace(/"/g, "");
    matches.push({
      path: normalizedPath,
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return matches;
}
