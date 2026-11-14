import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Os tokens da V4 Red Pen vivem em CSS (app/globals.css). O jsdom não aplica o
// Tailwind, então estes testes leem o arquivo e conferem os VALORES aprovados
// (V4-RedPen.dc.html, SHA-256 faedd2d4...a367). A conferência visual no Chrome
// fica registrada no Jira da tarefa.
const css = readFileSync(path.join(import.meta.dirname, "globals.css"), "utf8");

function token(name: string): string | undefined {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return match?.[1].trim().toLowerCase();
}

describe("Tokens da V4 Red Pen (globals.css)", () => {
  it.each([
    ["color-paper", "#f5f0e4"],
    ["color-ink", "#1d1a17"],
    ["color-burgundy", "#6b3343"],
    ["color-burgundy-deep", "#3f1624"],
    ["color-red-pen", "#c8231d"],
    ["color-highlight", "#f6e24b"],
    ["color-rose", "#e9c3cd"],
    ["color-muted", "#5b544b"],
    ["color-body", "#3b362f"],
    ["color-sheet", "#fffdf6"],
    ["color-rule", "#d6cdb5"],
    ["color-dash", "#cfc6ae"],
  ])("define %s = %s", (name, value) => {
    expect(token(name)).toBe(value);
  });

  it("define as sombras duras com os tamanhos da V4 (6px e 9px)", () => {
    expect(token("shadow-hard-burgundy")).toBe(
      "6px 6px 0 var(--color-burgundy)",
    );
    expect(token("shadow-hard-burgundy-lg")).toBe(
      "9px 9px 0 var(--color-burgundy)",
    );
    expect(token("shadow-hard-ink")).toBe("6px 6px 0 var(--color-ink)");
    expect(token("shadow-hard-ink-lg")).toBe("9px 9px 0 var(--color-ink)");
  });

  it("mapeia as quatro famílias da V4 às variáveis do next/font", () => {
    expect(token("font-serif")).toContain("var(--font-fraunces)");
    expect(token("font-sans")).toContain("var(--font-instrument-sans)");
    expect(token("font-mono")).toContain("var(--font-geist-mono)");
    expect(token("font-hand")).toContain("var(--font-caveat)");
  });

  it("não traz Courier Prime nem os tokens da V3", () => {
    expect(css.toLowerCase()).not.toContain("courier");
    expect(css).not.toContain("#631227");
    expect(css).not.toContain("#FAFAF7");
  });

  it("define foco de 3px em Red Pen, com Highlight em TODOS os tons escuros", () => {
    expect(css).toMatch(
      /:focus-visible\s*{[^}]*outline:\s*3px solid var\(--color-red-pen\)/,
    );
    expect(css).toMatch(/outline-offset:\s*3px/);
    for (const tone of ["burgundy", "burgundy-deep", "ink"]) {
      expect(css).toContain(`[data-tone="${tone}"] :focus-visible`);
    }
    // O mesmo bloco troca a cor para Highlight (a regra com os três seletores).
    expect(css).toMatch(
      /\[data-tone="burgundy"\] :focus-visible,\s*\[data-tone="burgundy-deep"\] :focus-visible,\s*\[data-tone="ink"\] :focus-visible\s*{\s*outline-color:\s*var\(--color-highlight\)/,
    );
  });

  it("resolve as famílias de fonte no ponto de uso (@theme inline)", () => {
    // Sem `inline`, o Tailwind congelaria var(--font-*) na raiz, antes de o
    // next/font definir as variáveis no <html>, e as fontes não aplicariam.
    expect(css).toMatch(/@theme inline\s*{[^}]*--font-serif:/);
    expect(css).toMatch(/@theme inline\s*{[^}]*--font-hand:/);
  });

  it("define o marcador amarelo da V4 entre 58% e 94% da altura, com varredura", () => {
    expect(css).toMatch(/\.marker\s*{[^}]*var\(--color-highlight\) 58%/);
    expect(css).toMatch(/\.marker\s*{[^}]*transparent 94%/);
    expect(css).toMatch(
      /\.marker-sweep\s*{[^}]*animation:\s*marker-sweep 1s 0\.4s/,
    );
    expect(css).toMatch(
      /@keyframes marker-sweep\s*{[\s\S]*?background-size:\s*100% 100%/,
    );
  });

  it("desliga animações e transições com prefers-reduced-motion", () => {
    const block = css.match(
      /@media \(prefers-reduced-motion: reduce\)\s*{[\s\S]*?}\s*}/,
    )?.[0];
    expect(block).toBeDefined();
    expect(block).toContain("animation: none !important");
    expect(block).toContain("transition: none !important");
  });

  it("não declara o esquema escuro automático", () => {
    expect(css).toMatch(/color-scheme:\s*light;/);
    expect(css).not.toContain("light dark");
  });
});
