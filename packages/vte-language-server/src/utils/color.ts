/**
 * 颜色工具函数
 * IDE 无关的颜色处理
 */

const CSS_COLORS = [
  "transparent",
  "black",
  "white",
  "red",
  "green",
  "blue",
  "yellow",
  "cyan",
  "magenta",
  "gray",
  "grey",
  "orange",
  "purple",
  "pink",
  "brown",
];

const COLOR_MAP: Record<string, string> = {
  black: "rgba(0,0,0,1)",
  white: "rgba(255,255,255,1)",
  red: "rgba(255,0,0,1)",
  green: "rgba(0,128,0,1)",
  blue: "rgba(0,0,255,1)",
  yellow: "rgba(255,255,0,1)",
  orange: "rgba(255,165,0,1)",
  purple: "rgba(128,0,128,1)",
};

/**
 * 检查值是否是颜色
 */
export function isColorValue(value: string): boolean {
  if (/^(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/.test(value)) {
    return true;
  }
  return CSS_COLORS.includes(value.toLowerCase());
}

/**
 * 将颜色值转换为 RGBA 格式
 */
export function colorToRgba(color: string): string {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    let r = 0,
      g = 0,
      b = 0,
      a = 1;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  if (color.startsWith("rgb")) {
    return color;
  }

  return COLOR_MAP[color.toLowerCase()] || "rgba(128,128,128,1)";
}

/**
 * 生成颜色预览的 SVG
 */
export function generateColorSvg(color: string, size: number = 12): string {
  const rgba = colorToRgba(color);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${rgba}" rx="2"/></svg>`;
}

/**
 * 生成颜色预览的 Data URI
 */
export function generateColorDataUri(color: string, size: number = 12): string {
  const svg = generateColorSvg(color, size);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
