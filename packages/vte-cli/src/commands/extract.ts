import path from "path";
import { parseTokens } from "@vte/core";

interface ExtractOptions {
  json?: boolean;
}

export async function extractCommand(file: string, options: ExtractOptions) {
  const filePath = path.resolve(process.cwd(), file);

  try {
    const map = await parseTokens(filePath);
    const paths: string[] = [];

    for (const [tokenPath] of map) {
      paths.push(tokenPath);
    }

    if (options.json) {
      // JSON 格式输出
      const result: Record<string, any> = {};

      for (const [tokenPath, token] of map) {
        result[tokenPath] = {
          value: token.value,
          raw: token.raw,
          refs: token.refs,
        };
      }

      console.log(JSON.stringify(result, null, 2));
    } else {
      // 列表格式输出
      console.log(`\n📋 Token paths (${paths.length} total):\n`);

      // 按层级分组
      const groups: Record<string, string[]> = {};

      for (const p of paths) {
        const parts = p.split(".");
        const group = parts.length > 1 ? parts[0] : "(root)";

        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(p);
      }

      for (const [group, groupPaths] of Object.entries(groups)) {
        console.log(`  ${group}/`);
        for (const p of groupPaths) {
          const token = map.get(p);
          const display = token?.refs.length ? ` → ${token.refs[0]}` : ` = ${token?.value}`;
          console.log(`    ${p.split(".").slice(1).join(".")}${display}`);
        }
        console.log();
      }
    }

    process.exit(0);
  } catch (e) {
    console.error(`\n❌ Error: ${(e as Error).message}\n`);
    process.exit(1);
  }
}
