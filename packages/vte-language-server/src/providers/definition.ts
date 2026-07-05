/**
 * 定义提供器接口
 */

import type { TextDocument, Position, Location } from "../types.js";
import type { TokenManager } from "../token-manager.js";
import { findTokenMatches } from "../utils/token-match.js";

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

    for (const match of findTokenMatches(text)) {
      if (position.character >= match.start && position.character <= match.end) {
        return this.tokenManager.getTokenDefinition(match.path);
      }
    }

    return null;
  }
}
