// Internacionalização (RIV-16, ADR-0001, DEC-RIV-011): solução nativa do Next.js,
// sem biblioteca. O idioma vem SOMENTE da URL (`/en`, `/pt`): sem detecção
// automática e sem cookie de preferência.

// Idiomas aceitos na URL. EN é o principal; PT é o português do Brasil (Fonte da
// Verdade §2.4). Qualquer outro valor em `[lang]` responde 404.
export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// Mapeamento slug da URL -> tag de idioma (BCP 47), em UM único lugar. Vale para
// `<html lang>` e para `hreflang`. `/pt` é SEMPRE português do Brasil.
export const LOCALE_TAGS = {
  en: "en",
  pt: "pt-BR",
} as const satisfies Record<Locale, string>;

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Caminho de uma página em um idioma. `path` deve começar com "/" (ou ficar vazio).
export function localePath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}
