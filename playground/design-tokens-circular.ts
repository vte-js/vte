import { defineTokens } from "@vte-js/core";

export default defineTokens({
  a: { x: "{b.y}" },
  b: { y: "{a.x}" },
});
