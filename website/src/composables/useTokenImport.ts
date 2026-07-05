export function useTokenImport() {
  function detectFormat(content: string): "json" | "ts" | "css" | "unknown" {
    const trimmed = content.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
    if (trimmed.includes("defineTokens") || trimmed.includes("import")) return "ts";
    if (trimmed.includes("--") || trimmed.includes(":root")) return "css";
    return "unknown";
  }

  function parseJson(content: string): any {
    const data = JSON.parse(content);
    return normalizeToTree(data);
  }

  function parseTs(content: string): any {
    const match = content.match(/defineTokens\((\{[\s\S]*\})\)/);
    if (!match) throw new Error("Cannot find defineTokens() call");
    const fn = new Function("return " + match[1]);
    return normalizeToTree(fn());
  }

  function parseCss(content: string): any {
    const tree: any = { primitive: {}, semantic: {}, component: {} };
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(content)) !== null) {
      const name = match[1].replace(/^vte-/, "");
      const value = match[2].trim();
      const parts = name.split("-");
      if (parts.length >= 2) {
        const layer = parts[0] === "primitive" ? "primitive" : parts[0] === "component" ? "component" : "semantic";
        addToNested(tree[layer], parts, value);
      }
    }
    return tree;
  }

  function addToNested(obj: any, parts: string[], value: string) {
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  function normalizeToTree(data: any): any {
    const tree: any = { primitive: {}, semantic: {}, component: {} };
    for (const layer of ["primitive", "semantic", "component"]) {
      if (data[layer] && typeof data[layer] === "object") {
        tree[layer] = normalizeNode(data[layer]);
      }
    }
    return tree;
  }

  function normalizeNode(obj: any): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        result[key] = value;
      } else if (typeof value === "object" && value !== null) {
        result[key] = normalizeNode(value);
      }
    }
    return result;
  }

  function importContent(content: string): any {
    const format = detectFormat(content);
    switch (format) {
      case "json": return parseJson(content);
      case "ts": return parseTs(content);
      case "css": return parseCss(content);
      default: throw new Error("不支持的格式，请使用 JSON、TypeScript 或 CSS Variables");
    }
  }

  return { detectFormat, importContent };
}
