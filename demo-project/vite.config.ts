import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte/vite-plugin";

export default defineConfig({
  plugins: [
    vue(),
    vte({
      tokenFile: "design-tokens.ts",
      platform: "web",
    }),
  ],
  resolve: {
    alias: {
      "@vte/core": "/Volumes/data1/work/office/ai/vte/packages/vte-core/src/index.ts",
      "@vte/vite-plugin": "/Volumes/data1/work/office/ai/vte/packages/vte-vite-plugin/src/index.ts",
    },
  },
});
