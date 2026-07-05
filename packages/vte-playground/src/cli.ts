#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs";
import { parseTokens } from "@vte-js/core";
import {
  generatePlaygroundComponent,
  generatePlaygroundEntry,
  generatePlaygroundHtml,
  generateViteConfig,
  generatePackageJson,
} from "./generator.js";
import { getCachedResult, setCacheResult, clearCache } from "./cache.js";

const program = new Command();

program
  .name("vte-playground")
  .description("Generate and launch VTE playground for visual debugging")
  .version("1.0.0");

async function generate(tokenFile: string, outputDir: string, cssPrefix: string): Promise<number> {
  clearCache(tokenFile);
  const tokenMap = await parseTokens(tokenFile);
  const vueContent = generatePlaygroundComponent(tokenMap, cssPrefix);
  setCacheResult(tokenFile, tokenMap, vueContent);

  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, "Playground.vue"), vueContent);
  fs.writeFileSync(path.join(outputDir, "main.ts"), generatePlaygroundEntry());
  fs.writeFileSync(path.join(outputDir, "index.html"), generatePlaygroundHtml());
  fs.writeFileSync(path.join(outputDir, "vite.config.ts"), generateViteConfig(process.cwd(), tokenFile, cssPrefix));
  fs.writeFileSync(path.join(outputDir, "package.json"), generatePackageJson(path.basename(process.cwd())));

  return tokenMap.size;
}

program
  .command("start")
  .description("Generate and start playground")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .option("-o, --output <dir>", "Output directory", ".vte-playground")
  .option("-p, --prefix <prefix>", "CSS variable prefix", "vte")
  .option("-w, --watch", "Watch token file for changes and auto-regenerate")
  .action(async (file, options) => {
    const tokenFile = path.resolve(process.cwd(), file);
    const outputDir = path.resolve(process.cwd(), options.output);
    const cssPrefix = options.prefix;

    console.log(`\n🔧 VTE Playground Generator\n`);
    console.log(`Token file: ${tokenFile}`);
    console.log(`Output dir: ${outputDir}`);
    console.log(`CSS prefix: ${cssPrefix}\n`);

    try {
      console.log("📖 Reading tokens...");
      const count = await generate(tokenFile, outputDir, cssPrefix);
      console.log(`   Found ${count} tokens\n`);
      console.log(`✅ Playground generated at ${outputDir}\n`);

      if (options.watch) {
        const { startWatcher } = await import("./watcher.js");
        startWatcher({
          file: tokenFile,
          onChange: async () => {
            const newCount = await generate(tokenFile, outputDir, cssPrefix);
            console.log(`   ${newCount} tokens`);
          },
        });
        await new Promise<void>(() => {});
      } else {
        console.log("To start:");
        console.log(`  cd ${options.output}`);
        console.log("  pnpm install");
        console.log("  pnpm dev\n");
      }
    } catch (e) {
      console.error(`\n❌ Error: ${(e as Error).message}\n`);
      process.exit(1);
    }
  });

program
  .command("generate")
  .description("Generate playground files without starting")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .option("-o, --output <dir>", "Output directory", ".vte-playground")
  .option("-p, --prefix <prefix>", "CSS variable prefix", "vte")
  .action(async (file, options) => {
    const tokenFile = path.resolve(process.cwd(), file);
    const outputDir = path.resolve(process.cwd(), options.output);
    const cssPrefix = options.prefix;

    console.log(`\n📝 Generating VTE Playground...\n`);

    try {
      const count = await generate(tokenFile, outputDir, cssPrefix);
      console.log(`✅ Generated ${count} tokens → ${outputDir}/`);
    } catch (e) {
      console.error(`\n❌ Error: ${(e as Error).message}\n`);
      process.exit(1);
    }
  });

program.parse();
