import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import plugin1 from "./plugins/plugin1";
import VitePluginVisualizer from "./plugins/pulgin2";

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  build:{
    outDir:'dist'
  },
  plugins: [
    react(),
    plugin1({
      port: 8080,
    }),
    VitePluginVisualizer(),
  ],
});
