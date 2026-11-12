import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/i18n/config";
import { buildLanguageAlternates } from "@/i18n/seo";
import { getSiteUrl } from "@/lib/site-url";

// Sitemap com as duas versões e os mesmos alternates das páginas, incluindo
// `x-default` (ADR-0001, 6.2 item 4). Precisa
// de URLs absolutas: sem `SITE_URL` (DEC-RIV-008 pendente) fica vazio, em vez de
// publicar URLs inventadas.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return [];

  const languages = buildLanguageAlternates(base);

  return LOCALES.map((locale) => ({
    url: new URL(localePath(locale), base).toString(),
    alternates: { languages },
  }));
}
