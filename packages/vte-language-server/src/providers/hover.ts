/**
 * 悬停提供器接口
 */

import type { TextDocument, Position, HoverInfo } from "../types.js";
import type { TokenManager } from "../token-manager.js";

/**
 * 悬停提供器
 */
export interface HoverProvider {
  /**
   * 提供悬停信息
   */
  provideHover(document: TextDocument, position: Position): HoverInfo | null;
}

/**
 * Token 悬停提供器
 */
export class TokenHoverProvider implements HoverProvider {
  constructor(private tokenManager: TokenManager) {}

  provideHover(document: TextDocument, position: Position): HoverInfo | null {
    const line = document.lineAt(position.line);
    const text = line.text;

    // 1. 尝试匹配 $token 格式
    const tokenRegex = /\$([\w][\w.]*)/g;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (position.character >= start && position.character <= end) {
        const tokenPath = match[1];
        const token = this.tokenManager.getToken(tokenPath);

        if (token) {
          return this.createTokenHover(tokenPath, token, {
            start: { line: position.line, character: start },
            end: { line: position.line, character: end },
          });
        }
      }
    }

    // 2. 尝试匹配 class 名称
    const wordRegex = /[a-zA-Z][\w-]*/g;
    while ((match = wordRegex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (position.character >= start && position.character <= end) {
        const word = match[0];
        const style = this.tokenManager.getClassStyle(word);

        if (style) {
          return this.createClassHover(word, style, {
            start: { line: position.line, character: start },
            end: { line: position.line, character: end },
          });
        }
      }
    }

    return null;
  }

  private createTokenHover(
    tokenPath: string,
    token: { value: string; raw: string; isColor: boolean },
    range: { start: { line: number; character: number }; end: { line: number; character: number } },
  ): HoverInfo {
    let contents = `**VTE Token**\n\n`;
    contents += `- **Path:** \`$${tokenPath}\`\n`;
    contents += `- **Value:** \`${token.value}\`\n`;

    if (token.raw !== token.value) {
      contents += `- **Reference:** \`${token.raw}\`\n`;
    }

    return { contents, range };
  }

  private createClassHover(
    className: string,
    style: { selector: string; properties: Map<string, string> },
    range: { start: { line: number; character: number }; end: { line: number; character: number } },
  ): HoverInfo {
    let contents = `**CSS Class** \`.${className}\`\n\n`;

    if (style.properties.size > 0) {
      // 使用代码块包裹 CSS
      let cssCode = `.${className} {\n`;
      for (const [prop, value] of style.properties) {
        cssCode += `  ${prop}: ${value};\n`;
      }
      cssCode += `}`;

      contents += `\`\`\`css\n${cssCode}\n\`\`\`\n\n`;

      // 显示 token 链接
      contents += `**Tokens:**\n\n`;
      for (const [prop, value] of style.properties) {
        const tokenMatch = value.match(/\$([\w][\w.]*)/);
        if (tokenMatch) {
          const tokenPath = tokenMatch[1];
          const token = this.tokenManager.getToken(tokenPath);

          if (token) {
            if (token.raw !== token.value) {
              contents += `- ${prop}: \`$${tokenPath}\` → \`${token.value}\`\n`;
            } else {
              contents += `- ${prop}: \`$${tokenPath}\` = \`${token.value}\`\n`;
            }
          } else {
            contents += `- ${prop}: \`$${tokenPath}\`\n`;
          }
        }
      }
    }

    return { contents, range };
  }
}
