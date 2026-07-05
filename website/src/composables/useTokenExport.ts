import type { TokenValue } from "./useTokenStore";

export function useTokenExport() {
  function toTypeScript(tokenMap: Map<string, TokenValue>, prefix: string = "vte"): string {
    const nested: any = {};
    for (const [path, token] of tokenMap) {
      const parts = path.split(".");
      let current = nested;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = token.raw;
    }
    return `import { defineTokens } from "@vte-js/core";\n\nexport default defineTokens(${JSON.stringify(nested, null, 2)});\n`;
  }

  function toJson(tokenMap: Map<string, TokenValue>): string {
    const obj: Record<string, string> = {};
    for (const [path, token] of tokenMap) {
      obj[path] = token.value;
    }
    return JSON.stringify(obj, null, 2);
  }

  function toCssVariables(tokenMap: Map<string, TokenValue>, prefix: string = "vte"): string {
    const lines: string[] = [":root {"];
    for (const [path, token] of tokenMap) {
      const varName = `--${prefix}-${path.replace(/\./g, "-")}`;
      lines.push(`  ${varName}: ${token.value};`);
    }
    lines.push("}");
    return lines.join("\n");
  }

  function toScss(tokenMap: Map<string, TokenValue>, prefix: string = "vte"): string {
    const lines: string[] = [];
    for (const [path, token] of tokenMap) {
      const varName = `$${prefix}-${path.replace(/\./g, "-")}`;
      lines.push(`${varName}: ${token.value};`);
    }
    return lines.join("\n");
  }

  function exportContent(tokenMap: Map<string, TokenValue>, format: string, prefix: string = "vte"): string {
    switch (format) {
      case "ts": return toTypeScript(tokenMap, prefix);
      case "json": return toJson(tokenMap);
      case "css": return toCssVariables(tokenMap, prefix);
      case "scss": return toScss(tokenMap, prefix);
      default: return "";
    }
  }

  function getExtension(format: string): string {
    const map: Record<string, string> = { ts: "ts", json: "json", css: "css", scss: "scss" };
    return map[format] || "txt";
  }

  function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  function downloadFile(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { exportContent, getExtension, copyToClipboard, downloadFile };
}
