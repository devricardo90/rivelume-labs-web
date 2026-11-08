import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

// Testes unitários e de componentes (RIV-18). Vitest 5 + jsdom + React Testing Library.
// O JSX usa a configuração do tsconfig (`jsx: react-jsx`), portanto não há plugin do React.
// Server Components assíncronos não são suportados pelo Vitest; teriam teste E2E (RIV-6).
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname) },
  },
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, ".next/**"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
