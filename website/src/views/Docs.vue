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
                <h4>核心</h4>
                <a href="#defineTokens" class="nav-item" :class="{ active: activeSection === 'defineTokens' }" @click.prevent="scrollTo('defineTokens')">defineTokens</a>
                <a href="#parseTokens" class="nav-item" :class="{ active: activeSection === 'parseTokens' }" @click.prevent="scrollTo('parseTokens')">parseTokens</a>
                <a href="#TokenMap" class="nav-item" :class="{ active: activeSection === 'TokenMap' }" @click.prevent="scrollTo('TokenMap')">TokenMap</a>
              </div>
              <div class="nav-group">
                <h4>类型</h4>
                <a href="#TokenPath" class="nav-item" :class="{ active: activeSection === 'TokenPath' }" @click.prevent="scrollTo('TokenPath')">TokenPath</a>
                <a href="#TokenRef" class="nav-item" :class="{ active: activeSection === 'TokenRef' }" @click.prevent="scrollTo('TokenRef')">TokenRef</a>
                <a href="#TokenValue" class="nav-item" :class="{ active: activeSection === 'TokenValue' }" @click.prevent="scrollTo('TokenValue')">TokenValue</a>
              </div>
              <div class="nav-group">
                <h4>Vite 插件</h4>
                <a href="#vte-plugin" class="nav-item" :class="{ active: activeSection === 'vte-plugin' }" @click.prevent="scrollTo('vte-plugin')">VtePlugin</a>
                <a href="#style-token" class="nav-item" :class="{ active: activeSection === 'style-token' }" @click.prevent="scrollTo('style-token')">&lt;style token&gt;</a>
              </div>
              <div class="nav-group">
                <h4>React</h4>
                <a href="#TokenProvider" class="nav-item" :class="{ active: activeSection === 'TokenProvider' }" @click.prevent="scrollTo('TokenProvider')">TokenProvider</a>
                <a href="#useToken" class="nav-item" :class="{ active: activeSection === 'useToken' }" @click.prevent="scrollTo('useToken')">useToken</a>
              </div>
            </nav>
          </aside>

          <!-- 主要内容 -->
          <main class="docs-main">
            <!-- defineTokens -->
            <div id="defineTokens" class="api-section" data-section="defineTokens">
              <div class="api-header">
                <span class="api-badge function">Function</span>
                <h2>defineTokens</h2>
                <code class="api-signature">defineTokens&lt;T&gt;(tokens: T): TokenConfig&lt;T&gt;</code>
              </div>
              <div class="api-body">
                <p>定义设计 token 的核心函数。提供类型安全的 token 定义，支持三层结构（Primitive → Semantic → Component）。</p>
                <h3>参数</h3>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">tokens</div>
                    <div class="param-type">T extends object</div>
                    <div class="param-desc">token 定义对象</div>
                  </div>
                </div>
                <h3>返回值</h3>
                <p>返回深度只读的 token 配置对象 <code>TokenConfig&lt;T&gt;</code></p>
                <h3>示例</h3>
                <CodeBlock label="design-tokens.ts" :code="defineTokensExample" />
                <h3>类型推导</h3>
                <CodeBlock label="类型定义" :code="typeExample" />
              </div>
            </div>

            <!-- parseTokens -->
            <div id="parseTokens" class="api-section" data-section="parseTokens">
              <div class="api-header">
                <span class="api-badge async">Async</span>
                <h2>parseTokens</h2>
                <code class="api-signature">parseTokens(sourceFile: string): Promise&lt;TokenMap&gt;</code>
              </div>
              <div class="api-body">
                <p>解析 token 文件，构建扁平化的 TokenMap。使用 @swc/core 进行 AST 解析，支持 TypeScript。</p>
                <h3>参数</h3>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">sourceFile</div>
                    <div class="param-type">string</div>
                    <div class="param-desc">token 文件的绝对路径</div>
                  </div>
                </div>
                <h3>返回值</h3>
                <p>返回 <code>Promise&lt;TokenMap&gt;</code>，包含所有解析后的 token。</p>
                <h3>异常</h3>
                <ul class="exception-list">
                  <li><code>Circular reference detected</code> - 检测到循环引用</li>
                  <li><code>Unresolved reference</code> - 引用了不存在的 token</li>
                </ul>
                <h3>示例</h3>
                <CodeBlock label="使用示例" :code="parseTokensExample" />
              </div>
            </div>

            <!-- TokenMap -->
            <div id="TokenMap" class="api-section" data-section="TokenMap">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenMap</h2>
                <code class="api-signature">type TokenMap = Map&lt;string, TokenValue&gt;</code>
              </div>
              <div class="api-body">
                <p>扁平化的 Token 字典，键为点路径（如 <code>semantic.color.primary</code>）。</p>
                <h3>TokenValue 结构</h3>
                <CodeBlock label="TokenValue" :code="tokenValueExample" />
              </div>
            </div>

            <!-- TokenPath -->
            <div id="TokenPath" class="api-section" data-section="TokenPath">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenPath&lt;T&gt;</h2>
                <code class="api-signature">type TokenPath&lt;T&gt; = FlattenPaths&lt;T&gt;</code>
              </div>
              <div class="api-body">
                <p>类型工具，从 token 定义中提取所有合法的点路径联合类型。用于 IDE 自动补全和类型检查。</p>
                <h3>示例</h3>
                <CodeBlock label="类型推导" :code="tokenPathExample" />
              </div>
            </div>

            <!-- TokenRef -->
            <div id="TokenRef" class="api-section" data-section="TokenRef">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenRef&lt;P&gt;</h2>
                <code class="api-signature">type TokenRef&lt;P extends string&gt; = \`{${P}}\`</code>
              </div>
              <div class="api-body">
                <p>Token 引用类型，表示对其他 token 的引用。</p>
                <h3>示例</h3>
                <CodeBlock label="引用语法" :code="tokenRefExample" />
              </div>
            </div>

            <!-- TokenValue -->
            <div id="TokenValue" class="api-section" data-section="TokenValue">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenValue</h2>
                <code class="api-signature">type TokenValue = string | number</code>
              </div>
              <div class="api-body">
                <p>Token 值的类型，可以是字符串或数字。</p>
              </div>
            </div>

            <!-- Vite Plugin -->
            <div id="vte-plugin" class="api-section" data-section="vte-plugin">
              <div class="api-header">
                <span class="api-badge plugin">Plugin</span>
                <h2>Vite Plugin</h2>
                <code class="api-signature">vte(options?: VtePluginOptions): Plugin</code>
              </div>
              <div class="api-body">
                <p>Vite 插件，提供 <code>&lt;style token&gt;</code> 语法支持。</p>
                <h3>配置选项</h3>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">tokenFile</div>
                    <div class="param-type">string</div>
                    <div class="param-desc">token 文件路径（默认自动检测）</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">platform</div>
                    <div class="param-type">"web" | "mp" | "rn"</div>
                    <div class="param-desc">目标平台（默认 "web"）</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">cssPrefix</div>
                    <div class="param-type">string</div>
                    <div class="param-desc">CSS 变量前缀（默认 "vte"）</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">output.types</div>
                    <div class="param-type">boolean</div>
                    <div class="param-desc">生成 tokens.d.ts（默认 true）</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">output.css</div>
                    <div class="param-type">boolean</div>
                    <div class="param-desc">生成 tokens.css（默认 true）</div>
                  </div>
                </div>
                <h3>示例</h3>
                <CodeBlock label="vite.config.ts" :code="vitePluginExample" />
              </div>
            </div>

            <!-- style token -->
            <div id="style-token" class="api-section" data-section="style-token">
              <div class="api-header">
                <span class="api-badge syntax">Syntax</span>
                <h2>&lt;style token&gt;</h2>
                <code class="api-signature">&lt;style token [scoped]&gt;...&lt;/style&gt;</code>
              </div>
              <div class="api-body">
                <p>VTE 的 SFC 扩展语法，用于在 Vue 组件中引用 design token。</p>
                <h3>属性</h3>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">token</div>
                    <div class="param-type">必填</div>
                    <div class="param-desc">启用 VTE token 编译</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">scoped</div>
                    <div class="param-type">可选</div>
                    <div class="param-desc">启用作用域隔离</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">module</div>
                    <div class="param-type">可选</div>
                    <div class="param-desc">启用 CSS Modules</div>
                  </div>
                </div>
                <h3>示例</h3>
                <CodeBlock label="Vue SFC" :code="styleTokenExample" />
                <h3>编译输出</h3>
                <CodeBlock label="CSS" :code="styleTokenOutput" />
              </div>
            </div>

            <!-- TokenProvider -->
            <div id="TokenProvider" class="api-section" data-section="TokenProvider">
              <div class="api-header">
                <span class="api-badge component">Component</span>
                <h2>TokenProvider</h2>
                <code class="api-signature">&lt;TokenProvider :tokenMap="map" :platform="web"&gt;</code>
              </div>
              <div class="api-body">
                <p>React 组件，提供 token 上下文给子组件。</p>
                <h3>Props</h3>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">tokenMap</div>
                    <div class="param-type">TokenMap</div>
                    <div class="param-desc">token 映射对象（必填）</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">platform</div>
                    <div class="param-type">"web" | "mp" | "rn"</div>
                    <div class="param-desc">目标平台（默认 "web"）</div>
                  </div>
                </div>
                <h3>示例</h3>
                <CodeBlock label="React 使用" :code="tokenProviderExample" />
              </div>
            </div>

            <!-- useToken -->
            <div id="useToken" class="api-section" data-section="useToken">
              <div class="api-header">
                <span class="api-badge hook">Hook</span>
                <h2>useToken</h2>
                <code class="api-signature">useToken(): TokenContextValue</code>
              </div>
              <div class="api-body">
                <p>获取完整的 token 上下文。</p>
                <h3>返回值</h3>
                <CodeBlock label="TokenContextValue" :code="tokenContextExample" />
                <h3>示例</h3>
                <CodeBlock label="React 使用" :code="useTokenExample" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import CodeBlock from "../components/CodeBlock.vue";

const activeSection = ref("defineTokens");

const sections = [
  "defineTokens", "parseTokens", "TokenMap", "TokenPath", "TokenRef",
  "TokenValue", "vte-plugin", "style-token", "TokenProvider", "useToken"
];

const defineTokensExample = `import { defineTokens } from "@vte-js/core";

