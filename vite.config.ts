import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const vitePwa = VitePWA({
  devOptions: {
    enabled: true,
  },
  registerType: "autoUpdate",
  outDir: "dist",
  manifest: {
    name: "Workouts Note App",
    short_name: "WNApp",
    description: "Remember your workouts!",
    theme_color: "#fff",
    display: "standalone",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePwa],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
