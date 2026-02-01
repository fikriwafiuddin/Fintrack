import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.test.js"],
    testTimeout: 120000,
    hookTimeout: 120000,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/setup.js"],
    },
  },
})
