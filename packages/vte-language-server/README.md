# @vte-js/language-server

**VTE Language Server** - IDE 无关的 Vue Token Engine 语言服务器核心。

为各种 IDE（VS Code、JetBrains、Vim 等）提供统一的 token 解析、补全、悬停、定义跳转等功能。

## 架构

```
@vte-js/language-server  ← 本包（IDE 无关核心）
├── TokenManager         Token 管理器
├── Providers            各种提供器接口
│   ├── HoverProvider
│   ├── CompletionProvider
│   ├── DefinitionProvider
│   ├── DiagnosticProvider
│   ├── CodeLensProvider
│   └── DocumentSymbolProvider
└── Utils                工具函数

@vte-js/vscode           VS Code 适配器（使用本包）
@vte-js/jetbrains        JetBrains 适配器（计划中）
@vte-js/vim              Vim/Neovim 适配器（计划中）
```

## 安装

```bash
npm install @vte-js/language-server
# 或
pnpm add @vte-js/language-server
```

## API

### TokenManager

Token 管理器，负责 token 的解析、缓存和查询。

```typescript
import { TokenManager } from "@vte-js/language-server";

const manager = new TokenManager({
  tokenFile: "design-tokens.ts",
  cacheTtl: 30000,  // 缓存有效期（毫秒）
});

// 解析 token 文件
const content = fs.readFileSync("design-tokens.ts", "utf-8");
manager.parseTokenFile(content, "file:///path/to/design-tokens.ts");

// 获取 token
const token = manager.getToken("semantic.color.primary");
console.log(token);
// { path: "semantic.color.primary", value: "#3b82f6", raw: "{primitive.blue.500}", isColor: true }

// 获取所有路径
const paths = manager.getTokenPaths();
// ["primitive.blue.50", "primitive.blue.500", "semantic.color.primary", ...]

// 查找相似 token
const suggestions = manager.findSimilarTokens("semantic.colr.primary");
// ["semantic.color.primary", "semantic.color.text", ...]

// 获取定义位置
const location = manager.getTokenDefinition("semantic.color.primary");
// { uri: "file:///path/to/design-tokens.ts", range: { start: { line: 10, character: 0 }, ... } }
```

### HoverProvider

悬停提供器，提供 token 的详细信息。

```typescript
import { TokenHoverProvider } from "@vte-js/language-server";

const hoverProvider = new TokenHoverProvider(manager);

const result = hoverProvider.provideHover(document, { line: 5, character: 10 });
// { contents: "**VTE Token**\n\n- **Path:** `$semantic.color.primary`\n- **Value:** `#3b82f6`", range: ... }
```

### CompletionProvider

补全提供器，提供 token 路径的自动补全。

```typescript
import { TokenCompletionProvider } from "@vte-js/language-server";

const completionProvider = new TokenCompletionProvider(manager);

const items = completionProvider.provideCompletionItems(document, { line: 5, character: 10 });
// [{ label: "semantic.color.primary", kind: 3, detail: "#3b82f6", insertText: "semantic.color.primary" }, ...]
```

### DefinitionProvider

定义提供器，提供 token 的定义位置。

```typescript
import { TokenDefinitionProvider } from "@vte-js/language-server";

const definitionProvider = new TokenDefinitionProvider(manager);

const location = definitionProvider.provideDefinition(document, { line: 5, character: 10 });
// { uri: "file:///path/to/design-tokens.ts", range: { start: { line: 10, character: 0 }, ... } }
```

### DiagnosticProvider

诊断提供器，检测无效的 token 引用。

```typescript
import { TokenDiagnosticProvider } from "@vte-js/language-server";

const diagnosticProvider = new TokenDiagnosticProvider(manager);

const diagnostics = diagnosticProvider.provideDiagnostics(document);
// [{ range: { start: { line: 5, character: 0 }, ... }, message: 'Token "$xxx" does not exist', severity: 2 }]
```

### CodeLensProvider

Code Lens 提供器，显示 token 使用次数。

```typescript
import { TokenCodeLensProvider } from "@vte-js/language-server";

const codeLensProvider = new TokenCodeLensProvider(manager);

