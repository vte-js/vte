/**
 * 定义提供器接口
 */

import type { TextDocument, Position, Location } from "../types.js";
import type { TokenManager } from "../token-manager.js";

/**
 * 定义提供器
 */
export interface DefinitionProvider {
  /**
   * 提供定义位置
   */
  provideDefinition(document: TextDocument, position: Position): Location | null;
}

/**
 * Token 定义提供器
 */
export class TokenDefinitionProvider implements DefinitionProvider {
  constructor(private tokenManager: TokenManager) {}

  provideDefinition(document: TextDocument, position: Position): Location | null {
    const line = document.lineAt(position.line);
    const text = line.text;

    // 查找 $token 格式
    const tokenRegex = /\$([\w][\w.]*)/g;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (position.character >= start && position.character <= end) {
        const tokenPath = match[1];
        return this.tokenManager.getTokenDefinition(tokenPath);
      }
    }

    return null;
  }
}
