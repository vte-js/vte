import { describe, it, expect } from "vitest";
import type { TokenMap } from "@vte/core";
import { webPlatform } from "../codegen/web.js";
import { mpPlatform } from "../codegen/mp.js";
import { rnPlatform } from "../codegen/rn.js";

function createTokenMap(
  entries: [string, { path: string; value: string; raw: string; refs: string[] }][],
): TokenMap {
  return new Map(entries);
}

describe("web platform", () => {
  const map = createTokenMap([
    [
      "semantic.color.primary",
      { path: "semantic.color.primary", value: "#3b82f6", raw: "{primitive.blue.500}", refs: ["primitive.blue.500"] },
    ],
    [
      "semantic.spacing.small",
      { path: "semantic.spacing.small", value: "0.25rem", raw: "0.25rem", refs: [] },
    ],
  ]);

  it("should generate CSS variables in :root block", () => {
    const result = webPlatform.generateVars(map);

    expect(result).toContain(":root {");
    expect(result).toContain("--vte-semantic-color-primary: #3b82f6;");
    expect(result).toContain("--vte-semantic-spacing-small: 0.25rem;");
    expect(result).toContain("}");
  });

  it("should replace token refs with var() calls", () => {
    const content = "background: $semantic.color.primary;";
    const result = webPlatform.replaceRefs(content, map);

    expect(result).toBe("background: var(--vte-semantic-color-primary);");
  });

  it("should not replace unknown token refs", () => {
    const content = "color: $unknown.token;";
    const result = webPlatform.replaceRefs(content, map);

    expect(result).toBe("color: $unknown.token;");
  });

  it("should handle multiple refs in one line", () => {
    const content = "padding: $semantic.spacing.small $semantic.spacing.small;";
    const result = webPlatform.replaceRefs(content, map);

    expect(result).toBe(
      "padding: var(--vte-semantic-spacing-small) var(--vte-semantic-spacing-small);",
    );
  });

  it("should not replace $ in other contexts", () => {
    const content: string = "content: '$';";
    const result = webPlatform.replaceRefs(content, map);

    expect(result).toBe("content: '$';");
  });
});

describe("mp platform", () => {
  const map = createTokenMap([
    [
      "semantic.color.primary",
      { path: "semantic.color.primary", value: "#3b82f6", raw: "{primitive.blue.500}", refs: ["primitive.blue.500"] },
    ],
    [
      "semantic.spacing.small",
      { path: "semantic.spacing.small", value: "0.25rem", raw: "0.25rem", refs: [] },
    ],
  ]);

  it("should return empty string for vars (mp doesn't support CSS variables)", () => {
    const result = mpPlatform.generateVars(map);
    expect(result).toBe("");
  });

  it("should inline values directly", () => {
    const content = "background: $semantic.color.primary;";
    const result = mpPlatform.replaceRefs(content, map);

    expect(result).toBe("background: #3b82f6;");
  });
});

describe("rn platform", () => {
  const map = createTokenMap([
    [
      "semantic.spacing.small",
      { path: "semantic.spacing.small", value: "8", raw: "8", refs: [] },
    ],
    [
      "semantic.color.primary",
      { path: "semantic.color.primary", value: "#3b82f6", raw: "{primitive.blue.500}", refs: ["primitive.blue.500"] },
    ],
  ]);

  it("should return empty string for vars (RN handles in JS)", () => {
    const result = rnPlatform.generateVars(map);
    expect(result).toBe("");
  });

  it("should convert numeric values to numbers", () => {
    const content = "padding: $semantic.spacing.small;";
    const result = rnPlatform.replaceRefs(content, map);

    expect(result).toBe("padding: 8;");
  });

  it("should quote string values", () => {
    const content = "color: $semantic.color.primary;";
    const result = rnPlatform.replaceRefs(content, map);

    expect(result).toBe('color: "#3b82f6";');
  });
});
