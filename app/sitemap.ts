import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/i18n/config";
import { buildLanguageAlternates } from "@/i18n/seo";
import { getIndexableSiteUrl } from "@/lib/indexing";

// Publica só as duas Homes, com os mesmos alternates do HTML (ADR-0001).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getIndexableSiteUrl();
  if (!base) return [];

  const languages = buildLanguageAlternates(base);

  return LOCALES.map((locale) => ({
    url: new URL(localePath(locale), base).toString(),
    alternates: { languages },
  }));
}
