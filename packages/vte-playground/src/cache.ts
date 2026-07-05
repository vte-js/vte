import fs from "fs";
import crypto from "crypto";
import type { TokenMap } from "@vte-js/core";

interface CacheEntry {
  tokenMap: TokenMap;
  component: string;
  mtime: number;
  contentHash: string;
}

const cache = new Map<string, CacheEntry>();

function getContentHash(filePath: string): { hash: string; mtime: number } {
  const stat = fs.statSync(filePath);
  const content = fs.readFileSync(filePath);
  const hash = crypto.createHash("md5").update(content).digest("hex");
  return { hash, mtime: stat.mtimeMs };
}

/**
 * Get cached token map and component, or return null if cache miss
 */
export function getCachedResult(
  filePath: string,
): { tokenMap: TokenMap; component: string } | null {
  const entry = cache.get(filePath);
  if (!entry) return null;

  const { hash, mtime } = getContentHash(filePath);
  if (entry.mtime !== mtime || entry.contentHash !== hash) {
    cache.delete(filePath);
    return null;
  }

  return { tokenMap: entry.tokenMap, component: entry.component };
}

/**
 * Store token map and component in cache
 */
export function setCacheResult(
  filePath: string,
  tokenMap: TokenMap,
  component: string,
): void {
  const { hash, mtime } = getContentHash(filePath);
  cache.set(filePath, { tokenMap, component, mtime, contentHash: hash });
}

/**
 * Clear cache for a specific file or all files
 */
export function clearCache(filePath?: string): void {
  if (filePath) {
    cache.delete(filePath);
  } else {
    cache.clear();
  }
}
