import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Sem `globals`, o React Testing Library não registra a limpeza sozinho.
afterEach(() => {
  cleanup();
});
