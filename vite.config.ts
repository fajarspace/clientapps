import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Vite configuration
export default defineConfig({
  server: {
    proxy: {
      "/graphql": {
        target: "http://3.0.177.69:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": process.env, // Membuat environment variables tersedia di client-side
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "RisetFT",
        short_name: "RisetFT",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
