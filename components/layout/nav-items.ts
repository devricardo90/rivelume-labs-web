import type { Dictionary } from "@/i18n/dictionary";

// Itens da navegação da V4 (DEC-RIV-012): Services, Work, Process, About e
// Contact, SEM "Home". `id` é o destino (âncora) na página inicial; `label`
// aponta a chave do dicionário. As seções de destino chegam nas tarefas
// seguintes da Sprint 3 (RIV-31 em diante).
export const NAV_ITEMS = [
  { id: "services", label: "services" },
  { id: "work", label: "work" },
  { id: "process", label: "process" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
] as const satisfies ReadonlyArray<{
  id: string;
  label: keyof Dictionary["nav"];
}>;
