import fs from "fs";
import path from "path";

export interface WatchOptions {
  file: string;
  debounceMs?: number;
  onChange: () => Promise<void>;
}

export function startWatcher(options: WatchOptions): fs.FSWatcher {
  const { file, debounceMs = 300, onChange } = options;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  console.log(`👀 Watching ${path.relative(process.cwd(), file)} for changes...\n`);

  const watcher = fs.watch(file, { persistent: true }, (eventType) => {
    if (eventType !== "change") return;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      console.log(`\n🔄 Change detected, regenerating...`);
      try {
        await onChange();
        console.log(`✅ Playground updated\n`);
      } catch (e) {
        console.error(`❌ Regeneration failed: ${(e as Error).message}\n`);
      }
    }, debounceMs);
  });

  watcher.on("error", (err) => {
    console.error(`\n❌ Watch error: ${err.message}\n`);
  });

  return watcher;
}
