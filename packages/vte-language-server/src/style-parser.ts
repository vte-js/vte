/**
 * 样式块解析器
 * 解析 <style token> 块中的 CSS 选择器和属性
 */

export interface StyleInfo {
  selector: string;
  line: number;
  properties: Map<string, string>;
}

/**
 * 解析 <style token> 块
 */
export function parseStyleBlock(content: string): Map<string, StyleInfo> {
  const styleMap = new Map<string, StyleInfo>();

  let inStyleToken = false;
  let currentSelector = "";
  let currentProperties = new Map<string, string>();
  let styleStartLine = 0;

  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line.trim();

    // 检测 <style token>
    if (text.startsWith("<style token")) {
      inStyleToken = true;
      styleStartLine = i + 1;
      continue;
    }

    // 检测 </style>
    if (text === "</style>" && inStyleToken) {
      // 保存最后一个选择器
      if (currentSelector) {
        styleMap.set(currentSelector, {
          selector: currentSelector,
          line: styleStartLine,
          properties: currentProperties,
        });
      }
      inStyleToken = false;
      continue;
    }

    if (!inStyleToken) continue;

    // 解析选择器
    const selectorMatch = text.match(/^\.([\w-]+)\s*\{/);
    if (selectorMatch) {
      // 保存上一个选择器
      if (currentSelector) {
        styleMap.set(currentSelector, {
          selector: currentSelector,
          line: styleStartLine,
          properties: currentProperties,
        });
      }
      currentSelector = selectorMatch[1];
      currentProperties = new Map();
      styleStartLine = i;
      continue;
    }

    // 解析属性
    const propMatch = text.match(/^([\w-]+)\s*:\s*(.+);$/);
    if (propMatch && currentSelector) {
      currentProperties.set(propMatch[1], propMatch[2]);
    }
  }

  return styleMap;
}

/**
 * 从文档中提取 class 名称
 */
export function extractClassNames(content: string): string[] {
  const classes = new Set<string>();

  const lines = content.split("\n");
  for (const line of lines) {
    // 匹配 class="..." 或 :class="..."
    const classRegex = /(?:class|:class)\s*=\s*["']([^"']*)["']/g;
    let match;

    while ((match = classRegex.exec(line)) !== null) {
      const classContent = match[1];
      const classNames = classContent.split(/\s+/);
      for (const cls of classNames) {
        if (cls && !cls.startsWith("$")) {
          classes.add(cls);
        }
      }
    }
  }

  return Array.from(classes);
}
