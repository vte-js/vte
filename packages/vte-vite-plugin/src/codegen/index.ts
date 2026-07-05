import type { TokenMap } from "@vte-js/core";
import { createWebPlatform } from "./web.js";
import { mpPlatform } from "./mp.js";
import { rnPlatform } from "./rn.js";

export type Platform = "web" | "mp" | "rn";

export interface PlatformAdapter {
  name: Platform;
  generateVars(map: TokenMap): string;
  replaceRefs(content: string, map: TokenMap): string;
}

export function getPlatformAdapter(platform: Platform, cssPrefix: string = "vte"): PlatformAdapter {
  if (platform === "web") {
    return createWebPlatform(cssPrefix);
  }
  if (platform === "mp") {
    return mpPlatform;
  }
  return rnPlatform;
}

export { createWebPlatform, mpPlatform, rnPlatform };
