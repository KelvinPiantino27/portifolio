import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset URLs relative, so the build works from a GitHub Pages
// project subpath (thenivlek.github.io/portifolio/) without hardcoding it.
export default defineConfig({
  plugins: [react()],
  base: "./",
  // dist/, not docs/: docs/ holds the written documentation, and emptyOutDir
  // would wipe it on every build. Deploy is by GitHub Actions artifact.
  build: { outDir: "dist", emptyOutDir: true },
});
