import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Throwng",
        short_name: "Throwng",
        display: "standalone",
        theme_color: "#0F1114",
        background_color: "#0F1114",
        description: "Song Drop&Pick",
        orientation: "portrait-primary",
        start_url: "/",
        prefer_related_applications: true,
        icons: [
          {
            src: "./icons/logo192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/logo192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./icons/logo192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "./icons/logo512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./icons/logo512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./icons/logo512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
