import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_TAGS, localePath } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

// Sitemap com as duas versões e seus alternates (ADR-0001, 6.2 item 4). Precisa
// de URLs absolutas: sem `SITE_URL` (DEC-RIV-008 pendente) fica vazio, em vez de
// publicar URLs inventadas.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return [];

  const abs = (path: string) => new URL(path, base).toString();
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_TAGS[locale]] = abs(localePath(locale));
  }

  return LOCALES.map((locale) => ({
    url: abs(localePath(locale)),
    alternates: { languages },
  }));
}
