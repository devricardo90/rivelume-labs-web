import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  localePath,
  type Locale,
} from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

// Versões de idioma de uma página (ADR-0001, P3 e P4): uma entrada por idioma,
// com a tag como chave, e `x-default` apontando para /en. Compartilhado pelos
// metadados das páginas e pelo sitemap, para os dois nunca divergirem.
export function buildLanguageAlternates(base: URL): Record<string, string> {
  const abs = (path: string) => new URL(path, base).toString();
  const languages: Record<string, string> = {};
  for (const item of LOCALES) {
    languages[LOCALE_TAGS[item]] = abs(localePath(item));
  }
  languages["x-default"] = abs(localePath(DEFAULT_LOCALE));
  return languages;
}

// `canonical` e `hreflang`: cada idioma aponta para si mesmo como canônico e
// para os outros como alternativas. Sem URL-base (`SITE_URL`) nada é emitido
// (ver lib/site-url.ts).
export function buildAlternates(
  locale: Locale,
  base: URL | null = getSiteUrl(),
): Metadata["alternates"] {
  if (!base) return undefined;

  return {
    canonical: new URL(localePath(locale), base).toString(),
    languages: buildLanguageAlternates(base),
  };
}
