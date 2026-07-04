#!/usr/bin/env node

import { Command } from "commander";
import { validateCommand } from "./commands/validate.js";
import { extractCommand } from "./commands/extract.js";
import { generateCommand } from "./commands/generate.js";

const program = new Command();

program
  .name("vte")
  .description("Vue Token Engine CLI")
  .version("1.0.0");

program
  .command("validate")
  .description("Validate token definitions")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .action(validateCommand);

program
  .command("extract")
  .description("Extract token paths for IDE integration")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .option("--json", "Output as JSON")
  .action(extractCommand);

program
  .command("generate")
  .description("Generate platform-specific code")
  .argument("[file]", "Token file path", "design-tokens.ts")
  .option("-p, --platform <platform>", "Target platform (web|mp|rn)", "web")
  .option("-o, --output <file>", "Output file path")
  .action(generateCommand);

program.parse();
