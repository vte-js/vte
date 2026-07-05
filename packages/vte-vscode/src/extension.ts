/**
 * VTE VS Code Extension
 *
 * 基于 @vte/language-server 的 VS Code 适配器
 */

import * as vscode from "vscode";
import {
  TokenManager,
  TokenHoverProvider,
  TokenCompletionProvider,
  TokenDefinitionProvider,
  TokenDiagnosticProvider,
  TokenCodeLensProvider,
  createWorkspaceAdapter,
  generateColorDataUri,
  type TokenInfo,
} from "@vte/language-server";

// 全局状态
let tokenManager: TokenManager | null = null;
let hoverProvider: TokenHoverProvider | null = null;
let completionProvider: TokenCompletionProvider | null = null;
let definitionProvider: TokenDefinitionProvider | null = null;
let diagnosticProvider: TokenDiagnosticProvider | null = null;
let codeLensProvider: TokenCodeLensProvider | null = null;

let diagnosticCollection: vscode.DiagnosticCollection | null = null;
let inlineDecorationType: vscode.TextEditorDecorationType | null = null;
let colorDecorationType: vscode.TextEditorDecorationType | null = null;

const TOKEN_REGEX = /\$([\w][\w.]*)/g;

/**
 * VS Code 文档适配器
 */
class VsCodeDocumentAdapter implements import("@vte/language-server").TextDocument {
  constructor(private doc: vscode.TextDocument) {}

  get uri(): string {
    return this.doc.uri.toString();
  }

  get languageId(): string {
    return this.doc.languageId;
  }

  get version(): number {
    return this.doc.version;
  }

  getText(): string {
    return this.doc.getText();
  }

  lineAt(line: number): { text: string } {
    return this.doc.lineAt(line);
  }

  get lineCount(): number {
    return this.doc.lineCount;
  }

  positionAt(offset: number): import("@vte/language-server").Position {
    const pos = this.doc.positionAt(offset);
    return { line: pos.line, character: pos.character };
  }

