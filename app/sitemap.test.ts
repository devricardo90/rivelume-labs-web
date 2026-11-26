import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { enableIndexingFixture, SEO_ORIGIN } from "@/test/seo-env";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Sitemap", () => {
  it("fica vazio sem SITE_URL, em vez de inventar URLs", () => {
    vi.stubEnv("SITE_URL", "");

    expect(sitemap()).toEqual([]);
  });

  it("lista só as duas Homes com os mesmos alternates após a liberação", () => {
    enableIndexingFixture();

    const entries = sitemap();
    expect(entries.map((entry) => entry.url)).toEqual([
      `${SEO_ORIGIN}/en`,
      `${SEO_ORIGIN}/pt`,
    ]);
    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: `${SEO_ORIGIN}/en`,
        "pt-BR": `${SEO_ORIGIN}/pt`,
        "x-default": `${SEO_ORIGIN}/en`,
      });
    }
  });
});
