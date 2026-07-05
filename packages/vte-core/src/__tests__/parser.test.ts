import { describe, it, expect } from "vitest";
import path from "path";
import { parseTokens, defineTokens } from "../index.js";

const playgroundDir = path.resolve(__dirname, "../../../../playground");

describe("parseTokens", () => {
  it("should parse design tokens from file", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    expect(map).toBeDefined();
    expect(map.size).toBeGreaterThan(0);
  });

  it("should flatten nested objects to dot notation", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    expect(map.has("primitive.blue.500")).toBe(true);
    expect(map.has("semantic.color.primary")).toBe(true);
    expect(map.has("component.button.height")).toBe(true);
  });

  it("should resolve token references", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    const primary = map.get("semantic.color.primary");
    expect(primary?.value).toBe("#3b82f6");

    const buttonHeight = map.get("component.button.height");
    expect(buttonHeight?.value).toBe("1rem");
  });

  it("should resolve chain references", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    // component.button.height -> semantic.spacing.md -> "1rem"
    const buttonHeight = map.get("component.button.height");
    expect(buttonHeight?.value).toBe("1rem");
    expect(buttonHeight?.refs).toEqual(["semantic.spacing.md"]);
  });

  it("should throw on circular references", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens-circular.ts");

    await expect(parseTokens(tokenPath)).rejects.toThrow(
      /\[VTE\] Circular reference detected/,
    );
  });

  it("should throw on unresolved references", async () => {
    // Create a temporary file with unresolved reference
    const fs = await import("fs");
    const tmpFile = path.join(playgroundDir, "__tmp_unresolved.ts");

    fs.writeFileSync(
      tmpFile,
      `
      export default {
        color: {
          primary: "{nonexistent.path}",
        },
      };
    `,
    );

    try {
      await expect(parseTokens(tmpFile)).rejects.toThrow(
        /\[VTE\] Unresolved reference/,
      );
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  it("should store raw value for reference tokens", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    const primary = map.get("semantic.color.primary");
    expect(primary?.raw).toBe("{primitive.blue.500}");
    expect(primary?.refs).toEqual(["primitive.blue.500"]);
  });

  it("should store string value for primitive tokens", async () => {
    const tokenPath = path.join(playgroundDir, "design-tokens.ts");
    const map = await parseTokens(tokenPath);

    const blue500 = map.get("primitive.blue.500");
    expect(blue500?.value).toBe("#3b82f6");
    expect(blue500?.raw).toBe("#3b82f6");
    expect(blue500?.refs).toEqual([]);
  });

  it("should handle numeric string values", async () => {
    const fs = await import("fs");
    const tmpFile = path.join(playgroundDir, "__tmp_numeric.ts");

    fs.writeFileSync(
      tmpFile,
      `
      export default {
        spacing: {
          small: 8,
          medium: 16,
        },
      };
    `,
    );

    try {
      const map = await parseTokens(tmpFile);
      expect(map.get("spacing.small")?.value).toBe("8");
      expect(map.get("spacing.medium")?.value).toBe("16");
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  it("should handle deeply nested tokens", async () => {
    const fs = await import("fs");
    const tmpFile = path.join(playgroundDir, "__tmp_deep.ts");

    fs.writeFileSync(
      tmpFile,
      `
      export default {
        a: {
          b: {
            c: {
              d: "deep-value",
            },
          },
        },
      };
    `,
    );

    try {
      const map = await parseTokens(tmpFile);
      expect(map.has("a.b.c.d")).toBe(true);
      expect(map.get("a.b.c.d")?.value).toBe("deep-value");
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});

describe("defineTokens", () => {
  it("should return the input object", () => {
    const tokens = defineTokens({
      color: {
        primary: "#3b82f6",
      },
    });

    expect(tokens).toEqual({ color: { primary: "#3b82f6" } });
  });

  it("should preserve nested structure", () => {
    const tokens = defineTokens({
      semantic: {
        color: {
          primary: "#3b82f6",
        },
      },
    });

    expect(tokens.semantic.color.primary).toBe("#3b82f6");
  });

  it("should preserve reference syntax in values", () => {
    const tokens = defineTokens({
      color: {
        primary: "{primitive.blue.500}",
      },
    });

    expect(tokens.color.primary).toBe("{primitive.blue.500}");
  });
});
