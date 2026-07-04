/**
 * 补全提供器接口
 */

import type { TextDocument, Position, CompletionItem } from "../types.js";
import { CompletionItemKind } from "../types.js";
import type { TokenManager } from "../token-manager.js";

/**
 * 补全提供器
 */
export interface CompletionProvider {
  /**
   * 提供补全项
   */
  provideCompletionItems(document: TextDocument, position: Position): CompletionItem[];
}

/**
 * Token 补全提供器
 */
export class TokenCompletionProvider implements CompletionProvider {
  constructor(private tokenManager: TokenManager) {}

  provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {
    const line = document.lineAt(position.line);
    const text = line.text;
    const textBefore = text.substring(0, position.character);

    // 只在 $ 后面触发
    if (!textBefore.endsWith("$")) {
      return [];
    }

    const items: CompletionItem[] = [];
    const tokenMap = this.tokenManager.getTokenMap();

    if (tokenMap) {
      for (const [path, token] of tokenMap) {
        items.push({
          label: path,
          kind: token.isColor ? CompletionItemKind.Color : CompletionItemKind.Variable,
          detail: token.value,
          documentation: `Token value: \`${token.value}\``,
          insertText: path,
        });
      }
    }

    return items;
  }
}
