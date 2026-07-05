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
                <a href="#defineTokens" class="nav-item active">defineTokens</a>
                <a href="#parseTokens" class="nav-item">parseTokens</a>
                <a href="#TokenMap" class="nav-item">TokenMap</a>
              </div>
              <div class="nav-group">
                <h4>类型</h4>
                <a href="#TokenPath" class="nav-item">TokenPath</a>
                <a href="#TokenRef" class="nav-item">TokenRef</a>
                <a href="#TokenValue" class="nav-item">TokenValue</a>
              </div>
              <div class="nav-group">
                <h4>Vite 插件</h4>
                <a href="#vte-plugin" class="nav-item">VtePlugin</a>
                <a href="#style-token" class="nav-item">&lt;style token&gt;</a>
              </div>
              <div class="nav-group">
                <h4>React</h4>
                <a href="#TokenProvider" class="nav-item">TokenProvider</a>
                <a href="#useToken" class="nav-item">useToken</a>
              </div>
            </nav>
          </aside>

          <!-- 主要内容 -->
          <main class="docs-main">
            <!-- defineTokens -->
            <div id="defineTokens" class="api-section">
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
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">design-tokens.ts</span>
                  </div>
                  <pre><code><span class="hl-kw">import</span> { defineTokens } <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/core"</span>;

<span class="hl-kw">export default</span> <span class="hl-fn">defineTokens</span>({
  <span class="hl-comment">// 原始值</span>
  primitive: {
    blue: {
      500: <span class="hl-str">"#3b82f6"</span>,
      600: <span class="hl-str">"#2563eb"</span>,
    },
  },
  <span class="hl-comment">// 语义映射</span>
  semantic: {
    color: {
      primary: <span class="hl-str">"{primitive.blue.500}"</span>,
      primaryHover: <span class="hl-str">"{primitive.blue.600}"</span>,
    },
  },
  <span class="hl-comment">// 组件级</span>
  component: {
    button: {
      height: <span class="hl-str">"{semantic.spacing.md}"</span>,
    },
  },
});</code></pre>
                </div>

                <h3>类型推导</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">类型定义</span>
                  </div>
                  <pre><code><span class="hl-comment">// TokenPath 提取所有合法的 token 路径</span>
<span class="hl-kw">type</span> Paths = <span class="hl-fn">TokenPath</span>&lt;<span class="hl-kw">typeof</span> tokens&gt;;
<span class="hl-comment">// "primitive" | "primitive.blue" | "primitive.blue.500" | ...</span>

<span class="hl-comment">// 使用示例</span>
<span class="hl-kw">const</span> path: Paths = <span class="hl-str">"semantic.color.primary"</span>; <span class="hl-comment">// ✅</span>
<span class="hl-kw">const</span> bad: Paths = <span class="hl-str">"invalid.path"</span>; <span class="hl-comment">// ❌ 编译错误</span></code></pre>
                </div>
              </div>
            </div>

            <!-- parseTokens -->
            <div id="parseTokens" class="api-section">
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
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">使用示例</span>
                  </div>
                  <pre><code><span class="hl-kw">import</span> { parseTokens } <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/core"</span>;

<span class="hl-kw">const</span> map = <span class="hl-kw">await</span> <span class="hl-fn">parseTokens</span>(<span class="hl-str">"./design-tokens.ts"</span>);

<span class="hl-comment">// 获取 token</span>
<span class="hl-kw">const</span> primary = map.get(<span class="hl-str">"semantic.color.primary"</span>);
console.log(primary?.value); <span class="hl-comment">// "#3b82f6"</span>