  offsetAt(position: import("@vte/language-server").Position): number {
    return this.doc.offsetAt(new vscode.Position(position.line, position.character));
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("VTE extension activated");

  // 创建装饰类型（必须在 activate 开始时创建并注册）
  inlineDecorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: false,
  });
  colorDecorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: false,
    overviewRulerColor: new vscode.ThemeColor("editorOverviewRulerForeground"),
    overviewRulerLane: vscode.OverviewRulerLane.Right,
  });

  // 创建诊断集合
  diagnosticCollection = vscode.languages.createDiagnosticCollection("vte");

  // 初始化 token 管理器
  tokenManager = new TokenManager({ tokenFile: "design-tokens.ts" });
  hoverProvider = new TokenHoverProvider(tokenManager);
  completionProvider = new TokenCompletionProvider(tokenManager);
  definitionProvider = new TokenDefinitionProvider(tokenManager);
  diagnosticProvider = new TokenDiagnosticProvider(tokenManager);
  codeLensProvider = new TokenCodeLensProvider(tokenManager);

  // 加载 token 文件
  loadTokenMap();

  // 注册悬停提供器（直接在 VS Code 中构建 Markdown）
  const hoverReg = vscode.languages.registerHoverProvider(
    { language: "vue", scheme: "file" },
    {
      provideHover(document, position) {
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
            const token = tokenManager?.getToken(tokenPath);

            if (token) {
              const md = new vscode.MarkdownString();
              md.isTrusted = true;

              const pathUri = vscode.Uri.parse(
                `command:vte.goToTokenDefinition?${encodeURIComponent(JSON.stringify(tokenPath))}`,
              );

              md.appendMarkdown(`**VTE Token**\n\n`);
              md.appendMarkdown(`- **Path:** [\`$${tokenPath}\`](${pathUri})\n`);
              md.appendMarkdown(`- **Value:** \`${token.value}\`\n`);

              if (token.raw !== token.value) {
                const refPath = token.raw.replace(/[{}]/g, "");
                const refUri = vscode.Uri.parse(
                  `command:vte.goToTokenDefinition?${encodeURIComponent(JSON.stringify(refPath))}`,
                );
                md.appendMarkdown(`- **Reference:** [\`${token.raw}\`](${refUri})\n`);
              }

              const range = new vscode.Range(
                new vscode.Position(position.line, start),
                new vscode.Position(position.line, end),
              );

              return new vscode.Hover(md, range);
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
            const style = tokenManager?.getClassStyle(word);

            if (style) {
              const md = new vscode.MarkdownString();
              md.isTrusted = true;

              md.appendMarkdown(`**CSS Class** \`.${word}\`\n\n`);

              if (style.properties.size > 0) {
                // CSS 代码块
                let cssCode = `.${word} {\n`;
                for (const [prop, value] of style.properties) {
                  cssCode += `  ${prop}: ${value};\n`;
                }
                cssCode += `}`;

                md.appendMarkdown(`\`\`\`css\n${cssCode}\n\`\`\`\n\n`);

                // Token 链接
                md.appendMarkdown(`**Tokens:**\n\n`);
                for (const [prop, value] of style.properties) {
                  const tokenMatch = value.match(/\$([\w][\w.]*)/);
                  if (tokenMatch) {
                    const tokenPath = tokenMatch[1];
                    const token = tokenManager?.getToken(tokenPath);

                    if (token) {
                      const commandUri = vscode.Uri.parse(
                        `command:vte.goToTokenDefinition?${encodeURIComponent(JSON.stringify(tokenPath))}`,
                      );
                      const linkText = token.raw !== token.value
                        ? `\`$${tokenPath}\` → \`${token.value}\``
                        : `\`$${tokenPath}\` = \`${token.value}\``;

                      md.appendMarkdown(`- ${prop}: [${linkText}](${commandUri})\n`);
                    } else {
                      md.appendMarkdown(`- ${prop}: \`$${tokenPath}\`\n`);
                    }
                  }
                }
              }

              const range = new vscode.Range(
                new vscode.Position(position.line, start),
                new vscode.Position(position.line, end),
              );

              return new vscode.Hover(md, range);
            }
          }
        }

        return null;
      },
    },
  );

  // 注册补全提供器
  const completionReg = vscode.languages.registerCompletionItemProvider(
    { language: "vue", scheme: "file" },
    {
      provideCompletionItems(document, position) {
        const adapter = new VsCodeDocumentAdapter(document);
        const items = completionProvider?.provideCompletionItems(adapter, {
          line: position.line,
          character: position.character,
        });

        return (
          items?.map((item) => {
            const completionItem = new vscode.CompletionItem(
              item.label,
              item.kind as any,
            );
            completionItem.detail = item.detail;
            completionItem.documentation = item.documentation;
            completionItem.insertText = item.insertText;

            if (item.kind === 3) {
              const token = tokenManager?.getToken(item.label);
              if (token?.isColor) {
                completionItem.iconPath = vscode.Uri.parse(
                  generateColorDataUri(token.value, 16),
                );
              }
            }

            return completionItem;
          }) ?? []
        );
      },
    },
    "$",
  );

  // 注册定义提供器
  const definitionReg = vscode.languages.registerDefinitionProvider(
    { language: "vue", scheme: "file" },
    {
      provideDefinition(document, position) {
        const adapter = new VsCodeDocumentAdapter(document);
        const result = definitionProvider?.provideDefinition(adapter, {
          line: position.line,
          character: position.character,
        });

        if (result) {
          return new vscode.Location(
            vscode.Uri.parse(result.uri),
            new vscode.Range(
              new vscode.Position(result.range.start.line, result.range.start.character),
              new vscode.Position(result.range.end.line, result.range.end.character),
            ),
          );
        }

        return null;
      },
    },
  );

  // 创建工作区适配器
  const workspaceAdapter = createWorkspaceAdapter(
    async (pattern, exclude) => {
      const files = await vscode.workspace.findFiles(pattern, exclude);
      return files.map((f) => f.toString());
    },
    async (uri) => {
      const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(uri));
      return new VsCodeDocumentAdapter(doc);
    },
    (path) => vscode.workspace.asRelativePath(path),
  );

  // 注册 Code Lens 提供器
  const codeLensReg = vscode.languages.registerCodeLensProvider(
    { language: "vue", scheme: "file" },
    {
      async provideCodeLenses(document) {
        const adapter = new VsCodeDocumentAdapter(document);
        const lenses = await codeLensProvider?.provideCodeLenses(adapter, workspaceAdapter) ?? [];

        return lenses.map((lens) => {
          const range = new vscode.Range(
            new vscode.Position(lens.range.start.line, lens.range.start.character),
            new vscode.Position(lens.range.end.line, lens.range.end.character),
          );

          return new vscode.CodeLens(range, {
            title: lens.title,
            command: lens.command?.command ?? "",
            tooltip: lens.tooltip,
            arguments: lens.command?.arguments,
          });
        });
      },
    },
  );

  // 注册命令
  const goToTokenDefCmd = vscode.commands.registerCommand(
    "vte.goToTokenDefinition",
    async (tokenPath: string) => {
      const location = tokenManager?.getTokenDefinition(tokenPath);
      if (location) {
        const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(location.uri));
        await vscode.window.showTextDocument(doc, {
          selection: new vscode.Range(
            new vscode.Position(location.range.start.line, location.range.start.character),
            new vscode.Position(location.range.end.line, location.range.end.character),
          ),
        });
      }
    },
  );

  const findReferencesCmd = vscode.commands.registerCommand(
    "vte.findTokenReferences",
    async (tokenPath: string, scope: "file" | "project" = "file") => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const references: vscode.Location[] = [];
      const regex = new RegExp(`\\$${tokenPath.replace(/\./g, "\\.")}`, "g");

      if (scope === "file") {
        const text = editor.document.getText();
        let match;
        while ((match = regex.exec(text)) !== null) {
          const startPos = editor.document.positionAt(match.index);
          const endPos = editor.document.positionAt(match.index + match[0].length);
          references.push(
            new vscode.Location(editor.document.uri, new vscode.Range(startPos, endPos)),
          );
        }
      } else {
        const files = await vscode.workspace.findFiles("**/*.vue", "**/node_modules/**");
        for (const file of files) {
          const doc = await vscode.workspace.openTextDocument(file);
          const text = doc.getText();
          let match;
          while ((match = regex.exec(text)) !== null) {
            const startPos = doc.positionAt(match.index);
            const endPos = doc.positionAt(match.index + match[0].length);
            references.push(new vscode.Location(file, new vscode.Range(startPos, endPos)));
          }
        }
      }

      if (references.length > 0) {
        const quickPick = await vscode.window.showQuickPick(
          references.map((ref) => ({
            label: `$(symbol-reference) $${tokenPath}`,
            description: `${vscode.workspace.asRelativePath(ref.uri)}:${ref.range.start.line + 1}`,
            location: ref,
          })),
          {
            placeHolder: `Found ${references.length} references`,
          },
        );

        if (quickPick) {
          if (
            scope === "project" &&
            quickPick.location.uri.toString() !== editor.document.uri.toString()
          ) {
            const doc = await vscode.workspace.openTextDocument(quickPick.location.uri);
            await vscode.window.showTextDocument(doc, {
              selection: quickPick.location.range,
            });
          } else {
            editor.selection = new vscode.Selection(
              quickPick.location.range.start,
              quickPick.location.range.end,
            );
            editor.revealRange(quickPick.location.range, vscode.TextEditorRevealType.InCenter);
          }
        }
      }
    },
  );

  // 注册代码操作提供器（快速修复）
  const codeActionReg = vscode.languages.registerCodeActionsProvider(
    { language: "vue", scheme: "file" },
    {
      provideCodeActions(document, range, context) {
        const actions: vscode.CodeAction[] = [];

        // 获取光标位置的 word
        const wordRange = document.getWordRangeAtPosition(
          range.start,
          /\$[\w][\w.]*/,
        );

        if (!wordRange) return actions;

        const word = document.getText(wordRange);
        if (!word.startsWith("$")) return actions;

        const tokenPath = word.slice(1);

        // 检查诊断信息
        for (const diagnostic of context.diagnostics) {
          if (diagnostic.range.isEqual(wordRange) || diagnostic.range.contains(wordRange)) {
            // 查找相似的 token
            const suggestions = tokenManager?.findSimilarTokens(tokenPath) ?? [];

            for (const suggestion of suggestions) {
              const action = new vscode.CodeAction(
                `Replace with $${suggestion}`,
                vscode.CodeActionKind.QuickFix,
              );
              action.edit = new vscode.WorkspaceEdit();
              action.edit.replace(document.uri, wordRange, `$${suggestion}`);
              action.diagnostics = [diagnostic];
              action.isPreferred = true;
              actions.push(action);
            }

            // 添加查看所有 token 的操作
            const showAllAction = new vscode.CodeAction(
              "Show all available tokens",
              vscode.CodeActionKind.QuickFix,
            );
            showAllAction.command = {
              command: "editor.action.triggerSuggest",
              title: "Show tokens",
            };
            actions.push(showAllAction);
          }
        }

        return actions;
      },
    },
  );

  // 监听编辑器变化
  const editorWatcher = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && editor.document.languageId === "vue") {
      updateDecorations(editor);
      updateDiagnostics(editor.document);
    }
  });

  const documentWatcher = vscode.workspace.onDidChangeTextDocument((e) => {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document === e.document && e.document.languageId === "vue") {
      updateDecorations(editor);
      updateDiagnostics(e.document);
    }
  });

  // 监听编辑器可见区域变化（滚动、窗口大小变化）
  const visibleRangesWatcher = vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
    if (e.textEditor.document.languageId === "vue") {
      updateDecorations(e.textEditor);
    }
  });

  const configWatcher = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("vte")) {
      loadTokenMap();
    }
  });

  const fileWatcher = vscode.workspace.createFileSystemWatcher("**/design-tokens.ts");
  fileWatcher.onDidChange(() => loadTokenMap());
  fileWatcher.onDidCreate(() => loadTokenMap());
  fileWatcher.onDidDelete(() => loadTokenMap());

  context.subscriptions.push(
    hoverReg,
    completionReg,
    definitionReg,
    codeLensReg,
    goToTokenDefCmd,
    findReferencesCmd,
    codeActionReg,
    diagnosticCollection,
    inlineDecorationType,
    colorDecorationType,
    editorWatcher,
    documentWatcher,
    visibleRangesWatcher,
    configWatcher,
    fileWatcher,
  );

  // 在所有订阅注册完成后，延迟设置装饰
  setTimeout(() => {
    updateAllEditors();
  }, 100);

  // 周期性刷新装饰（防止被清除）
  const refreshInterval = setInterval(() => {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === "vue") {
      updateDecorations(editor);
    }
  }, 2000);

  context.subscriptions.push({
    dispose: () => clearInterval(refreshInterval),
  });
}

