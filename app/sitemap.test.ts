import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Sitemap", () => {
  it("fica vazio sem SITE_URL, em vez de inventar URLs", () => {
    vi.stubEnv("SITE_URL", "");

    expect(sitemap()).toEqual([]);
  });

  it("lista as duas versões com os alternates quando há SITE_URL", () => {
    vi.stubEnv("SITE_URL", "https://example.com");

    const entries = sitemap();
    expect(entries.map((entry) => entry.url)).toEqual([
      "https://example.com/en",
      "https://example.com/pt",
    ]);
    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: "https://example.com/en",
        "pt-BR": "https://example.com/pt",
      });
    }
  });
});
