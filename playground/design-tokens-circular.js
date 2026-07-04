import { defineTokens } from "@vte/core";
export default defineTokens({
    a: { x: "{b.y}" },
    b: { y: "{a.x}" },
});
