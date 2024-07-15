import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { writeFileSync } from "fs";

export default defineConfig({
  plugins: [
    preact(),
    {
      name: "copy-manifest",
      writeBundle() {
        writeFileSync(
          resolve(__dirname, "dist/manifest.json"),
          JSON.stringify(require("./src/manifest.json"), null, 2)
        );
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: "src/index.html",
      },
    },
  },
});
