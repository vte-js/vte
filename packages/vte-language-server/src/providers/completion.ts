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
      // 收集所有 token 路径和分组
      const groups = new Map<string, string[]>();
      const leaves = new Map<string, { value: string; isColor: boolean }>();

      for (const [path, token] of tokenMap) {
        const parts = path.split(".");
        if (parts.length > 1) {
          // 有层级的 token，按父级分组
          const parentPath = parts.slice(0, -1).join(".");
          if (!groups.has(parentPath)) {
            groups.set(parentPath, []);
          }
          groups.get(parentPath)!.push(path);
        } else {
          // 顶层 token
          leaves.set(path, { value: token.value, isColor: token.isColor });
        }
      }

      // 添加顶层 token（无子项的）
      for (const [path, { value, isColor }] of leaves) {
        if (!groups.has(path)) {
          items.push({
            label: path,
            kind: isColor ? CompletionItemKind.Color : CompletionItemKind.Variable,
            detail: value,
            documentation: `Token value: \`${value}\``,
            insertText: path,
          });
        }
      }

      // 添加分组节点（有子项的父级）
      const addedGroups = new Set<string>();
      for (const [groupPath, children] of groups) {
        if (addedGroups.has(groupPath)) continue;

        // 检查是否所有子项都是叶子节点
        const allChildrenAreLeaves = children.every((child) => {
          const childParts = child.split(".");
          return childParts.length === groupPath.split(".").length + 1;
        });

        if (allChildrenAreLeaves && children.length > 0) {
          // 添加分组项
          items.push({
            label: `${groupPath}.*`,
            kind: CompletionItemKind.Module,
            detail: `${children.length} tokens`,
            documentation: `Group containing: ${children.slice(0, 5).join(", ")}${children.length > 5 ? "..." : ""}`,
            insertText: groupPath,
          });
          addedGroups.add(groupPath);
        }
      }

      // 添加剩余的非叶子 token
      for (const [path, token] of tokenMap) {
        if (!leaves.has(path) && !addedGroups.has(path)) {
          items.push({
            label: path,
            kind: token.isColor ? CompletionItemKind.Color : CompletionItemKind.Variable,
            detail: token.value,
            documentation: `Token value: \`${token.value}\``,
            insertText: path,
          });
        }
      }
    }

    return items;
  }
}
