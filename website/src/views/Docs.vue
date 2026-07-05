<template>
  <div class="page-docs">
    <div class="page-header">
      <div class="container">
        <div class="header-line"></div>
        <span class="section-badge">API Reference</span>
        <h1 class="page-title">API 文档</h1>
        <p class="page-desc">完整的 API 参考和类型定义</p>
      </div>
    </div>

    <section class="docs-content">
      <div class="container">
        <div class="docs-layout">
          <!-- 侧边栏导航 -->
          <aside class="docs-sidebar">
            <nav class="sidebar-nav">
              <div class="nav-group">
                <h4>@vte-js/core</h4>
                <a v-for="item in coreApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
              <div class="nav-group">
                <h4>@vte-js/vite-plugin</h4>
                <a v-for="item in vitePluginApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
              <div class="nav-group">
                <h4>@vte-js/compiler</h4>
                <a v-for="item in compilerApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
              <div class="nav-group">
                <h4>@vte-js/react</h4>
                <a v-for="item in reactApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
              <div class="nav-group">
                <h4>@vte-js/cli</h4>
                <a v-for="item in cliApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
              <div class="nav-group">
                <h4>@vte-js/language-server</h4>
                <a v-for="item in languageServerApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name)">{{ item.name }}</a>
              </div>
            </nav>
          </aside>

          <!-- 移动端 TOC 浮动按钮 -->
          <button class="toc-fab" @click="showToc = true" aria-label="Table of contents">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <!-- 移动端 TOC 弹窗 -->
          <div class="toc-modal" :class="{ open: showToc }">
            <div class="toc-overlay" @click="showToc = false"></div>
            <div class="toc-drawer">
              <div class="toc-header">
                <h3>导航</h3>
                <button class="toc-close" @click="showToc = false" aria-label="Close">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <nav class="toc-nav">
                <div class="nav-group">
                  <h4>@vte-js/core</h4>
                  <a v-for="item in coreApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
                <div class="nav-group">
                  <h4>@vte-js/vite-plugin</h4>
                  <a v-for="item in vitePluginApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
                <div class="nav-group">
                  <h4>@vte-js/compiler</h4>
                  <a v-for="item in compilerApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
                <div class="nav-group">
                  <h4>@vte-js/react</h4>
                  <a v-for="item in reactApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
                <div class="nav-group">
                  <h4>@vte-js/cli</h4>
                  <a v-for="item in cliApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
                <div class="nav-group">
                  <h4>@vte-js/language-server</h4>
                  <a v-for="item in languageServerApi" :key="item.name" :href="`#${item.name}`" class="nav-item" :class="{ active: activeSection === item.name }" @click.prevent="scrollTo(item.name); showToc = false">{{ item.name }}</a>
                </div>
              </nav>
            </div>
          </div>

          <!-- 主要内容 -->
          <main class="docs-main">
            <!-- @vte-js/core -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/core</h2>
              <p class="group-desc">核心解析器，提供 Token 解析、类型定义和工具函数</p>
              <div v-for="item in coreApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>

            <!-- @vte-js/vite-plugin -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/vite-plugin</h2>
              <p class="group-desc">Vite 插件，提供 &lt;style token&gt; 语法支持</p>
              <div v-for="item in vitePluginApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>

            <!-- @vte-js/compiler -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/compiler</h2>
              <p class="group-desc">编译器，生成 agent.json 和 tokens.d.ts</p>
              <div v-for="item in compilerApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>

            <!-- @vte-js/react -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/react</h2>
              <p class="group-desc">React 绑定，提供 hooks 和 Provider</p>
              <div v-for="item in reactApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>

            <!-- @vte-js/cli -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/cli</h2>
              <p class="group-desc">命令行工具，提供验证、提取、生成功能</p>
              <div v-for="item in cliApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>

            <!-- @vte-js/language-server -->
            <div class="api-group">
              <h2 class="group-title">@vte-js/language-server</h2>
              <p class="group-desc">IDE 无关的语言服务器核心</p>
              <div v-for="item in languageServerApi" :key="item.name" :id="item.name" class="api-section" :data-section="item.name">
                <ApiItem :item="item" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import ApiItem from "../components/ApiItem.vue";

