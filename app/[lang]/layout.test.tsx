import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
// O next/font só funciona dentro do compilador do Next.js; no Vitest o módulo de
// fontes é substituído por um valor fixo. As fontes reais são verificadas no
// build e no Chrome.
vi.mock("@/app/[lang]/fonts", () => ({
  fontVariables: "font-mock-fraunces font-mock-sans",
}));

import LocaleLayout, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/[lang]/layout";

const params = (lang: string) => Promise.resolve({ lang });

// `notFound()` lança um erro cujo `digest` identifica o 404 do Next.js.
const notFoundError = { digest: expect.stringContaining("404") };

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Layout por idioma", () => {
  it("gera as rotas estáticas /en e /pt e recusa outros idiomas", () => {
    expect(generateStaticParams()).toEqual([{ lang: "en" }, { lang: "pt" }]);
    expect(dynamicParams).toBe(false);
  });

  it("usa lang=en em /en e lang=pt-BR em /pt no <html>", async () => {
    const en = renderToStaticMarkup(
      await LocaleLayout({ children: <p>x</p>, params: params("en") }),
    );
    const pt = renderToStaticMarkup(
      await LocaleLayout({ children: <p>x</p>, params: params("pt") }),
    );

    expect(en).toContain('<html lang="en"');
    expect(pt).toContain('<html lang="pt-BR"');
  });

  it("aplica as variáveis das fontes da V4 no <html>", async () => {
    const html = renderToStaticMarkup(
      await LocaleLayout({ children: <p>x</p>, params: params("en") }),
    );

    expect(html).toContain('class="font-mock-fraunces font-mock-sans"');
  });

  it("começa o <body> pelo link de pular para o conteúdo, no idioma atual", async () => {
    const en = renderToStaticMarkup(
      await LocaleLayout({ children: <p>x</p>, params: params("en") }),
    );
    const pt = renderToStaticMarkup(
      await LocaleLayout({ children: <p>x</p>, params: params("pt") }),
    );

    expect(en).toMatch(/<body><a href="#main"[^>]*>Skip to content<\/a>/);
    expect(pt).toMatch(/<body><a href="#main"[^>]*>Ir para o conteúdo<\/a>/);
  });

  it("renderiza cabeçalho, conteúdo e rodapé nesta ordem, no idioma atual", async () => {
    const en = renderToStaticMarkup(
      await LocaleLayout({ children: <main>x</main>, params: params("en") }),
    );
    const pt = renderToStaticMarkup(
      await LocaleLayout({ children: <main>x</main>, params: params("pt") }),
    );

    for (const html of [en, pt]) {
      expect(html.indexOf("<header")).toBeGreaterThan(html.indexOf("<body"));
      expect(html.indexOf("<main")).toBeGreaterThan(html.indexOf("<header"));
      expect(html.indexOf("<footer")).toBeGreaterThan(html.indexOf("<main"));
    }
    expect(en).toContain('href="/en"');
    expect(en).toContain('aria-label="Rivelume Labs, back to top"');
    expect(en).toContain('aria-label="Primary"');
    expect(pt).toContain('href="/pt"');
    expect(pt).toContain('aria-label="Rivelume Labs, voltar ao início"');
    expect(pt).toContain('aria-label="Principal"');
    expect(pt).toContain("Política de Privacidade (em breve)");
  });

  it("responde 404 para idioma desconhecido (layout e metadados)", async () => {
    await expect(
      LocaleLayout({ children: null, params: params("fr") }),
    ).rejects.toMatchObject(notFoundError);
    await expect(
      generateMetadata({ params: params("fr") }),
    ).rejects.toMatchObject(notFoundError);
  });

  it("define título e descrição não vazios em cada idioma", async () => {
    const en = await generateMetadata({ params: params("en") });
    const pt = await generateMetadata({ params: params("pt") });

    expect(en.title).toBe("Rivelume Labs");
    expect(en.description).toBe("Rivelume Labs website (under construction).");
    expect(pt.title).toBe("Rivelume Labs");
    expect(pt.description).toBe("Site da Rivelume Labs (em construção).");
  });

  it("não emite canonical nem hreflang sem SITE_URL", async () => {
    vi.stubEnv("SITE_URL", "");

    const metadata = await generateMetadata({ params: params("en") });
    expect(metadata.alternates).toBeUndefined();
  });

  it("emite canonical e hreflang quando SITE_URL está definida", async () => {
    vi.stubEnv("SITE_URL", "https://example.com");

    const metadata = await generateMetadata({ params: params("pt") });
    expect(metadata.alternates).toEqual({
      canonical: "https://example.com/pt",
      languages: {
        en: "https://example.com/en",
        "pt-BR": "https://example.com/pt",
        "x-default": "https://example.com/en",
      },
    });
  });
});
