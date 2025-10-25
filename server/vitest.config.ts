import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    silent: true,
    include: ["src/**/*.test.ts"],
    exclude: ["dist/**/*"],
  },
});
