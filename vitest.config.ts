import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@vte/core": path.resolve(__dirname, "packages/vte-core/src/index.ts"),
      "@vte/vite-plugin": path.resolve(
        __dirname,
        "packages/vte-vite-plugin/src/index.ts",
      ),
    },
  },
});