const activeSection = ref("defineTokens");
const showToc = ref(false);

watch(showToc, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

// Core API
const coreApi = [
  {
    name: "defineTokens",
    badge: "Function",
    signature: "defineTokens<T>(tokens: T): TokenConfig<T>",
    description: "定义设计 token 的核心函数，提供类型安全的 token 定义",
    params: [{ name: "tokens", type: "T extends object", desc: "token 定义对象" }],
    returns: "TokenConfig<T> - 深度只读的 token 配置对象",
    example: `import { defineTokens } from "@vte-js/core";

const tokens = defineTokens({
  primitive: { blue: { 500: "#3b82f6" } },
  semantic: { color: { primary: "{primitive.blue.500}" } },
});`
  },
  {
    name: "parseTokens",
    badge: "Async",
    signature: "parseTokens(sourceFile: string): Promise<TokenMap>",
    description: "解析 token 文件，构建扁平化的 TokenMap。使用 @swc/core 进行 AST 解析",
    params: [{ name: "sourceFile", type: "string", desc: "token 文件的绝对路径" }],
    returns: "Promise<TokenMap>",
    example: `const map = await parseTokens("./design-tokens.ts");
const primary = map.get("semantic.color.primary");
console.log(primary?.value); // "#3b82f6"`
  },
  {
    name: "toCssVarName",
    badge: "Function",
    signature: "toCssVarName(tokenPath: string, prefix?: string): string",
    description: "将 token 路径转换为 CSS 变量名",
    params: [
      { name: "tokenPath", type: "string", desc: "token 路径" },
      { name: "prefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
    ],
    returns: "string",
    example: `toCssVarName("semantic.color.primary"); // "--vte-semantic-color-primary"
toCssVarName("semantic.color.primary", "my"); // "--my-semantic-color-primary"`
  },
  {
    name: "TokenMap",
    badge: "Type",
    signature: "type TokenMap = Map<string, TokenValue>",
    description: "扁平化的 Token 字典，键为点路径",
    code: `interface TokenValue {
  path: string;      // token 的点路径
  value: string;     // 解析后的值
  raw: string;       // 原始值（可能是引用）
  refs: string[];    // 引用的其他 token 路径
}`
  },
  {
    name: "TokenPath<T>",
    badge: "Type",
    signature: "type TokenPath<T> = FlattenPaths<T>",
    description: "类型工具，提取所有合法的 token 路径联合类型",
    example: `type Paths = TokenPath<typeof tokens>;
// "semantic" | "semantic.color" | "semantic.color.primary"`
  }
];

// Vite Plugin API
const vitePluginApi = [
  {
    name: "vte",
    badge: "Plugin",
    signature: "vte(options?: VtePluginOptions): Plugin",
    description: "Vite 插件主函数",
    params: [{ name: "options", type: "VtePluginOptions", desc: "配置选项" }],
    example: `import vte from "@vte-js/vite-plugin";

export default {
  plugins: [vte({ cssPrefix: "my-app", platform: "web" })],
};`
  },
  {
    name: "VtePluginOptions",
    badge: "Interface",
    signature: "interface VtePluginOptions",
    description: "插件配置选项",
    params: [
      { name: "tokenFile", type: "string", desc: "token 文件路径" },
      { name: "platform", type: '"web" | "mp" | "rn"', desc: "目标平台（默认 'web'）" },
      { name: "cssPrefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" },
      { name: "output.types", type: "boolean", desc: "生成 tokens.d.ts" },
      { name: "output.css", type: "boolean", desc: "生成 tokens.css" },
    ]
  },
  {
    name: "<style token>",
    badge: "Syntax",
    signature: "<style token [scoped] [module]>...</style>",
    description: "VTE 的 SFC 扩展语法",
    code: `<style token scoped>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
}
</style>`
  }
];

// Compiler API
const compilerApi = [
  {
    name: "compile",
    badge: "Async",
    signature: "compile(options: CompilerOptions): Promise<CompileResult>",
    description: "编译 design-tokens.ts，生成 agent.json 和 tokens.d.ts",
    params: [
      { name: "tokenFile", type: "string", desc: "token 文件路径" },
      { name: "outputDir", type: "string", desc: "输出目录" },
      { name: "prefix", type: "string", desc: "输出文件名前缀（默认 'tokens'）" },
      { name: "cssPrefix", type: "string", desc: "CSS 变量前缀（默认 'vte'）" }
    ],
    returns: "CompileResult",
    example: `const result = await compile({
  tokenFile: "./design-tokens.ts",
  outputDir: "./dist",
});`
  },
  {
    name: "CompilerOptions",
    badge: "Interface",
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
    badge: "Interface",
    signature: "interface CompileResult",
    description: "编译结果",
    params: [
      { name: "agentJson", type: "AgentJson", desc: "agent.json 内容" },
      { name: "tokensDts", type: "string", desc: "tokens.d.ts 内容" },
      { name: "agentJsonPath", type: "string", desc: "agent.json 文件路径" },
      { name: "tokensDtsPath", type: "string", desc: "tokens.d.ts 文件路径" }
    ]
  }
];

// React API
const reactApi = [
  {
    name: "TokenProvider",
    badge: "Component",
    signature: "<TokenProvider tokenMap={map} platform=\"web\">",
    description: "React 组件，提供 token 上下文给子组件",
    params: [
      { name: "tokenMap", type: "TokenMap", desc: "token 映射对象" },
      { name: "platform", type: '"web" | "mp" | "rn"', desc: "目标平台" }
    ],
    example: `<TokenProvider tokenMap={tokenMap} platform="web">
  <App />
</TokenProvider>`
  },
  {
    name: "useToken",
    badge: "Hook",
    signature: "useToken(): TokenContextValue",
    description: "获取完整的 token 上下文",
    returns: "TokenContextValue",
    example: `const { tokenMap, getTokenValue } = useToken();`
  },
  {
    name: "useTokenValue",
    badge: "Hook",
    signature: "useTokenValue(path: string, platform?: string): string | number | undefined",
    description: "获取单个 token 的值",
    params: [
      { name: "path", type: "string", desc: "token 路径" },
      { name: "platform", type: "string", desc: "目标平台" }
    ],
    example: `const color = useTokenValue("semantic.color.primary");`
  },
  {
    name: "useTokenMap",
    badge: "Hook",
    signature: "useTokenMap(): TokenMap",
    description: "获取完整的 token 映射",
    returns: "TokenMap"
  },
  {
    name: "useTokenStyle",
    badge: "Hook",
    signature: "useTokenStyle<T>(styles: T): { [K in keyof T]: string | number }",
    description: "根据 token 路径生成样式对象",
    example: `const style = useTokenStyle({
  color: "semantic.color.primary",
  padding: "semantic.spacing.md",
});`
  }
];

// CLI API
const cliApi = [
  {
    name: "validate",
    badge: "Command",
    signature: "vte validate <file>",
    description: "验证 Token 定义文件",
    params: [{ name: "file", type: "string", desc: "token 文件路径" }],
    example: `vte validate design-tokens.ts`
  },
  {
    name: "extract",
    badge: "Command",
    signature: "vte extract <file> [--json]",
    description: "提取所有 Token 路径",
    params: [
      { name: "file", type: "string", desc: "token 文件路径" },
      { name: "--json", type: "flag", desc: "输出 JSON 格式" }
    ],
    example: `vte extract design-tokens.ts`
  },
  {
    name: "generate",
    badge: "Command",
    signature: "vte generate <file> --platform <platform>",
    description: "生成多端代码",
    params: [
      { name: "file", type: "string", desc: "token 文件路径" },
      { name: "--platform", type: '"web" | "mp" | "rn"', desc: "目标平台" }
    ],
    example: `vte generate design-tokens.ts --platform web`
  }
];

// Language Server API
const languageServerApi = [
  {
    name: "TokenManager",
    badge: "Class",
    signature: "new TokenManager(config: TokenManagerConfig)",
    description: "Token 管理器，负责 token 的解析、缓存和查询",
    params: [
      { name: "tokenFile", type: "string", desc: "token 文件路径" },
      { name: "cacheTtl", type: "number", desc: "缓存有效期（毫秒，默认 30000）" }
    ],
    example: `const manager = new TokenManager({
  tokenFile: "design-tokens.ts",
});`
  },
  {
    name: "TokenManager.getTokenMap",
    badge: "Method",
    signature: "getTokenMap(): Map<string, TokenInfo> | null",
    description: "获取所有 token 的映射"
  },
  {
    name: "TokenManager.getToken",
    badge: "Method",
    signature: "getToken(path: string): TokenInfo | undefined",
    description: "获取单个 token",
    params: [{ name: "path", type: "string", desc: "token 路径" }]
  },
  {
    name: "TokenManager.getTokenPaths",
    badge: "Method",
    signature: "getTokenPaths(): string[]",
    description: "获取所有 token 路径"
  },
  {
    name: "TokenManager.findSimilarTokens",
    badge: "Method",
    signature: "findSimilarTokens(target: string, maxResults?: number): string[]",
    description: "查找与目标相似的 token（用于拼写建议）",
    params: [
      { name: "target", type: "string", desc: "目标路径" },
      { name: "maxResults", type: "number", desc: "最大返回数量" }
    ]
  },
  {
    name: "TokenHoverProvider",
    badge: "Class",
    signature: "new TokenHoverProvider(manager: TokenManager)",
    description: "悬停预览提供器，鼠标悬停时显示 token 信息",
    example: `const hover = new TokenHoverProvider(manager);
const result = hover.provideHover(document, position);`
  },
  {
    name: "TokenCompletionProvider",
    badge: "Class",
    signature: "new TokenCompletionProvider(manager: TokenManager)",
    description: "自动补全提供器，输入 $ 时触发补全",
    example: `const completion = new TokenCompletionProvider(manager);
const items = completion.provideCompletionItems(document, position);`
  },
  {
    name: "TokenDefinitionProvider",
    badge: "Class",
    signature: "new TokenDefinitionProvider(manager: TokenManager)",
    description: "定义跳转提供器，支持跳转到 token 定义位置",
    example: `const definition = new TokenDefinitionProvider(manager);
const location = definition.provideDefinition(document, position);`
  },
  {
    name: "TokenDiagnosticProvider",
    badge: "Class",
    signature: "new TokenDiagnosticProvider(manager: TokenManager)",
    description: "诊断提供器，检测未解析的 token 引用",
    example: `const diagnostic = new TokenDiagnosticProvider(manager);
const diagnostics = diagnostic.provideDiagnostics(document);`
  },
  {
    name: "TokenDocumentSymbolProvider",
    badge: "Class",
    signature: "new TokenDocumentSymbolProvider(manager: TokenManager)",
    description: "文档符号提供器，支持大纲视图",
    example: `const symbolProvider = new TokenDocumentSymbolProvider(manager);
const symbols = symbolProvider.provideDocumentSymbols(document);`
  },
  {
    name: "TokenCodeLensProvider",
    badge: "Class",
    signature: "new TokenCodeLensProvider(manager: TokenManager)",
    description: "CodeLens 提供器，显示 token 使用统计",
    example: `const codeLens = new TokenCodeLensProvider(manager);
const lenses = codeLens.provideCodeLenses(document);`
  }
];

// 所有 section ID
const allSections = computed(() => {
  return [
    ...coreApi.map(i => i.name),
    ...vitePluginApi.map(i => i.name),
    ...compilerApi.map(i => i.name),
    ...reactApi.map(i => i.name),
    ...cliApi.map(i => i.name),
    ...languageServerApi.map(i => i.name),
  ];
});

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 100;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    activeSection.value = id;
  }
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-section");
          if (id) activeSection.value = id;
        }
      });
    },
    { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
  );
  allSections.value.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.page-docs { padding-top: 80px; overflow-x: hidden; }
