import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";
import { enableIndexingFixture, SEO_HOST, SEO_ORIGIN } from "@/test/seo-env";
import { getIndexableSiteUrl } from "./indexing";

afterEach(() => vi.unstubAllEnvs());

describe("Indexação do website", () => {
  it.each([
    ["NODE_ENV", "development"],
    ["VERCEL_ENV", "preview"],
    ["VERCEL_ENV", undefined],
    ["SEO_INDEXING_ENABLED", undefined],
    ["SEO_INDEXING_ENABLED", "1"],
    ["SEO_CANONICAL_HOST", undefined],
    ["SITE_URL", undefined],
    ["SITE_URL", "not-a-url"],
    ["SITE_URL", "https://other.riv40-fixture.dev"],
    ["SITE_URL", `http://${SEO_HOST}`],
    ["SITE_URL", `${SEO_ORIGIN}/preview`],
    ["SITE_URL", `${SEO_ORIGIN}:443`],
    ["SITE_URL", `https://user@${SEO_HOST}`],
  ])("continua bloqueada com %s = %s", async (name, value) => {
    enableIndexingFixture();
    vi.stubEnv(name, value);

    expect(getIndexableSiteUrl()).toBeNull();
    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: "*", allow: "/" } });
    const rules = await nextConfig.headers?.();
    expect(rules?.[0].headers).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex",
    });
  });

  it.each(["localhost", "example.com", "project.vercel.app", "127.0.0.1"])(
    "rejeita a origem provisória %s mesmo se as variáveis concordarem",
    (host) => {
      enableIndexingFixture();
      vi.stubEnv("SEO_CANONICAL_HOST", host);
      vi.stubEnv("SITE_URL", `https://${host}`);
      expect(getIndexableSiteUrl()).toBeNull();
    },
  );

  it("anuncia o sitemap oficial somente após a liberação", () => {
    enableIndexingFixture();
    expect(getIndexableSiteUrl()?.origin).toBe(SEO_ORIGIN);
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${SEO_ORIGIN}/sitemap.xml`,
    });
  });
});
