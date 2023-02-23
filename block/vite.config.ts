import solid from "solid-start/vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `${uvPath}/.`.replace(/\\/g, "/"),
          dest: "uv"
        },
        {
          src: "public/uv/uv.config.js",
          dest: "uv"
        }
      ]
    }),
    solid({ ssr: false })
  ],
  server: {
    proxy: {
      "/bare": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/bare/, "")
      }
    }
  }
});
