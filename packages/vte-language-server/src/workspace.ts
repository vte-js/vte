/**
 * 工作区接口
 */

import type { TextDocument, Workspace } from "./types.js";

/**
 * 创建工作区适配器
 */
export function createWorkspaceAdapter(
  findFiles: (pattern: string, exclude?: string) => Promise<string[]>,
  openTextDocument: (uri: string) => Promise<TextDocument>,
  asRelativePath: (path: string) => string,
): Workspace {
  return {
    findFiles,
    openTextDocument,
    asRelativePath,
  };
}
