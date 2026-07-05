import { parseTokens } from "@vte-js/core";
import path from "path";

async function main() {
  const tokenPath = path.resolve(__dirname, "design-tokens-circular.ts");

  try {
    await parseTokens(tokenPath);
    console.error("FAIL: Should have thrown circular reference error");
    process.exit(1);
  } catch (e: any) {
    if (e.message.includes("Circular reference detected")) {
      console.log("PASS:", e.message);
    } else {
      console.error("FAIL: Unexpected error:", e.message);
      process.exit(1);
    }
  }
}

main();
