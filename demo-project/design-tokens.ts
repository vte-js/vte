import { defineTokens } from "@vte/core";

export default defineTokens({
  // 原始值
  primitive: {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    green: {
      500: "#22c55e",
      600: "#16a34a",
    },
    red: {
      500: "#ef4444",
      600: "#dc2626",
    },
    yellow: {
      500: "#eab308",
      600: "#ca8a04",
    },
  },

  // 语义值
  semantic: {
    color: {
      // 主色调
      primary: "{primitive.blue.500}",
      "primary-hover": "{primitive.blue.600}",
      "primary-active": "{primitive.blue.700}",

      // 次要颜色
      secondary: "{primitive.gray.500}",
      "secondary-hover": "{primitive.gray.600}",

      // 背景色
      background: "#ffffff",
      "background-secondary": "{primitive.gray.50}",
      "background-tertiary": "{primitive.gray.100}",

      // 文本颜色
      text: "{primitive.gray.900}",
      "text-secondary": "{primitive.gray.600}",
      "text-tertiary": "{primitive.gray.400}",
      "text-inverse": "#ffffff",

      // 状态颜色
      success: "{primitive.green.500}",
      warning: "{primitive.yellow.500}",
      error: "{primitive.red.500}",
      info: "{primitive.blue.500}",

      // 边框颜色
      border: "{primitive.gray.200}",
      "border-focus": "{primitive.blue.500}",
    },

    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },

    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },

    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },

    borderRadius: {
      none: "0",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      full: "9999px",
    },

    shadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  },

  // 组件级
  component: {
    button: {
      height: "{semantic.spacing.md}",
      "padding-x": "{semantic.spacing.md}",
      "font-size": "{semantic.fontSize.base}",
    },
    input: {
      height: "{semantic.spacing.xl}",
      "padding-x": "{semantic.spacing.sm}",
    },
    card: {
      "padding": "{semantic.spacing.lg}",
      "border-radius": "{semantic.borderRadius.lg}",
    },
  },
});
