/**
 * 文档符号提供器接口
 */

import type { TextDocument, DocumentSymbol } from "../types.js";
import { SymbolKind } from "../types.js";

/**
 * 文档符号提供器
 */
export interface DocumentSymbolProvider {
  /**
   * 提供文档符号
   */
  provideDocumentSymbols(document: TextDocument): DocumentSymbol[];
}

/**
 * Vue 文档符号提供器
 */
export class VueDocumentSymbolProvider implements DocumentSymbolProvider {
  provideDocumentSymbols(document: TextDocument): DocumentSymbol[] {
    const symbols: DocumentSymbol[] = [];

    // 提取 template 中的 class 名称
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text;

      const classMatch = text.match(/class\s*=\s*["']([^"']*)["']/);
      if (classMatch) {
        const classNames = classMatch[1].split(/\s+/);
        for (const cls of classNames) {
          if (cls && !cls.startsWith("$")) {
            const startIdx = text.indexOf(cls, classMatch.index);
            const range = {
              start: { line: i, character: startIdx },
              end: { line: i, character: startIdx + cls.length },
            };
            symbols.push({
              name: `.${cls}`,
              detail: "CSS class",
              kind: SymbolKind.String,
              range,
              selectionRange: range,
            });
          }
        }
      }
    }

    // 提取 <style token> 中的选择器
    let inStyleToken = false;
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text.trim();

      if (text.startsWith("<style token")) {
        inStyleToken = true;
        continue;
      }

      if (text === "</style>" && inStyleToken) {
        inStyleToken = false;
        continue;
      }

      if (inStyleToken) {
        const selectorMatch = text.match(/^\.([\w-]+)\s*\{/);
        if (selectorMatch) {
          const range = {
            start: { line: i, character: 0 },
            end: { line: i, character: text.length },
          };
          symbols.push({
            name: `.${selectorMatch[1]}`,
            detail: "CSS selector",
            kind: SymbolKind.Class,
            range,
            selectionRange: range,
          });
        }
      }
    }

    return symbols;
  }
}
