/**
 * Code Lens 提供器接口
 */

import type { TextDocument, CodeLens, Workspace } from "../types.js";
import type { TokenManager } from "../token-manager.js";

const TOKEN_REGEX = /\$([\w][\w.]*)/g;

/**
 * Code Lens 提供器
 */
export interface CodeLensProvider {
  /**
   * 提供 Code Lens
   */
  provideCodeLenses(document: TextDocument, workspace?: Workspace): Promise<CodeLens[]> | CodeLens[];
}

/**
 * Token Code Lens 提供器
 */
export class TokenCodeLensProvider implements CodeLensProvider {
  private projectUsageCache: Map<string, number> | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 30000; // 30秒缓存

  constructor(private tokenManager: TokenManager) {}

  async provideCodeLenses(document: TextDocument, workspace?: Workspace): Promise<CodeLens[]> {
    const lenses: CodeLens[] = [];

    // 统计当前文件中的 token 使用
    const fileTokenCounts = new Map<string, number>();

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text;

      let match;
      TOKEN_REGEX.lastIndex = 0;

      while ((match = TOKEN_REGEX.exec(text)) !== null) {
        const tokenPath = match[1];
        fileTokenCounts.set(tokenPath, (fileTokenCounts.get(tokenPath) || 0) + 1);
      }
    }

    // 获取项目级使用统计
    let projectTokenCounts = new Map<string, number>();
    if (workspace) {
      projectTokenCounts = await this.getProjectTokenCounts(workspace);
    }

    // 在每个 token 首次出现的位置添加 Code Lens
    const seen = new Set<string>();
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text;

      let match;
      TOKEN_REGEX.lastIndex = 0;

      while ((match = TOKEN_REGEX.exec(text)) !== null) {
        const tokenPath = match[1];

        if (!seen.has(tokenPath)) {
          seen.add(tokenPath);

          const fileCount = fileTokenCounts.get(tokenPath) || 0;
          const projectCount = projectTokenCounts.get(tokenPath) || 0;
          const range = {
            start: { line: i, character: match.index },
            end: { line: i, character: match.index + match[0].length },
          };

          // 第一个 Code Lens：当前文件使用次数
          lenses.push({
            range,
            title: `${fileCount} usage${fileCount !== 1 ? "s" : ""} in file`,
            command: {
              title: "Find references",
              command: "vte.findTokenReferences",
              arguments: [tokenPath, "file"],
            },
            tooltip: `Find references in current file`,
          });

          // 第二个 Code Lens：项目级使用次数
          if (projectCount > fileCount) {
            lenses.push({
              range,
              title: `${projectCount} usage${projectCount !== 1 ? "s" : ""} in project`,
              command: {
                title: "Find all references",
                command: "vte.findTokenReferences",
                arguments: [tokenPath, "project"],
              },
              tooltip: `Find references in entire project`,
            });
          }
        }
      }
    }

    return lenses;
  }

  /**
   * 获取项目级 token 使用统计（带缓存）
   */
  private async getProjectTokenCounts(workspace: Workspace): Promise<Map<string, number>> {
    const now = Date.now();

    // 如果缓存有效，直接返回
    if (this.projectUsageCache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.projectUsageCache;
    }

    const counts = new Map<string, number>();

    try {
      // 搜索所有 Vue 文件
      const files = await workspace.findFiles("**/*.vue", "**/node_modules/**");

      for (const file of files) {
        const document = await workspace.openTextDocument(file);

        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i);
          const text = line.text;

          let match;
          TOKEN_REGEX.lastIndex = 0;

          while ((match = TOKEN_REGEX.exec(text)) !== null) {
            const tokenPath = match[1];
            counts.set(tokenPath, (counts.get(tokenPath) || 0) + 1);
          }
        }
      }

      // 更新缓存
      this.projectUsageCache = counts;
      this.cacheTimestamp = now;
    } catch (e) {
      console.error("VTE: Failed to scan project token usage", e);
    }

    return counts;
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.projectUsageCache = null;
    this.cacheTimestamp = 0;
  }
}
