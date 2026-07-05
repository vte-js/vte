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

program
  .command("start")
  .description("Generate and start playground")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .option("-o, --output <dir>", "Output directory", ".vte-playground")
  .option("-p, --prefix <prefix>", "CSS variable prefix", "vte")
  .action(async (file, options) => {
    const tokenFile = path.resolve(process.cwd(), file);
    const outputDir = path.resolve(process.cwd(), options.output);
    const cssPrefix = options.prefix;

    console.log(`\n🔧 VTE Playground Generator\n`);
    console.log(`Token file: ${tokenFile}`);
    console.log(`Output dir: ${outputDir}`);
    console.log(`CSS prefix: ${cssPrefix}\n`);

    // 1. 读取 token 文件
    try {
      console.log("📖 Reading tokens...");
      const cached = getCachedResult(tokenFile);
      let tokenMap, vueContent;

      if (cached) {
        console.log("   Using cached tokens");
        tokenMap = cached.tokenMap;
        vueContent = generatePlaygroundComponent(tokenMap, cssPrefix);
      } else {
        tokenMap = await parseTokens(tokenFile);
        vueContent = generatePlaygroundComponent(tokenMap, cssPrefix);
        setCacheResult(tokenFile, tokenMap, vueContent);
      }
      console.log(`   Found ${tokenMap.size} tokens\n`);

      // 2. 创建输出目录
      fs.mkdirSync(outputDir, { recursive: true });

      // 3. 生成文件
      console.log("📝 Generating files...");

      // Playground.vue
      fs.writeFileSync(path.join(outputDir, "Playground.vue"), vueContent);
      console.log("   ✅ Playground.vue");

      // main.ts
      const mainContent = generatePlaygroundEntry();
      fs.writeFileSync(path.join(outputDir, "main.ts"), mainContent);
      console.log("   ✅ main.ts");

      // index.html
      const htmlContent = generatePlaygroundHtml();
      fs.writeFileSync(path.join(outputDir, "index.html"), htmlContent);
      console.log("   ✅ index.html");

      // vite.config.ts
      const viteConfig = generateViteConfig(process.cwd(), cssPrefix);
      fs.writeFileSync(path.join(outputDir, "vite.config.ts"), viteConfig);
      console.log("   ✅ vite.config.ts");

      // package.json
      const projectName = path.basename(process.cwd());
      const packageJson = generatePackageJson(projectName);
      fs.writeFileSync(path.join(outputDir, "package.json"), packageJson);
      console.log("   ✅ package.json");

      console.log(`\n✅ Playground generated at ${outputDir}\n`);
      console.log("To start:");
      console.log(`  cd ${options.output}`);
      console.log("  pnpm install");
      console.log("  pnpm dev\n");

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
      const cached = getCachedResult(tokenFile);
      let tokenMap, vueContent;

      if (cached) {
        tokenMap = cached.tokenMap;
        vueContent = generatePlaygroundComponent(tokenMap, cssPrefix);
      } else {
        tokenMap = await parseTokens(tokenFile);
        vueContent = generatePlaygroundComponent(tokenMap, cssPrefix);
        setCacheResult(tokenFile, tokenMap, vueContent);
      }

      fs.mkdirSync(outputDir, { recursive: true });

      fs.writeFileSync(path.join(outputDir, "Playground.vue"), vueContent);
      fs.writeFileSync(path.join(outputDir, "main.ts"), generatePlaygroundEntry());
      fs.writeFileSync(path.join(outputDir, "index.html"), generatePlaygroundHtml());
      fs.writeFileSync(path.join(outputDir, "vite.config.ts"), generateViteConfig(process.cwd(), cssPrefix));
      fs.writeFileSync(path.join(outputDir, "package.json"), generatePackageJson(path.basename(process.cwd())));

      console.log(`✅ Generated ${tokenMap.size} tokens → ${outputDir}/`);
    } catch (e) {
      console.error(`\n❌ Error: ${(e as Error).message}\n`);
      process.exit(1);
    }
  });

program.parse();
