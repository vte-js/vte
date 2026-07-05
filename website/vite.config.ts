import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    // Ensure all routes fallback to index.html for client-side routing
    fs: {
      allow: [".."],
    },
  },
});
