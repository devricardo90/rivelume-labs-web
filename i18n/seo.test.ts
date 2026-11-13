import { describe, expect, it } from "vitest";
import { buildAlternates } from "@/i18n/seo";

const base = new URL("https://example.com");

describe("canonical e hreflang", () => {
  it("não emite nada sem URL-base", () => {
    expect(buildAlternates("en", null)).toBeUndefined();
    expect(buildAlternates("pt", null)).toBeUndefined();
  });

  it("em /en: canonical em /en, alternates en, pt-BR e x-default em /en", () => {
    expect(buildAlternates("en", base)).toEqual({
      canonical: "https://example.com/en",
      languages: {
        en: "https://example.com/en",
        "pt-BR": "https://example.com/pt",
        "x-default": "https://example.com/en",
      },
    });
  });

  it("em /pt: canonical em /pt, mesmos alternates, x-default continua /en", () => {
    const alternates = buildAlternates("pt", base);

    expect(alternates?.canonical).toBe("https://example.com/pt");
    expect(alternates?.languages?.["x-default"]).toBe("https://example.com/en");
    expect(alternates?.languages?.["pt-BR"]).toBe("https://example.com/pt");
  });
});
