/**
 * 诊断提供器接口
 */

import type { TextDocument, Diagnostic } from "../types.js";
import { DiagnosticSeverity } from "../types.js";
import type { TokenManager } from "../token-manager.js";

const TOKEN_REGEX = /\$([\w][\w.]*)/g;

/**
 * 诊断提供器
 */
export interface DiagnosticProvider {
  /**
   * 提供诊断信息
   */
  provideDiagnostics(document: TextDocument): Diagnostic[];
}

/**
 * Token 诊断提供器
 */
export class TokenDiagnosticProvider implements DiagnosticProvider {
  constructor(private tokenManager: TokenManager) {}

  provideDiagnostics(document: TextDocument): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text;

      let match;
      TOKEN_REGEX.lastIndex = 0;

      while ((match = TOKEN_REGEX.exec(text)) !== null) {
        const tokenPath = match[1];

        if (!this.tokenManager.hasToken(tokenPath)) {
          const start = match.index;
          const end = start + match[0].length;

          diagnostics.push({
            range: {
              start: { line: i, character: start },
              end: { line: i, character: end },
            },
            message: `Token "$${tokenPath}" does not exist`,
            severity: DiagnosticSeverity.Warning,
            source: "vte",
          });
        }
      }
    }

    return diagnostics;
  }
}
