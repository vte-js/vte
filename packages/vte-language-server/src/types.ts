/**
 * @vte/language-server 核心类型定义
 * IDE 无关的类型，用于各种 IDE 适配器
 */

/**
 * Token 信息
 */
export interface TokenInfo {
  /** token 的值 */
  value: string;
  /** 原始值（可能是引用） */
  raw: string;
  /** 是否是颜色值 */
  isColor: boolean;
  /** token 路径 */
  path: string;
}

/**
 * 位置信息
 */
export interface Position {
  line: number;
  character: number;
}

/**
 * 范围信息
 */
export interface Range {
  start: Position;
  end: Position;
}

/**
 * 文件位置
 */
export interface Location {
  uri: string;
  range: Range;
}

/**
 * 悬停信息
 */
export interface HoverInfo {
  /** 标记内容（Markdown） */
  contents: string;
  /** 范围 */
  range: Range;
}

/**
 * 补全项
 */
export interface CompletionItem {
  /** 标签 */
  label: string;
  /** 类型 */
  kind: CompletionItemKind;
  /** 详细信息 */
  detail?: string;
  /** 文档 */
  documentation?: string;
  /** 插入文本 */
  insertText: string;
}

/**
 * 补全项类型
 */
export enum CompletionItemKind {
  Variable = 1,
  Property = 2,
  Color = 3,
  Module = 4,
}

/**
 * 诊断信息
 */
export interface Diagnostic {
  /** 范围 */
  range: Range;
  /** 消息 */
  message: string;
  /** 严重程度 */
  severity: DiagnosticSeverity;
  /** 来源 */
  source: string;
}

/**
 * 诊断严重程度
 */
export enum DiagnosticSeverity {
  Error = 1,
  Warning = 2,
  Information = 3,
  Hint = 4,
}

/**
 * Code Lens 信息
 */
export interface CodeLens {
  /** 范围 */
  range: Range;
  /** 标题 */
  title: string;
  /** 命令 */
  command?: Command;
  /** 工具提示 */
  tooltip?: string;
}

/**
 * 命令
 */
export interface Command {
  /** 命令标题 */
  title: string;
  /** 命令标识符 */
  command: string;
  /** 命令参数 */
  arguments?: any[];
}

/**
 * 文档符号
 */
export interface DocumentSymbol {
  /** 名称 */
  name: string;
  /** 详情 */
  detail?: string;
  /** 类型 */
  kind: SymbolKind;
  /** 范围 */
  range: Range;
  /** 选择范围 */
  selectionRange: Range;
  /** 子符号 */
  children?: DocumentSymbol[];
}

/**
 * 符号类型
 */
export enum SymbolKind {
  File = 1,
  Module = 2,
  Namespace = 3,
  Package = 4,
  Class = 5,
  Method = 6,
  Property = 7,
  Field = 8,
  Constructor = 9,
  Enum = 10,
  Interface = 11,
  Function = 12,
  Variable = 13,
  Constant = 14,
  String = 15,
  Number = 16,
  Boolean = 17,
  Array = 18,
  Object = 19,
  Key = 20,
  Null = 21,
}

/**
 * 文档内容
 */
export interface TextDocument {
  /** 文档 URI */
  uri: string;
  /** 语言 ID */
  languageId: string;
  /** 版本号 */
  version: number;
  /** 文本内容 */
  getText(): string;
  /** 获取某行文本 */
  lineAt(line: number): { text: string };
  /** 行数 */
  lineCount: number;
  /** 位置转偏移 */
  positionAt(offset: number): Position;
  /** 偏移转位置 */
  offsetAt(position: Position): number;
}

/**
 * 编辑器
 */
export interface TextEditor {
  /** 当前文档 */
  document: TextDocument;
  /** 选区 */
  selection: Range;
}

/**
 * 工作区
 */
export interface Workspace {
  /** 查找文件 */
  findFiles(pattern: string, exclude?: string): Promise<string[]>;
  /** 打开文档 */
  openTextDocument(uri: string): Promise<TextDocument>;
  /** 获取相对路径 */
  asRelativePath(path: string): string;
}