const lenses = codeLensProvider.provideCodeLenses(document);
// [{ range: { start: { line: 5, character: 0 }, ... }, title: "2 usages", ... }]
```

### DocumentSymbolProvider

文档符号提供器，提供大纲视图的符号。

```typescript
import { VueDocumentSymbolProvider } from "@vte-js/language-server";

const symbolProvider = new VueDocumentSymbolProvider();

const symbols = symbolProvider.provideDocumentSymbols(document);
// [{ name: ".btn", detail: "CSS class", kind: 15, range: ... }]
```

## 工具函数

### 颜色工具

```typescript
import { isColorValue, colorToRgba, generateColorSvg, generateColorDataUri } from "@vte-js/language-server";

isColorValue("#3b82f6");     // true
isColorValue("red");          // true
isColorValue("0.5rem");       // false

colorToRgba("#3b82f6");       // "rgba(59, 130, 246, 1)"
colorToRgba("red");           // "rgba(255, 0, 0, 1)"

generateColorSvg("#3b82f6", 16);  // "<svg ...>...</svg>"
generateColorDataUri("#3b82f6", 16);  // "data:image/svg+xml;base64,..."
```

## 类型定义

```typescript
import type {
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
} from "@vte-js/language-server";

import {
  CompletionItemKind,
  DiagnosticSeverity,
  SymbolKind,
} from "@vte-js/language-server";
```

## 实现自己的 IDE 适配器

### 步骤

1. **创建 Token 管理器**

```typescript
const manager = new TokenManager({ tokenFile: "design-tokens.ts" });
```

2. **实现 TextDocument 接口**

将 IDE 的文档对象适配为 `TextDocument` 接口：

```typescript
class MyDocumentAdapter implements TextDocument {
  constructor(private doc: MyIDEDocument) {}

  get uri(): string { return this.doc.getUri(); }
  get languageId(): string { return "vue"; }
  get version(): number { return this.doc.getVersion(); }
  getText(): string { return this.doc.getContent(); }
  lineAt(line: number): { text: string } { return { text: this.doc.getLine(line) }; }
  get lineCount(): number { return this.doc.getLineCount(); }
  positionAt(offset: number): Position { /* ... */ }
  offsetAt(position: Position): number { /* ... */ }
}
```

3. **使用提供器**

```typescript
const hoverProvider = new TokenHoverProvider(manager);
const completionProvider = new TokenCompletionProvider(manager);
// ...

// 在 IDE 的悬停回调中调用
function onHover(doc, position) {
  const adapter = new MyDocumentAdapter(doc);
  return hoverProvider.provideHover(adapter, position);
}
```

### 完整示例

```typescript
import {
  TokenManager,
  TokenHoverProvider,
  TokenCompletionProvider,
  TokenDefinitionProvider,
  TokenDiagnosticProvider,
} from "@vte-js/language-server";

class MyLanguageServer {
  private manager: TokenManager;
  private hoverProvider: TokenHoverProvider;
  private completionProvider: TokenCompletionProvider;
  private definitionProvider: TokenDefinitionProvider;
  private diagnosticProvider: TokenDiagnosticProvider;

  constructor() {
    this.manager = new TokenManager({ tokenFile: "design-tokens.ts" });
    this.hoverProvider = new TokenHoverProvider(this.manager);
    this.completionProvider = new TokenCompletionProvider(this.manager);
    this.definitionProvider = new TokenDefinitionProvider(this.manager);
    this.diagnosticProvider = new TokenDiagnosticProvider(this.manager);
  }

  async initialize(workspace: string) {
    const content = await readFile(`${workspace}/design-tokens.ts`);
    this.manager.parseTokenFile(content, `${workspace}/design-tokens.ts`);
  }

  onHover(doc: any, position: any) {
    const adapter = new MyDocumentAdapter(doc);
    return this.hoverProvider.provideHover(adapter, position);
  }

  onCompletion(doc: any, position: any) {
    const adapter = new MyDocumentAdapter(doc);
    return this.completionProvider.provideCompletionItems(adapter, position);
  }

  // ... 其他回调
}
```

## License

ISC
