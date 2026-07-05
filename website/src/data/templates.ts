export interface TokenTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  tokens: {
    primitive: Record<string, Record<string, string>>;
    semantic: Record<string, Record<string, string>>;
    component?: Record<string, Record<string, string>>;
  };
}

export const templates: TokenTemplate[] = [
  {
    id: "default",
    name: "VTE Default",
    description: "Vue Token Engine 默认模板，包含完整的颜色/间距/字号系统",
    icon: "🌿",
    tokens: {
      primitive: {
        blue: {
          "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd",
          "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8",
        },
        gray: {
          "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db",
          "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151",
          "800": "#1f2937", "900": "#111827",
        },
        green: { "500": "#22c55e", "600": "#16a34a" },
        red: { "500": "#ef4444", "600": "#dc2626" },
        yellow: { "500": "#eab308", "600": "#ca8a04" },
      },
      semantic: {
        color: {
          "primary": "{primitive.blue.500}",
          "primary-hover": "{primitive.blue.600}",
          "primary-active": "{primitive.blue.700}",
          "secondary": "{primitive.gray.500}",
          "background": "#ffffff",
          "background-secondary": "{primitive.gray.50}",
          "text": "{primitive.gray.900}",
          "text-secondary": "{primitive.gray.600}",
          "text-tertiary": "{primitive.gray.400}",
          "text-inverse": "#ffffff",
          "success": "{primitive.green.500}",
          "warning": "{primitive.yellow.500}",
          "error": "{primitive.red.500}",
          "border": "{primitive.gray.200}",
        },
        spacing: {
          "xs": "0.25rem", "sm": "0.5rem", "md": "1rem", "lg": "1.5rem", "xl": "2rem", "2xl": "3rem",
        },
        fontSize: {
          "xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem",
        },
        fontWeight: { "normal": "400", "medium": "500", "semibold": "600", "bold": "700" },
        borderRadius: { "none": "0", "sm": "0.25rem", "md": "0.375rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        shadow: {
          "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
      },
      component: {
        button: {
          "height": "{semantic.spacing.md}",
          "padding-x": "{semantic.spacing.md}",
          "font-size": "{semantic.fontSize.base}",
        },
      },
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Tailwind CSS 完整色板，包含所有标准颜色梯度",
    icon: "🌬️",
    tokens: {
      primitive: {
        slate: { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a" },
        red: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d" },
        orange: { "500": "#f97316", "600": "#ea580c" },
        amber: { "500": "#f59e0b", "600": "#d97706" },
        green: { "500": "#22c55e", "600": "#16a34a" },
        blue: { "500": "#3b82f6", "600": "#2563eb" },
        indigo: { "500": "#6366f1", "600": "#4f46e5" },
        violet: { "500": "#8b5cf6", "600": "#7c3aed" },
      },
      semantic: {
        color: {
          "primary": "{primitive.blue.500}",
          "primary-hover": "{primitive.blue.600}",
          "success": "{primitive.green.500}",
          "warning": "{primitive.amber.500}",
          "error": "{primitive.red.500}",
          "background": "#ffffff",
          "text": "{primitive.slate.900}",
          "text-secondary": "{primitive.slate.500}",
          "border": "{primitive.slate.200}",
        },
        spacing: { "0": "0px", "1": "0.25rem", "2": "0.5rem", "3": "0.75rem", "4": "1rem", "5": "1.25rem", "6": "1.5rem", "8": "2rem", "10": "2.5rem", "12": "3rem", "16": "4rem", "20": "5rem" },
        fontSize: { "xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem" },
        borderRadius: { "none": "0px", "sm": "0.125rem", "DEFAULT": "0.25rem", "md": "0.375rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
      },
    },
  },
  {
    id: "material",
    name: "Material Design 3",
    description: "Google Material Design 3 色彩系统",
    icon: "🎨",
    tokens: {
      primitive: {
        primary: { "50": "#e3f2fd", "100": "#bbdefb", "200": "#90caf9", "300": "#64b5f6", "400": "#42a5f5", "500": "#2196f3", "600": "#1e88e5", "700": "#1976d2", "800": "#1565c0", "900": "#0d47a1" },
        secondary: { "50": "#fce4ec", "100": "#f8bbd0", "200": "#f48fb1", "300": "#f06292", "400": "#ec407a", "500": "#e91e63", "600": "#d81b60", "700": "#c2185b" },
        neutral: { "50": "#fafafa", "100": "#f5f5f5", "200": "#eeeeee", "300": "#e0e0e0", "400": "#bdbdbd", "500": "#9e9e9e", "600": "#757575", "700": "#616161", "800": "#424242", "900": "#212121" },
        error: { "500": "#b3261e", "600": "#8c1d18" },
      },
      semantic: {
        color: {
          "primary": "{primitive.primary.500}",
          "on-primary": "#ffffff",
          "secondary": "{primitive.secondary.500}",
          "background": "#fffbfe",
          "surface": "{primitive.neutral.50}",
          "on-surface": "{primitive.neutral.900}",
          "error": "{primitive.error.500}",
          "outline": "{primitive.neutral.300}",
        },
        spacing: { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px", "xxl": "48px" },
        fontSize: { "body-small": "12px", "body-medium": "14px", "body-large": "16px", "title-medium": "16px", "title-large": "22px", "headline-small": "24px" },
      },
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "最小可用模板，适合快速开始",
    icon: "✨",
    tokens: {
      primitive: {
        brand: { "500": "#6366f1", "600": "#4f46e5" },
        neutral: { "100": "#f5f5f5", "300": "#d4d4d4", "500": "#737373", "700": "#404040", "900": "#171717" },
      },
      semantic: {
        color: {
          "primary": "{primitive.brand.500}",
          "background": "#ffffff",
          "text": "{primitive.neutral.900}",
          "text-secondary": "{primitive.neutral.500}",
          "border": "{primitive.neutral.300}",
        },
        spacing: { "sm": "0.5rem", "md": "1rem", "lg": "1.5rem", "xl": "2rem" },
        fontSize: { "sm": "0.875rem", "base": "1rem", "lg": "1.25rem" },
      },
    },
  },
];
