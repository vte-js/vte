// playground/test-types.ts
// 验证 TokenPath 类型推导
import { defineTokens, type TokenPath } from "@vte/core";

const tokens = defineTokens({
  primitive: {
    blue: {
      50: "#eff6ff",
      500: "#3b82f6",
    },
    gray: {
      100: "#f3f4f6",
      900: "#111827",
    },
  },
  semantic: {
    color: {
      primary: "{primitive.blue.500}",
      background: "{primitive.gray.100}",
      text: "{primitive.gray.900}",
    },
    spacing: {
      small: "0.25rem",
      medium: "0.5rem",
      large: "1rem",
    },
  },
  component: {
    button: {
      height: "{semantic.spacing.medium}",
    },
  },
});

// 类型测试：TokenPath 应该提取所有合法路径
type Paths = TokenPath<typeof tokens>;

// 这些应该编译通过（合法路径）
const p1: Paths = "primitive";
const p2: Paths = "primitive.blue";
const p3: Paths = "primitive.blue.500";
const p4: Paths = "semantic";
const p5: Paths = "semantic.color";
const p6: Paths = "semantic.color.primary";
const p7: Paths = "semantic.spacing.small";
const p8: Paths = "component";
const p9: Paths = "component.button";
const p10: Paths = "component.button.height";

// 运行时验证：属性访问应该正常工作
console.log("Token paths type test:");
console.log("  primitive.blue.500:", tokens.primitive.blue["500"]);
console.log("  semantic.color.primary:", tokens.semantic.color.primary);
console.log("  component.button.height:", tokens.component.button.height);

// 展示所有路径
console.log("\nAll valid token paths (type-level):");
const allPaths: Paths[] = [
  "primitive", "primitive.blue", "primitive.blue.50", "primitive.blue.500",
  "primitive.gray", "primitive.gray.100", "primitive.gray.900",
  "semantic", "semantic.color", "semantic.color.primary", "semantic.color.background", "semantic.color.text",
  "semantic.spacing", "semantic.spacing.small", "semantic.spacing.medium", "semantic.spacing.large",
  "component", "component.button", "component.button.height",
];
allPaths.forEach(p => console.log(`  ${p}`));

console.log("\n✅ Type inference test passed!");