.page-header { padding: 80px 24px 60px; text-align: center; background: linear-gradient(180deg, color-mix(in srgb, var(--vte-primary) 10%, transparent) 0%, transparent 100%); }
.container { max-width: 1200px; margin: 0 auto; }
.header-line { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, var(--vte-primary), transparent); margin: 0 auto 24px; }
.section-badge { display: inline-block; padding: 6px 16px; background: color-mix(in srgb, var(--vte-primary) 10%, transparent); border: 1px solid color-mix(in srgb, var(--vte-primary) 30%, transparent); color: var(--vte-primary); border-radius: 100px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
.page-title { font-size: 56px; font-weight: 800; margin-bottom: 16px; color: var(--vte-text); letter-spacing: -0.02em; }
.page-desc { font-size: 20px; color: var(--vte-text-secondary); }
.docs-content { padding: 80px 24px; }
.docs-layout { display: grid; grid-template-columns: 240px 1fr; gap: 48px; }
.docs-main { min-width: 0; overflow: hidden; }
.docs-sidebar {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--vte-border) transparent;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 8px;
}
.nav-group h4 { font-size: 12px; font-weight: 600; color: var(--vte-text-secondary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
.nav-item { display: block; padding: 8px 12px; color: var(--vte-text-secondary); text-decoration: none; font-size: 14px; border-radius: 6px; transition: all 0.2s; }
.nav-item:hover { background: color-mix(in srgb, var(--vte-primary) 10%, transparent); color: var(--vte-text); }
.nav-item.active { background: color-mix(in srgb, var(--vte-primary) 15%, transparent); color: var(--vte-primary); }
.api-group { margin-bottom: 80px; padding-bottom: 60px; border-bottom: 1px solid color-mix(in srgb, var(--vte-text) 5%, transparent); min-width: 0; }
.group-title { font-size: 28px; font-weight: 700; color: var(--vte-text); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
.group-desc { font-size: 15px; color: var(--vte-text-secondary); margin-bottom: 32px; }
.api-section { margin-bottom: 48px; min-width: 0; }

.docs-sidebar::-webkit-scrollbar {
  width: 6px;
}

.docs-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.docs-sidebar::-webkit-scrollbar-thumb {
  background: var(--vte-border);
  border-radius: 3px;
}

.docs-sidebar::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

.toc-fab {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(66, 184, 131, 0.4);
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%);
  backdrop-filter: blur(12px);
  color: #42b883;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 20px rgba(66, 184, 131, 0.2),
    0 0 40px rgba(66, 184, 131, 0.1),
    inset 0 0 12px rgba(66, 184, 131, 0.1);
  z-index: 100;
  transition: all 0.3s ease;
  animation: fab-glow 3s ease-in-out infinite;
}

.toc-fab:hover {
  transform: scale(1.1);
  border-color: rgba(66, 184, 131, 0.8);
  box-shadow:
    0 0 30px rgba(66, 184, 131, 0.4),
    0 0 60px rgba(66, 184, 131, 0.2),
    inset 0 0 16px rgba(66, 184, 131, 0.15);
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.25) 0%, rgba(34, 211, 238, 0.15) 100%);
}

