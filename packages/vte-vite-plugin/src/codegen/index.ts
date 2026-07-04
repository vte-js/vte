import type { TokenMap } from "@vte/core";
import { webPlatform } from "./web.js";
import { mpPlatform } from "./mp.js";
import { rnPlatform } from "./rn.js";

export type Platform = "web" | "mp" | "rn";

export interface PlatformAdapter {
  name: Platform;
  generateVars(map: TokenMap): string;
  replaceRefs(content: string, map: TokenMap): string;
}

const platforms: Record<Platform, PlatformAdapter> = {
  web: webPlatform,
  mp: mpPlatform,
  rn: rnPlatform,
};

export function getPlatformAdapter(platform: Platform): PlatformAdapter {
  return platforms[platform];
}

export { webPlatform, mpPlatform, rnPlatform };
