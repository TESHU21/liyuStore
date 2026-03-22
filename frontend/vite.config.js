import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle analysis plugin (will be used when installed)
const bundleAnalyzer = () => {
  try {
    return import("rollup-plugin-visualizer").then(({ visualizer }) =>
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
    );
  } catch {
    console.log(
      "Bundle analyzer not installed. Run: npm install rollup-plugin-visualizer",
    );
    return null;
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Add bundle analyzer when ANALYZE=true
      ...(env.ANALYZE === "true" ? [bundleAnalyzer()].filter(Boolean) : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // remove console.log
          drop_debugger: true,
        },
      },
      // Performance budgets
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            redux: ["@reduxjs/toolkit", "react-redux"],
            ui: ["@radix-ui/react-slot", "@radix-ui/react-dialog"],
            utils: ["axios", "date-fns", "zod"],
          },
        },
      },

      // Set performance budgets
      chunkSizeWarningLimit: 1000, // 1MB warning
      assetsInlineLimit: 4096, // 4KB inline limit
    },
  };
});
