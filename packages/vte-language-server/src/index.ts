/**
 * @vte/language-server
 *
 * IDE 无关的 Vue Token Engine 语言服务器核心
 * 提供 token 解析、补全、悬停、定义跳转等功能
 */

// 导出类型
export type {
  TokenInfo,
  Position,
  Range,
  Location,
  HoverInfo,
  CompletionItem,
  Diagnostic,
  CodeLens,
  DocumentSymbol,
  TextDocument,
  TextEditor,
  Workspace,
} from "./types.js";

export {
  CompletionItemKind,
  DiagnosticSeverity,
  SymbolKind,
} from "./types.js";

// 导出 Token 管理器
export { TokenManager } from "./token-manager.js";
export type { TokenManagerConfig } from "./token-manager.js";

// 导出提供器接口和实现
export type { HoverProvider } from "./providers/hover.js";
export { TokenHoverProvider } from "./providers/hover.js";

export type { CompletionProvider } from "./providers/completion.js";
export { TokenCompletionProvider } from "./providers/completion.js";

export type { DefinitionProvider } from "./providers/definition.js";
export { TokenDefinitionProvider } from "./providers/definition.js";

export type { DiagnosticProvider } from "./providers/diagnostic.js";
export { TokenDiagnosticProvider } from "./providers/diagnostic.js";

export type { CodeLensProvider } from "./providers/code-lens.js";
export { TokenCodeLensProvider } from "./providers/code-lens.js";

export type { DocumentSymbolProvider } from "./providers/document-symbol.js";
export { VueDocumentSymbolProvider } from "./providers/document-symbol.js";

// 导出工具函数
export {
  isColorValue,
  colorToRgba,
  generateColorSvg,
  generateColorDataUri,
} from "./utils/color.js";

export { findTokenMatches, type TokenMatch } from "./utils/token-match.js";

// 导出工作区适配器
export { createWorkspaceAdapter } from "./workspace.js";
