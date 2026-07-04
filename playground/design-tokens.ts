// playground/design-tokens.ts
import { defineTokens } from "@vte/core";

export default defineTokens({
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
      // 引用原始值
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
      // 引用语义值
      height: "{semantic.spacing.medium}",
    },
  },
});