async function loadTokenMap() {
  const config = vscode.workspace.getConfiguration("vte");
  const tokenFile = config.get<string>("tokenFile", "design-tokens.ts");

  const files = await vscode.workspace.findFiles(`**/${tokenFile}`, "**/node_modules/**", 1);
  if (files.length === 0) return;

  const content = await vscode.workspace.fs.readFile(files[0]);
  await tokenManager?.parseTokenFile(content.toString(), files[0].toString());
  updateAllEditors();
}

function updateDecorations(editor: vscode.TextEditor) {
  if (!inlineDecorationType || !colorDecorationType || !tokenManager) return;

  const tokenMap = tokenManager.getTokenMap();
  if (!tokenMap || tokenMap.size === 0) return;

  tokenManager.parseDocumentStyles(editor.document.getText());

  const references: vscode.DecorationOptions[] = [];
  const colorDecorations: vscode.DecorationOptions[] = [];

  // CSS 颜色值正则（十六进制颜色）
  const cssColorRegex = /#[0-9a-fA-F]{3,8}/g;

  for (let i = 0; i < editor.document.lineCount; i++) {
    const line = editor.document.lineAt(i);
    const text = line.text;

    let match;
    TOKEN_REGEX.lastIndex = 0;

    while ((match = TOKEN_REGEX.exec(text)) !== null) {
      const tokenPath = match[1];
      const token = tokenManager.getToken(tokenPath);

      if (token) {
        const startPos = new vscode.Position(i, match.index);
        const endPos = new vscode.Position(i, match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        if (token.isColor) {
          references.push({
            range,
            renderOptions: {
              after: {
                contentIconPath: vscode.Uri.parse(generateColorDataUri(token.value, 12)),
                margin: "0 0 0 4px",
              },
            },
          });
        } else if (token.value && !token.value.startsWith("{")) {
          references.push({
            range,
            renderOptions: {
              after: {
                contentText: ` ${token.value}`,
                color: new vscode.ThemeColor("editorCodeLens.foreground"),
                fontStyle: "italic",
                margin: "0 0 0 4px",
              },
            },
          });
        }
      }

      // 检测 CSS 颜色值（如 #eee, #3b82f6）
      cssColorRegex.lastIndex = 0;
      let colorMatch;
      while ((colorMatch = cssColorRegex.exec(text)) !== null) {
        const color = colorMatch[0];
        const startPos = new vscode.Position(i, colorMatch.index);
        const endPos = new vscode.Position(i, colorMatch.index + colorMatch[0].length);
        const range = new vscode.Range(startPos, endPos);

        colorDecorations.push({
          range,
          renderOptions: {
            after: {
              contentIconPath: vscode.Uri.parse(generateColorDataUri(color, 12)),
              margin: "0 0 0 4px",
            },
          },
        });
      }
    }
  }

  editor.setDecorations(inlineDecorationType, references);
  editor.setDecorations(colorDecorationType, colorDecorations);
}

function updateDiagnostics(document: vscode.TextDocument) {
  if (!diagnosticProvider || !diagnosticCollection || !tokenManager) return;

  const adapter = new VsCodeDocumentAdapter(document);
  const diagnostics = diagnosticProvider.provideDiagnostics(adapter);

  // 映射严重程度（语言服务器使用 1-based，VS Code 使用 0-based）
  const severityMap: Record<number, vscode.DiagnosticSeverity> = {
    1: vscode.DiagnosticSeverity.Error,
    2: vscode.DiagnosticSeverity.Warning,
    3: vscode.DiagnosticSeverity.Information,
    4: vscode.DiagnosticSeverity.Hint,
  };

  const vscodeDiagnostics = diagnostics.map((d) => {
    const range = new vscode.Range(
      new vscode.Position(d.range.start.line, d.range.start.character),
      new vscode.Position(d.range.end.line, d.range.end.character),
    );
    return new vscode.Diagnostic(range, d.message, severityMap[d.severity] ?? vscode.DiagnosticSeverity.Warning);
  });

  diagnosticCollection.set(document.uri, vscodeDiagnostics);
}

function updateAllEditors() {
  vscode.window.visibleTextEditors.forEach((editor) => {
    if (editor.document.languageId === "vue") {
      updateDecorations(editor);
      updateDiagnostics(editor.document);
    }
  });
}

export function deactivate() {
  console.log("VTE extension deactivated");
}
