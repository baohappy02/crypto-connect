import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as path from "path";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), dts({ include: ["lib"] })],
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "crypto-connect",
      fileName: (format) => `crypto-connect.${format}.ts`,
    },
    rollupOptions: {
      external: [
        "@solana/wallet-adapter-base",
        "@solana/web3.js",
        "@vueuse/core",
        "vue",
      ],
      output: {
        exports: "named",
        globals: {
          "@solana/wallet-adapter-base": "SolanaWalletAdapterBase",
          "@solana/web3.js": "SolanaWeb3",
          "@vueuse/core": "VueUseCore",
          vue: "Vue",
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});
