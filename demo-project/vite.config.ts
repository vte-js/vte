import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte({
      tokenFile: "design-tokens.ts",
      platform: "web",
      sourcemap: true, // 可选: true | "inline" | "hidden" | false
      output: {
        // 可自定义前缀：prefix: "design-tokens"
        // 可禁用特定输出：types: false, css: false, agentJson: false
      },
    }),
  ],
  build: {
    sourcemap: true, // Vite 构建 sourcemap
  },
  resolve: {
    alias: {
      "@vte/core": "/Volumes/data1/work/office/ai/vte/packages/vte-core/src/index.ts",
      "@vte/vite-plugin": "/Volumes/data1/work/office/ai/vte/packages/vte-vite-plugin/src/index.ts",
    },
  },
});