export default defineTokens({
  // 原始值
  primitive: {
    blue: {
      500: "#3b82f6",
      600: "#2563eb",
    },
  },
  // 语义映射
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
      primaryHover: "{primitive.blue.600}",
    },
  },
  // 组件级
  component: {
    button: {
      height: "{semantic.spacing.md}",
    },
  },
});`;

const typeExample = `// TokenPath 提取所有合法的 token 路径
type Paths = TokenPath<typeof tokens>;
// "primitive" | "primitive.blue" | "primitive.blue.500" | ...

// 使用示例
const path: Paths = "semantic.color.primary"; // ✅
const bad: Paths = "invalid.path"; // ❌ 编译错误`;

const parseTokensExample = `import { parseTokens } from "@vte-js/core";

const map = await parseTokens("./design-tokens.ts");

// 获取 token
const primary = map.get("semantic.color.primary");
console.log(primary?.value); // "#3b82f6"

// 遍历所有 token
for (const [path, token] of map) {
  console.log(path, token.value);
}`;

const tokenValueExample = `interface TokenValue {
  // token 的点路径
  path: string;
  // 解析后的值（如 "#3b82f6"）
  value: string;
  // 原始值（可能是引用 "{primitive.blue.500}"）
  raw: string;
  // 引用的其他 token 路径
  refs: string[];
}`;

