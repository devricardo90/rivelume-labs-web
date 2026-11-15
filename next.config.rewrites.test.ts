// @ts-expect-error -- módulo compilado do Next.js, sem declaração de tipos.
import { pathToRegexp } from "next/dist/compiled/path-to-regexp";
import { describe, expect, it } from "vitest";
import nextConfig, { NOT_FOUND_REWRITES } from "./next.config";

// O Next.js compila os `source` SEM diferenciar maiúsculas; este teste usa o mesmo
// compilador para provar quais caminhos são desviados para a página 404 com `lang`.
function rewriteFor(path: string): string | null {
  for (const rule of NOT_FOUND_REWRITES) {
    const match = pathToRegexp(rule.source).exec(path);
    if (match) {
      // Substitui `:lang` pelo valor casado, como o Next.js faz.
      return rule.destination.replace(":lang", match[1] ?? "");
    }
  }
  return null;
}

describe("next.config: reescritas do 404 com lang (RIV-37)", () => {
  it("desvia caminhos desconhecidos para /error-404/<idioma>", () => {
    expect(rewriteFor("/fr")).toBe("/error-404/en");
    expect(rewriteFor("/foo/bar")).toBe("/error-404/en");
    expect(rewriteFor("/pt-br")).toBe("/error-404/en");
    expect(rewriteFor("/foo.js")).toBe("/error-404/en");
    expect(rewriteFor("/en/x")).toBe("/error-404/en");
    expect(rewriteFor("/pt/x")).toBe("/error-404/pt");
    expect(rewriteFor("/pt/a/b/c")).toBe("/error-404/pt");
    expect(rewriteFor("/en/privacy/x")).toBe("/error-404/en");
    expect(rewriteFor("/pt/privacy/x")).toBe("/error-404/pt");
  });

  it("NÃO desvia as páginas reais nem os caminhos internos", () => {
    for (const path of [
      "/en",
      "/pt",
      "/en/privacy",
      "/pt/privacy",
      "/_next/static/chunks/a.js",
      "/error-404/en",
      "/error-404/pt",
    ]) {
      expect(rewriteFor(path)).toBeNull();
    }
  });

  it("não deixa o primeiro segmento 'en' ou 'pt' passar como 'desconhecido'", () => {
    // Regressão: `(?!en$|pt$)` só protegia a URL exata; /en/privacy era desviada.
    expect(rewriteFor("/en/privacy")).toBeNull();
    expect(rewriteFor("/pt/privacy")).toBeNull();
  });

  it("usa reescritas `afterFiles` (arquivos de public/ e páginas prerenderizadas vêm antes)", async () => {
    const rewrites = (await nextConfig.rewrites?.()) as {
      beforeFiles: unknown[];
      afterFiles: unknown[];
      fallback: unknown[];
    };

    expect(rewrites.beforeFiles).toEqual([]);
    expect(rewrites.afterFiles).toEqual(NOT_FOUND_REWRITES);
    expect(rewrites.fallback).toEqual([]);
  });

  it("não ativa recurso experimental (globalNotFound exige aprovação do Owner)", () => {
    expect(nextConfig.experimental).toBeUndefined();
  });
});
