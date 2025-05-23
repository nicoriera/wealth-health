import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Form and data handling
          "vendor-form": [
            "react-hook-form",
            "react-datepicker",
            "@tanstack/react-table",
          ],
          // State management
          "vendor-state": ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          // Utilities
          "vendor-utils": ["date-fns", "uuid", "i18next", "react-i18next"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable source maps for production debugging if needed
    sourcemap: true,
    // Additional optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
