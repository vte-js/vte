import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vte from "@vte-js/vite-plugin";

export default defineConfig({
  plugins: [vue(), vte()],
  build: {
    sourcemap: true,
  },
});