<span class="hl-comment">// 遍历所有 token</span>
<span class="hl-kw">for</span> (<span class="hl-kw">const</span> [path, token] <span class="hl-kw">of</span> map) {
  console.log(path, token.value);
}</code></pre>
                </div>
              </div>
            </div>

            <!-- TokenMap -->
            <div id="TokenMap" class="api-section">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenMap</h2>
                <code class="api-signature">type TokenMap = Map&lt;string, TokenValue&gt;</code>
              </div>
              <div class="api-body">
                <p>扁平化的 Token 字典，键为点路径（如 <code>semantic.color.primary</code>）。</p>

                <h3>TokenValue 结构</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">TokenValue</span>
                  </div>
                  <pre><code><span class="hl-kw">interface</span> <span class="hl-type">TokenValue</span> {
  <span class="hl-comment">// token 的点路径</span>
  path: <span class="hl-type">string</span>;
  <span class="hl-comment">// 解析后的值（如 "#3b82f6"）</span>
  value: <span class="hl-type">string</span>;
  <span class="hl-comment">// 原始值（可能是引用 "{primitive.blue.500}"）</span>
  raw: <span class="hl-type">string</span>;
  <span class="hl-comment">// 引用的其他 token 路径</span>
  refs: <span class="hl-type">string</span>[];
}</code></pre>
                </div>
              </div>
            </div>

            <!-- TokenPath -->
            <div id="TokenPath" class="api-section">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenPath&lt;T&gt;</h2>
                <code class="api-signature">type TokenPath&lt;T&gt; = FlattenPaths&lt;T&gt;</code>
              </div>
              <div class="api-body">
                <p>类型工具，从 token 定义中提取所有合法的点路径联合类型。用于 IDE 自动补全和类型检查。</p>

                <h3>示例</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">类型推导</span>
                  </div>
                  <pre><code><span class="hl-kw">const</span> tokens = <span class="hl-fn">defineTokens</span>({
  semantic: {
    color: { primary: <span class="hl-str">"#3b82f6"</span> },
  },
});