.toc-fab:active {
  transform: scale(0.95);
}

@keyframes fab-glow {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(66, 184, 131, 0.2),
      0 0 40px rgba(66, 184, 131, 0.1),
      inset 0 0 12px rgba(66, 184, 131, 0.1);
  }
  50% {
    box-shadow:
      0 0 28px rgba(66, 184, 131, 0.35),
      0 0 50px rgba(66, 184, 131, 0.15),
      inset 0 0 14px rgba(66, 184, 131, 0.12);
  }
}

.toc-modal {
  display: none;
}

@media (max-width: 900px) {
  .docs-layout { grid-template-columns: 1fr; }
  .docs-sidebar { position: static; display: none; }
  .toc-fab { display: flex; }

  .toc-modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .toc-modal.open {
    pointer-events: auto;
  }

  .toc-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .toc-modal.open .toc-overlay {
    opacity: 1;
  }

  .toc-drawer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 70vh;
    background: var(--vte-bg);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 0;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .toc-modal.open .toc-drawer {
    transform: translateY(0);
  }

  .toc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--vte-border);
    flex-shrink: 0;
  }

  .toc-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--vte-text);
    margin: 0;
  }

  .toc-close {
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    color: var(--vte-text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .toc-close:hover {
    background: color-mix(in srgb, var(--vte-text) 5%, transparent);
  }

  .toc-nav {
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .toc-nav .nav-group h4 {
    font-size: 11px;
    font-weight: 600;
    color: var(--vte-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .toc-nav .nav-item {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    color: var(--vte-text-secondary);
    text-decoration: none;
    font-size: 14px;
    border-radius: 8px;
    transition: all 0.2s;
    min-height: 44px;
  }

  .toc-nav .nav-item:hover,
  .toc-nav .nav-item.active {
    background: color-mix(in srgb, var(--vte-primary) 10%, transparent);
    color: var(--vte-primary);
  }
}
</style>
