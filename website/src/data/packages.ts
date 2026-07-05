export interface ApiItem {
  name: string;
  signature: string;
  description: string;
  params?: { name: string; type: string; desc: string }[];
  returns?: string;
  example?: string;
}

export interface Package {
  name: string;
  shortName: string;
  icon: string;
  desc: string;
  features: string[];
  url: string;
  npmUrl: string;
  githubUrl: string;
  install: string;
  description: string;
  highlights: string[];
  usage: string;
  apiItems?: ApiItem[];
}

export const packages: Record<string, Package> = {
  core: {
    name: "@vte-js/core",
    shortName: "core",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    desc: "核心解析器，包含 Token 解析、类型定义、工具函数。是所有其他包的基础依赖。",
    features: ["Token 解析", "类型推导", "循环引用检测", "多端支持"],
    url: "/packages/core",
    npmUrl: "https://www.npmjs.com/package/@vte-js/core",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-core",
    install: "pnpm add @vte-js/core",
    description: "VTE 的核心包，提供 Token 解析、类型定义和工具函数。所有其他包都依赖于此包。",
    highlights: [
      "使用 @swc/core 进行高性能 AST 解析",
      "完整的 TypeScript 类型支持",
      "自动检测循环引用",
      "支持三层 Token 结构",
    ],
    usage: `import { defineTokens, parseTokens } from "@vte-js/core";

// 定义 Token
const tokens = defineTokens({
  primitive: { blue: { 500: "#3b82f6" } },
  semantic: { color: { primary: "{primitive.blue.500}" } },
});

// 解析 Token 文件
const tokenMap = await parseTokens("./design-tokens.ts");`,
    apiItems: [
      {
        name: "defineTokens",
        signature: "defineTokens<T>(tokens: T): TokenConfig<T>",
        description: "定义设计 token 的核心函数，提供类型安全的 token 定义",
        params: [
          { name: "tokens", type: "T extends object", desc: "token 定义对象" }
        ],
        returns: "TokenConfig<T> - 深度只读的 token 配置对象",
        example: `const tokens = defineTokens({
  primitive: { blue: { 500: "#3b82f6" } },
  semantic: { color: { primary: "{primitive.blue.500}" } },
});`
      },
      {
        name: "parseTokens",
        signature: "parseTokens(sourceFile: string): Promise<TokenMap>",
        description: "解析 token 文件，构建扁平化的 TokenMap。使用 @swc/core 进行 AST 解析",
        params: [
          { name: "sourceFile", type: "string", desc: "token 文件的绝对路径" }
        ],
        returns: "Promise<TokenMap> - 包含所有解析后的 token",
        example: `const map = await parseTokens("./design-tokens.ts");
const primary = map.get("semantic.color.primary");
console.log(primary?.value); // "#3b82f6"`
      },
      {
        name: "toCssVarName",
        signature: "toCssVarName(tokenPath: string, prefix?: string): string",
        description: "将 token 路径转换为 CSS 变量名",
        params: [
          { name: "tokenPath", type: "string", desc: "token 路径" },
          { name: "prefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
        ],
        returns: "string - CSS 变量名",
        example: `toCssVarName("semantic.color.primary"); // "--vte-semantic-color-primary"
toCssVarName("semantic.color.primary", "my-app"); // "--my-app-semantic-color-primary"`
      }
    ],
  },
  "vite-plugin": {
    name: "@vte-js/vite-plugin",
    shortName: "vite-plugin",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    desc: "Vite 插件，提供 <style token> 语法支持，自动编译为 CSS Variables。",
    features: ["<style token>", "scoped 支持", "多平台输出", "HMR 热更新"],
    url: "/packages/vite-plugin",
    npmUrl: "https://www.npmjs.com/package/@vte-js/vite-plugin",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-vite-plugin",
    install: "pnpm add @vte-js/vite-plugin",
    description: "Vite 插件，将 <style token> 语法编译为 CSS Variables，支持 Web、小程序、React Native 多端输出。",
    highlights: [
      "自动编译 <style token> 为 CSS Variables",
      "支持 scoped 和 module 作用域",
      "支持自定义 CSS 变量前缀",
      "开发时 HMR 热更新",
    ],
    usage: `// vite.config.ts
import vte from "@vte-js/vite-plugin";

export default {
  plugins: [
    vte({
      cssPrefix: "my-app",  // 自定义前缀
      platform: "web",       // 目标平台
    }),
  ],
};`,
    apiItems: [
      {
        name: "vte",
        signature: "vte(options?: VtePluginOptions): Plugin",
        description: "Vite 插件主函数，返回 Vite Plugin 对象",
        params: [
          { name: "options", type: "VtePluginOptions", desc: "配置选项（可选）" }
        ],
        returns: "Plugin - Vite 插件对象"
      },
      {
        name: "VtePluginOptions",
        signature: "interface VtePluginOptions",
        description: "插件配置选项",
        params: [
          { name: "tokenFile", type: "string", desc: "token 文件路径（默认自动检测）" },
          { name: "platform", type: '"web" | "mp" | "rn"', desc: "目标平台（默认 'web'）" },
          { name: "cssPrefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" },
          { name: "output.types", type: "boolean", desc: "生成 tokens.d.ts（默认 true）" },
          { name: "output.css", type: "boolean", desc: "生成 tokens.css（默认 true）" },
          { name: "output.agentJson", type: "boolean", desc: "生成 tokens.agent.json（默认 true）" }
        ],
        example: `vte({
  tokenFile: "./design-tokens.ts",
  platform: "web",
  cssPrefix: "my-app",
  output: {
    types: true,
    css: true,
    agentJson: true,
  },
})`
      }
    ],
  },
  cli: {
    name: "@vte-js/cli",
    shortName: "cli",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    desc: "命令行工具，提供 validate、extract、generate 等命令。",
    features: ["Token 验证", "路径提取", "代码生成", "批量处理"],
    url: "/packages/cli",
    npmUrl: "https://www.npmjs.com/package/@vte-js/cli",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-cli",
    install: "pnpm add -D @vte-js/cli",
    description: "命令行工具，提供 Token 验证、路径提取、代码生成等功能。",
    highlights: [
      "validate: 验证 Token 定义文件",
      "extract: 提取所有 Token 路径",
      "generate: 生成多端代码",
      "支持 JSON 格式输出",
    ],
    usage: `# 验证 Token
vte validate design-tokens.ts

# 提取路径
vte extract design-tokens.ts

# 生成代码
vte generate design-tokens.ts --platform web
vte generate design-tokens.ts --platform mp
vte generate design-tokens.ts --platform rn`,
    apiItems: [
      {
        name: "validate",
        signature: "vte validate <file>",
        description: "验证 Token 定义文件，检查语法和引用是否正确",
        params: [
          { name: "file", type: "string", desc: "token 文件路径" }
        ],
        returns: "验证通过返回 0，失败返回 1",
        example: `vte validate design-tokens.ts
# ✅ Token validation passed!
#    Total tokens: 75
#    References: 23
#    Primitives: 52`
      },
      {
        name: "extract",
        signature: "vte extract <file> [--json]",
        description: "提取所有 Token 路径，支持列表或 JSON 格式输出",
        params: [
          { name: "file", type: "string", desc: "token 文件路径" },
          { name: "--json", type: "flag", desc: "输出 JSON 格式" }
        ],
        returns: "Token 路径列表或 JSON 对象",
        example: `vte extract design-tokens.ts
# 📋 Token paths (75 total):
#   semantic/
#     color.primary = #3b82f6
#     spacing.md = 1rem`
      },
      {
        name: "generate",
        signature: "vte generate <file> --platform <platform> [--output <file>]",
        description: "生成多端代码",
        params: [
          { name: "file", type: "string", desc: "token 文件路径" },
          { name: "--platform", type: '"web" | "mp" | "rn"', desc: "目标平台" },
          { name: "--output", type: "string", desc: "输出文件路径（可选）" }
        ],
        returns: "生成的代码或写入文件",
        example: `vte generate design-tokens.ts --platform web
vte generate design-tokens.ts --platform mp --output tokens.wxss`
      }
    ],
  },
  compiler: {
    name: "@vte-js/compiler",
    shortName: "compiler",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    desc: "编译器，生成 agent.json 和 tokens.d.ts 类型声明文件。",
    features: ["agent.json", "tokens.d.ts", "类型推导", "AI 友好"],
    url: "/packages/compiler",
    npmUrl: "https://www.npmjs.com/package/@vte-js/compiler",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-compiler",
    install: "pnpm add -D @vte-js/compiler",
    description: "编译器，生成 agent.json（AI 可读的 token 信息）和 tokens.d.ts（TypeScript 类型声明）。",
    highlights: [
      "生成 agent.json 供 AI 使用",
      "生成 tokens.d.ts 类型声明",
      "自动推导 Token 路径类型",
      "支持自定义输出前缀",
    ],
    usage: `import { compile } from "@vte-js/compiler";

const result = await compile({
  tokenFile: "./design-tokens.ts",
  outputDir: "./dist",
  prefix: "tokens",
});

console.log(result.agentJsonPath);  // ./dist/tokens.agent.json
console.log(result.tokensDtsPath);  // ./dist/tokens.d.ts`,
    apiItems: [
      {
        name: "compile",
        signature: "compile(options: CompilerOptions): Promise<CompileResult>",
        description: "编译 design-tokens.ts，生成 agent.json 和 tokens.d.ts",
        params: [
          { name: "tokenFile", type: "string", desc: "token 文件路径（必填）" },
          { name: "outputDir", type: "string", desc: "输出目录（必填）" },
          { name: "prefix", type: "string", desc: "输出文件名前缀（默认 'tokens'）" },
          { name: "cssPrefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
        ],
        returns: "CompileResult - 包含生成的文件路径",
        example: `const result = await compile({
  tokenFile: "./design-tokens.ts",
  outputDir: "./dist",
  prefix: "tokens",
});
// result.agentJsonPath: "./dist/tokens.agent.json"
// result.tokensDtsPath: "./dist/tokens.d.ts"`
      },
      {
        name: "CompilerOptions",
        signature: "interface CompilerOptions",
        description: "编译器配置选项",
        params: [
          { name: "tokenFile", type: "string", desc: "token 文件路径" },
          { name: "outputDir", type: "string", desc: "输出目录" },
          { name: "prefix", type: "string", desc: "输出文件名前缀" },
          { name: "cssPrefix", type: "string", desc: "CSS 变量前缀" }
        ]
      },
      {
        name: "CompileResult",
        signature: "interface CompileResult",
        description: "编译结果，包含生成的文件路径",
        params: [
          { name: "agentJson", type: "AgentJson", desc: "agent.json 内容" },
          { name: "tokensDts", type: "string", desc: "tokens.d.ts 内容" },
          { name: "agentJsonPath", type: "string", desc: "agent.json 文件路径" },
          { name: "tokensDtsPath", type: "string", desc: "tokens.d.ts 文件路径" }
        ]
      }
    ],
  },
  react: {
    name: "@vte-js/react",
    shortName: "react",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    desc: "React 绑定，提供 hooks 和 Provider，支持 React 项目使用 VTE。",
    features: ["useToken", "useTokenValue", "TokenProvider", "跨平台"],
    url: "/packages/react",
    npmUrl: "https://www.npmjs.com/package/@vte-js/react",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-react",
    install: "pnpm add @vte-js/react",
    description: "React 绑定，提供 TokenProvider 组件和 hooks，让 React 项目也能使用 VTE 的 token 系统。",
    highlights: [
      "TokenProvider 提供全局 token 上下文",
      "useToken 获取完整 token 上下文",
      "useTokenValue 获取单个 token 值",
      "useTokenStyle 生成样式对象",
    ],
    usage: `import { TokenProvider, useTokenValue } from "@vte-js/react";

function App() {
  return (
    <TokenProvider tokenMap={tokenMap} platform="web">
      <MyComponent />
    </TokenProvider>
  );
}

function MyComponent() {
  const color = useTokenValue("semantic.color.primary");
  return <div style={{ color }}>Hello</div>;
}`,
    apiItems: [
      {
        name: "TokenProvider",
        signature: "<TokenProvider tokenMap={map} platform=\"web\">",
        description: "React 组件，提供 token 上下文给子组件",
        params: [
          { name: "tokenMap", type: "TokenMap", desc: "token 映射对象（必填）" },
          { name: "platform", type: '"web" | "mp" | "rn"', desc: "目标平台（默认 'web'）" }
        ],
        example: `<TokenProvider tokenMap={tokenMap} platform="web">
  <App />
</TokenProvider>`
      },
      {
        name: "useToken",
        signature: "useToken(): TokenContextValue",
        description: "获取完整的 token 上下文，包括 tokenMap、platform、getToken、getTokenValue",
        returns: "TokenContextValue - token 上下文对象",
        example: `const { tokenMap, getTokenValue } = useToken();
const color = getTokenValue("semantic.color.primary");`
      },
      {
        name: "useTokenValue",
        signature: "useTokenValue(path: string, platform?: string): string | number | undefined",
        description: "获取单个 token 的值",
        params: [
          { name: "path", type: "string", desc: "token 路径" },
          { name: "platform", type: "string", desc: "目标平台（可选）" }
        ],
        returns: "string | number | undefined - token 的值",
        example: `const color = useTokenValue("semantic.color.primary");
const spacing = useTokenValue("semantic.spacing.md", "mp");`
      },
      {
        name: "useTokenMap",
        signature: "useTokenMap(): TokenMap",
        description: "获取完整的 token 映射",
        returns: "TokenMap - token 映射对象"
      },
      {
        name: "useTokenStyle",
        signature: "useTokenStyle<T>(styles: T): { [K in keyof T]: string | number }",
        description: "根据 token 路径生成样式对象",
        params: [
          { name: "styles", type: "T", desc: "样式映射，值为 token 路径" }
        ],
        returns: "样式对象",
        example: `const style = useTokenStyle({
  color: "semantic.color.primary",
  padding: "semantic.spacing.md",
});`
      }
    ],
  },
  playground: {
    name: "@vte-js/playground",
    shortName: "playground",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>`,
    desc: "可视化调试工具，实时预览所有 token 值，支持导出。",
    features: ["实时预览", "暗黑模式", "代码导出", "Token 搜索"],
    url: "/packages/playground",
    npmUrl: "https://www.npmjs.com/package/@vte-js/playground",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-playground",
    install: "pnpm add -D @vte-js/playground",
    description: "可视化调试工具，实时预览所有 token 值，支持暗黑模式、代码导出和 Token 搜索。",
    highlights: [
      "实时预览所有 token 值",
      "支持暗黑模式切换",
      "一键导出 JSON/CSS/SCSS/JS",
      "Token 搜索和自动补全",
    ],
    usage: `# 启动 Playground
npx @vte-js/playground start

# 或指定 token 文件
npx @vte-js/playground start ./design-tokens.ts

# 仅生成文件
npx @vte-js/playground generate`,
    apiItems: [
      {
        name: "start",
        signature: "vte-playground start [file] [--output <dir>] [--prefix <prefix>]",
        description: "生成并启动 Playground",
        params: [
          { name: "file", type: "string", desc: "token 文件路径（默认 'design-tokens.ts'）" },
          { name: "--output", type: "string", desc: "输出目录（默认 '.vte-playground'）" },
          { name: "--prefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
        ],
        example: `vte-playground start
vte-playground start ./my-tokens.ts -p my-app`
      },
      {
        name: "generate",
        signature: "vte-playground generate [file] [--output <dir>] [--prefix <prefix>]",
        description: "仅生成 Playground 文件，不启动服务",
        params: [
          { name: "file", type: "string", desc: "token 文件路径（默认 'design-tokens.ts'）" },
          { name: "--output", type: "string", desc: "输出目录（默认 '.vte-playground'）" },
          { name: "--prefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
        ],
        example: `vte-playground generate
vte-playground generate ./my-tokens.ts -o ./playground`
      }
    ],
  },
  "language-server": {
    name: "@vte-js/language-server",
    shortName: "language-server",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    desc: "IDE 无关的语言服务器核心，支持多种 IDE 接入。",
    features: ["语法高亮", "自动补全", "跳转定义", "诊断警告"],
    url: "/packages/language-server",
    npmUrl: "https://www.npmjs.com/package/@vte-js/language-server",
    githubUrl: "https://github.com/vte-js/vte/tree/main/packages/vte-language-server",
    install: "pnpm add -D @vte-js/language-server",
    description: "IDE 无关的语言服务器核心，提供 token 解析、补全、悬停、定义跳转等功能，支持 VS Code、JetBrains 等 IDE。",
    highlights: [
      "Token 管理和解析",
      "自动补全和悬停预览",
      "定义跳转和引用查找",
      "诊断警告和快速修复",
    ],
    usage: `import { TokenManager, TokenHoverProvider } from "@vte-js/language-server";

const manager = new TokenManager({
  tokenFile: "design-tokens.ts",
});

const hover = new TokenHoverProvider(manager);
const result = hover.provideHover(document, position);`,
    apiItems: [
      {
        name: "TokenManager",
        signature: "new TokenManager(config: TokenManagerConfig)",
        description: "Token 管理器，负责 token 的解析、缓存和查询",
        params: [
          { name: "tokenFile", type: "string", desc: "token 文件路径" },
          { name: "cacheTtl", type: "number", desc: "缓存有效期（毫秒，默认 30000）" }
        ],
        example: `const manager = new TokenManager({
  tokenFile: "design-tokens.ts",
  cacheTtl: 60000,
});`
      },
      {
        name: "TokenManager.getTokenMap",
        signature: "getTokenMap(): Map<string, TokenInfo> | null",
        description: "获取所有 token 的映射",
        returns: "Map<string, TokenInfo> | null"
      },
      {
        name: "TokenManager.getToken",
        signature: "getToken(path: string): TokenInfo | undefined",
        description: "获取单个 token",
        params: [
          { name: "path", type: "string", desc: "token 路径" }
        ],
        returns: "TokenInfo | undefined"
      },
      {
        name: "TokenManager.getTokenPaths",
        signature: "getTokenPaths(): string[]",
        description: "获取所有 token 路径",
        returns: "string[] - token 路径数组"
      },
      {
        name: "TokenManager.findSimilarTokens",
        signature: "findSimilarTokens(target: string, maxResults?: number): string[]",
        description: "查找与目标相似的 token（用于拼写建议）",
        params: [
          { name: "target", type: "string", desc: "目标路径" },
          { name: "maxResults", type: "number", desc: "最大返回数量（默认 3）" }
        ],
        returns: "string[] - 相似的 token 路径"
      },
      {
        name: "TokenHoverProvider",
        signature: "new TokenHoverProvider(manager: TokenManager)",
        description: "悬停预览提供器，鼠标悬停时显示 token 信息",
        params: [
          { name: "manager", type: "TokenManager", desc: "token 管理器实例" }
        ],
        example: `const hover = new TokenHoverProvider(manager);
const result = hover.provideHover(document, position);`
      },
      {
        name: "TokenCompletionProvider",
        signature: "new TokenCompletionProvider(manager: TokenManager)",
        description: "自动补全提供器，输入 $ 时触发补全",
        params: [
          { name: "manager", type: "TokenManager", desc: "token 管理器实例" }
        ]
      },
      {
        name: "TokenDefinitionProvider",
        signature: "new TokenDefinitionProvider(manager: TokenManager)",
        definition: "定义跳转提供器，支持跳转到 token 定义位置",
        params: [
          { name: "manager", type: "TokenManager", desc: "token 管理器实例" }
        ]
      }
    ],
  },
};
