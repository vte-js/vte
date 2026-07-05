/**
 * 诊断提供器接口
 */

import type { TextDocument, Diagnostic } from "../types.js";
import { DiagnosticSeverity } from "../types.js";
import type { TokenManager } from "../token-manager.js";
import { findTokenMatches } from "../utils/token-match.js";

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

      for (const match of findTokenMatches(text)) {
        if (!this.tokenManager.hasToken(match.path)) {
          diagnostics.push({
            range: {
              start: { line: i, character: match.start },
              end: { line: i, character: match.end },
            },
            message: `Token "$${match.path}" does not exist`,
            severity: DiagnosticSeverity.Warning,
            source: "vte",
          });
        }
      }
    }

    return diagnostics;
  }
}
