// playground/test-parse.ts
import { parseTokens } from "@vte/core";
import path from "path";
async function main() {
    const tokenPath = path.resolve(__dirname, "design-tokens.ts");
    try {
        const tokenMap = await parseTokens(tokenPath);
        // 验证一下引用是否被正确解析
        const buttonHeight = tokenMap.get("component.button.height");
        console.log("\n🔍 Verification:");
        console.log(`component.button.height resolves to: ${buttonHeight?.value}`);
        // 期望输出: 0.5rem
    }
    catch (e) {
        console.error(e);
    }
}
main();
