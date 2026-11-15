import { describe, expect, it } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { escapeHtml, renderNotFoundDocument } from "@/lib/not-found-html";
import { expectNoA11yViolations } from "@/test/a11y";

function parse(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

describe("Documento HTML da página 404 (RIV-37)", () => {
  it("declara <html lang> no idioma: en e pt-BR", () => {
    expect(
      parse(renderNotFoundDocument("en", en.notFound)).documentElement.lang,
    ).toBe("en");
    expect(
      parse(renderNotFoundDocument("pt", pt.notFound)).documentElement.lang,
    ).toBe("pt-BR");
  });

  it("é um documento completo: doctype, charset, viewport, título e noindex", () => {
    const html = renderNotFoundDocument("en", en.notFound);
    const doc = parse(html);

    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(doc.querySelector("meta[charset]")).toBeTruthy();
    expect(
      doc.querySelector('meta[name="viewport"]')?.getAttribute("content"),
    ).toContain("width=device-width");
    expect(
      doc.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("noindex");
    expect(doc.title).toBe("Page not found — Rivelume Labs");
  });

  it("tem main, um único h1 e o link para a página inicial do idioma", () => {
    const en404 = parse(renderNotFoundDocument("en", en.notFound));
    const pt404 = parse(renderNotFoundDocument("pt", pt.notFound));

    for (const doc of [en404, pt404]) {
      expect(doc.querySelectorAll("main")).toHaveLength(1);
      expect(doc.querySelectorAll("h1")).toHaveLength(1);
    }
    expect(en404.querySelector("h1")?.textContent).toBe(
      "This page does not exist.",
    );
    expect(pt404.querySelector("h1")?.textContent).toBe(
      "Esta página não existe.",
    );
    expect(en404.querySelector("a.btn")?.getAttribute("href")).toBe("/en");
    expect(pt404.querySelector("a.btn")?.getAttribute("href")).toBe("/pt");
    expect(pt404.querySelector("a.btn")?.textContent).toBe("Voltar ao início");
  });

  it("não usa JavaScript nem recursos externos (autossuficiente)", () => {
    const html = renderNotFoundDocument("en", en.notFound);

    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/https?:\/\//);
    expect(html).not.toMatch(/<link[^>]+rel="stylesheet"/i);
  });

  it("escapa o texto vindo dos dicionários", () => {
    const html = renderNotFoundDocument("en", {
      ...en.notFound,
      headingLead: '<img src=x onerror="alert(1)">',
      body: "a & b",
    });

    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    expect(html).toContain("a &amp; b");
    expect(escapeHtml(`<>&"'`)).toBe("&lt;&gt;&amp;&quot;&#39;");
  });

  it("respeita prefers-reduced-motion", () => {
    expect(renderNotFoundDocument("en", en.notFound)).toContain(
      "@media (prefers-reduced-motion:reduce)",
    );
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (locale, dictionary) => {
      const doc = parse(renderNotFoundDocument(locale, dictionary.notFound));
      const container = document.createElement("div");
      container.innerHTML = doc.body.innerHTML;
      document.body.appendChild(container);

      await expectNoA11yViolations(container);
      container.remove();
    },
  );
});