const tokenPathExample = `const tokens = defineTokens({
  semantic: {
    color: { primary: "#3b82f6" },
  },
});

type Paths = TokenPath<typeof tokens>;
// "semantic" | "semantic.color" | "semantic.color.primary"`;

const tokenRefExample = `// 引用语法：{path.to.token}
const tokens = defineTokens({
  primitive: {
    blue: { 500: "#3b82f6" },
  },
  semantic: {
    color: {
      // 引用 primitive.blue.500
      primary: "{primitive.blue.500}",
    },
  },
});`;

const vitePluginExample = `// vite.config.ts
import vte from "@vte-js/vite-plugin";

export default {
  plugins: [
    vte({
      cssPrefix: "my-app",  // 自定义前缀
      platform: "web",       // 目标平台
    }),
  ],
};`;

const styleTokenExample = `<style token scoped>
.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.md;
  border-radius: $semantic.borderRadius.md;
}
</style>`;

const styleTokenOutput = `.btn {
  background: var(--vte-semantic-color-primary);
  padding: var(--vte-semantic-spacing-md);
  border-radius: var(--vte-semantic-borderRadius-md);
}

:root {
  --vte-semantic-color-primary: #3b82f6;
  --vte-semantic-spacing-md: 1rem;
}`;

const tokenProviderExample = `import { TokenProvider } from "@vte-js/react";
import { tokenMap } from "./tokens";

function App() {
  return (
    <TokenProvider tokenMap={tokenMap} platform="web">
      <MyApp />
    </TokenProvider>
  );
}`;

