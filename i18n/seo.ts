import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  localePath,
  type Locale,
} from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

// `canonical` e `hreflang` (ADR-0001, P3 e P4): cada idioma aponta para si mesmo
// como canônico e para os outros como alternativas; `x-default` aponta para /en.
// Sem URL-base (`SITE_URL`) nada é emitido (ver lib/site-url.ts).
export function buildAlternates(
  locale: Locale,
  base: URL | null = getSiteUrl(),
): Metadata["alternates"] {
  if (!base) return undefined;

  const abs = (path: string) => new URL(path, base).toString();
  const languages: Record<string, string> = {};
  for (const item of LOCALES) {
    languages[LOCALE_TAGS[item]] = abs(localePath(item));
  }
  languages["x-default"] = abs(localePath(DEFAULT_LOCALE));

  return { canonical: abs(localePath(locale)), languages };
}
