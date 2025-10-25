import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/schemas": path.resolve(__dirname, "./src/schemas"),
      "@/test": path.resolve(__dirname, "./src/test"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    silent: true,
    include: ["src/**/*.test.ts"],
    exclude: ["dist/**/*"],
  },
});