<span class="hl-kw">type</span> Paths = <span class="hl-fn">TokenPath</span>&lt;<span class="hl-kw">typeof</span> tokens&gt;;
<span class="hl-comment">// "semantic" | "semantic.color" | "semantic.color.primary"</span></code></pre>
                </div>
              </div>
            </div>

            <!-- TokenRef -->
            <div id="TokenRef" class="api-section">
              <div class="api-header">
                <span class="api-badge type">Type</span>
                <h2>TokenRef&lt;P&gt;</h2>
                <code class="api-signature">type TokenRef&lt;P extends string&gt; = \`{${P}}\`</code>
              </div>
              <div class="api-body">
                <p>Token 引用类型，表示对其他 token 的引用。</p>

                <h3>示例</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">引用语法</span>
                  </div>
                  <pre><code><span class="hl-comment">// 引用语法：{path.to.token}</span>
<span class="hl-kw">const</span> tokens = <span class="hl-fn">defineTokens</span>({
  primitive: {
    blue: { 500: <span class="hl-str">"#3b82f6"</span> },
  },
  semantic: {
    color: {
      <span class="hl-comment">// 引用 primitive.blue.500</span>
      primary: <span class="hl-str">"{primitive.blue.500}"</span>,
    },
  },
});</code></pre>
                </div>
              </div>
            </div>

            <!-- TokenValue -->
            <div id="TokenValue" class="api-section">
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
            <div id="vte-plugin" class="api-section">
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
                  <div class="param-row">
                    <div class="param-name">output.agentJson</div>
                    <div class="param-type">boolean</div>
                    <div class="param-desc">生成 tokens.agent.json（默认 true）</div>
                  </div>
                </div>

                <h3>示例</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">vite.config.ts</span>
                  </div>
                  <pre><code><span class="hl-kw">import</span> vte <span class="hl-kw">from</span> <span class="hl-str">"@vte-js/vite-plugin"</span>;

<span class="hl-kw">export default</span> {
  plugins: [
    <span class="hl-fn">vte</span>({
      cssPrefix: <span class="hl-str">"my-app"</span>,
      platform: <span class="hl-str">"web"</span>,
      output: {
        types: <span class="hl-num">true</span>,
        css: <span class="hl-num">true</span>,
      },
    }),
  ],
};</code></pre>
                </div>
              </div>
            </div>

            <!-- style token -->
            <div id="style-token" class="api-section">
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
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">Vue SFC</span>
                  </div>
                  <pre><code><span class="hl-tag">&lt;style token scoped&gt;</span>
<span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">$semantic.color.primary</span>;
  <span class="hl-prop">padding</span>: <span class="hl-val">$semantic.spacing.md</span>;
}
<span class="hl-tag">&lt;/style&gt;</span></code></pre>
                </div>

                <h3>编译输出</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">CSS</span>
                  </div>
                  <pre><code><span class="hl-sel">.btn</span> {
  <span class="hl-prop">background</span>: <span class="hl-var">var(--vte-semantic-color-primary)</span>;
  <span class="hl-prop">padding</span>: <span class="hl-var">var(--vte-semantic-spacing-md)</span>;
}

<span class="hl-sel">:root</span> {
  <span class="hl-prop">--vte-semantic-color-primary</span>: <span class="hl-num">#3b82f6</span>;
  <span class="hl-prop">--vte-semantic-spacing-md</span>: <span class="hl-num">1rem</span>;
}</code></pre>
                </div>
              </div>
            </div>

            <!-- TokenProvider -->
            <div id="TokenProvider" class="api-section">
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
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">React 使用</span>
                  </div>
                  <pre v-pre><code>import { TokenProvider } from "@vte-js/react";
import { tokenMap } from "./tokens";

function App() {
  return (
    &lt;TokenProvider tokenMap={tokenMap} platform="web"&gt;
      &lt;MyApp /&gt;
    &lt;/TokenProvider&gt;
  );
}</code></pre>
                </div>
              </div>
            </div>

            <!-- useToken -->
            <div id="useToken" class="api-section">
              <div class="api-header">
                <span class="api-badge hook">Hook</span>
                <h2>useToken</h2>
                <code class="api-signature">useToken(): TokenContextValue</code>
              </div>
              <div class="api-body">
                <p>获取完整的 token 上下文。</p>

                <h3>返回值</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">TokenContextValue</span>
                  </div>
                  <pre><code><span class="hl-kw">interface</span> <span class="hl-type">TokenContextValue</span> {
  tokenMap: TokenMap;
  platform: <span class="hl-str">"web"</span> | <span class="hl-str">"mp"</span> | <span class="hl-str">"rn"</span>;
  getToken: (path: <span class="hl-type">string</span>) =&gt; <span class="hl-type">string</span> | <span class="hl-type">undefined</span>;
  getTokenValue: (path: <span class="hl-type">string</span>, platform?: <span class="hl-type">string</span>) =&gt; <span class="hl-type">string</span> | <span class="hl-type">number</span> | <span class="hl-type">undefined</span>;
}</code></pre>
                </div>

                <h3>示例</h3>
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-label">React 使用</span>
                  </div>
                  <pre v-pre><code>import { useToken } from "@vte-js/react";

function MyComponent() {
  const { tokenMap, getTokenValue } = useToken();

  return (
    &lt;div style={{ color: getTokenValue("semantic.color.primary") }}&gt;
      Hello
    &lt;/div&gt;
  );
}</code></pre>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-docs {
  padding-top: 80px;
}

.page-header {
  padding: 80px 24px 60px;
  text-align: center;
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1) 0%, transparent 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #42b883, transparent);
  margin: 0 auto 24px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  color: #42b883;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.page-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 20px;
  color: #94a3b8;
}

.docs-content {
  padding: 80px 24px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 48px;
}

.docs-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-group h4 {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.nav-item {
  display: block;
  padding: 8px 12px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(66, 184, 131, 0.1);
  color: #f1f5f9;
}

.nav-item.active {
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
}

.api-section {
  margin-bottom: 80px;
  padding-bottom: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.api-section:last-child {
  border-bottom: none;
}

.api-header {
  margin-bottom: 32px;
}

.api-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.api-badge.function { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
.api-badge.async { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
.api-badge.type { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
.api-badge.plugin { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
.api-badge.syntax { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
.api-badge.component { background: rgba(244, 114, 182, 0.2); color: #f472b6; }
.api-badge.hook { background: rgba(251, 146, 60, 0.2); color: #fb923c; }

.api-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 12px;
}

.api-signature {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #42b883;
}

.api-body p {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 24px;
}

.api-body code {
  background: rgba(66, 184, 131, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: #42b883;
  font-size: 14px;
}

.api-body h3 {
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 32px 0 16px;
}

.params-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
}

.param-row {
  display: grid;
  grid-template-columns: 140px 140px 1fr;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.param-row:last-child {
  border-bottom: none;
}

.param-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
}

.param-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #42b883;
}

.param-desc {
  font-size: 14px;
  color: #94a3b8;
}

.exception-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.exception-list li {
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #f87171;
}

.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
}

.code-header {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-label {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e2e8f0;
  background: none;
  padding: 0;
}

.hl-kw { color: #c084fc; }
.hl-str { color: #86efac; }
.hl-fn { color: #60a5fa; }
.hl-comment { color: #64748b; }
.hl-type { color: #22d3ee; }
.hl-num { color: #fbbf24; }
.hl-tag { color: #7dd3fc; }
.hl-attr { color: #c4b5fd; }
.hl-sel { color: #fbbf24; }
.hl-prop { color: #93c5fd; }
.hl-val { color: #86efac; }
.hl-var { color: #c4b5fd; }

@media (max-width: 900px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
    display: none;
  }
}
</style>