const tokenContextExample = `interface TokenContextValue {
  tokenMap: TokenMap;
  platform: "web" | "mp" | "rn";
  getToken: (path: string) => string | undefined;
  getTokenValue: (path: string, platform?: string) => string | number | undefined;
}`;

const useTokenExample = `import { useToken } from "@vte-js/react";

function MyComponent() {
  const { tokenMap, getTokenValue } = useToken();

  return (
    <div style={{ color: getTokenValue("semantic.color.primary") }}>
      Hello
    </div>
  );
}`;

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
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.page-docs { padding-top: 80px; }
.page-header { padding: 80px 24px 60px; text-align: center; background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%); }
.container { max-width: 1200px; margin: 0 auto; }
.header-line { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #42b883, transparent); margin: 0 auto 24px; }
.section-badge { display: inline-block; padding: 6px 16px; background: rgba(66, 184, 131, 0.1); border: 1px solid rgba(66, 184, 131, 0.3); color: #42b883; border-radius: 100px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
.page-title { font-size: 56px; font-weight: 800; margin-bottom: 16px; color: #f1f5f9; letter-spacing: -0.02em; }
.page-desc { font-size: 20px; color: #94a3b8; }
.docs-content { padding: 80px 24px; }
.docs-layout { display: grid; grid-template-columns: 240px 1fr; gap: 48px; }
.docs-sidebar { position: sticky; top: 100px; height: fit-content; }
.sidebar-nav { display: flex; flex-direction: column; gap: 24px; }
.nav-group h4 { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
.nav-item { display: block; padding: 8px 12px; color: #94a3b8; text-decoration: none; font-size: 14px; border-radius: 6px; transition: all 0.2s; }
.nav-item:hover { background: rgba(66, 184, 131, 0.1); color: #f1f5f9; }
.nav-item.active { background: rgba(66, 184, 131, 0.15); color: #42b883; }
.api-section { margin-bottom: 80px; padding-bottom: 80px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.api-section:last-child { border-bottom: none; }
.api-header { margin-bottom: 32px; }
.api-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; }
.api-badge.function { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
.api-badge.async { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
.api-badge.type { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
.api-badge.plugin { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
.api-badge.syntax { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
.api-badge.component { background: rgba(244, 114, 182, 0.2); color: #f472b6; }
.api-badge.hook { background: rgba(251, 146, 60, 0.2); color: #fb923c; }
.api-header h2 { font-size: 32px; font-weight: 700; color: #f1f5f9; margin-bottom: 12px; }
.api-signature { display: inline-block; padding: 8px 16px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(66, 184, 131, 0.2); border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #42b883; }
.api-body p { font-size: 16px; color: #94a3b8; line-height: 1.8; margin-bottom: 24px; }
.api-body code { background: rgba(66, 184, 131, 0.15); padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; color: #42b883; font-size: 14px; }
.api-body h3 { font-size: 20px; font-weight: 700; color: #f1f5f9; margin: 32px 0 16px; }
.params-table { border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden; margin-bottom: 24px; }
.param-row { display: grid; grid-template-columns: 140px 140px 1fr; gap: 16px; padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.param-row:last-child { border-bottom: none; }
.param-name { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #f1f5f9; }
.param-type { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #42b883; }
.param-desc { font-size: 14px; color: #94a3b8; }
.exception-list { list-style: none; padding: 0; margin-bottom: 24px; }
.exception-list li { padding: 12px 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #f87171; }
@media (max-width: 900px) { .docs-layout { grid-template-columns: 1fr; } .docs-sidebar { position: static; display: none; } }
</style>
