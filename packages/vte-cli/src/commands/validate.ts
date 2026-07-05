import path from "path";
import { parseTokens } from "@vte-js/core";

export async function validateCommand(file: string) {
  const filePath = path.resolve(process.cwd(), file);

  console.log(`\n🔍 Validating tokens: ${filePath}\n`);

  try {
    const map = await parseTokens(filePath);

    console.log("✅ Token validation passed!\n");
    console.log(`   Total tokens: ${map.size}`);

    // 统计引用数量
    let refCount = 0;
    for (const [, token] of map) {
      if (token.refs.length > 0) refCount++;
    }
    console.log(`   References: ${refCount}`);
    console.log(`   Primitives: ${map.size - refCount}\n`);

    // 显示 token 树
    console.log("   Token tree:");
    const tree = buildTree(map);
    printTree(tree, "   ");

    process.exit(0);
  } catch (e) {
    console.error("❌ Validation failed:\n");
    console.error(`   ${(e as Error).message}\n`);
    process.exit(1);
  }
}

function buildTree(map: Map<string, { path: string; value: string }>) {
  const tree: Record<string, any> = {};

  for (const [path] of map) {
    const parts = path.split(".");
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = null;
  }

  return tree;
}

function printTree(obj: Record<string, any>, prefix: string, isLast = true) {
  const keys = Object.keys(obj);

  keys.forEach((key, index) => {
    const isLastKey = index === keys.length - 1;
    const connector = isLastKey ? "└── " : "├── ";
    const value = obj[key];

    if (value === null) {
      console.log(`${prefix}${connector}📦 ${key}`);
    } else {
      console.log(`${prefix}${connector}📁 ${key}/`);
      const newPrefix = prefix + (isLastKey ? "    " : "│   ");
      printTree(value, newPrefix, isLastKey);
    }
  });
}
