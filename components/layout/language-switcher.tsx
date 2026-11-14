"use client";

import { useSyncExternalStore } from "react";
import { TextLink } from "@/components/ui/text-link";
import { LOCALES, LOCALE_TAGS, localePath, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  current: Locale;
  // Nome acessível do seletor, no idioma atual (vem do dicionário).
  label: string;
  // Cada idioma escrito no próprio idioma: nome acessível de cada link.
  names: Record<Locale, string>;
  // Código visível de cada idioma (EN | PT).
  codes: Record<Locale, string>;
};

// A seção atual é o hash da URL (`#services`). Lida no cliente: no servidor e na
// hidratação o hash é vazio, então o HTML inicial é o mesmo e o link passa a
// incluir a seção logo após a hidratação. Sem estado próprio nem cookie.
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}
const getHash = () => window.location.hash;
const getServerHash = () => "";

// Seletor de idioma (ADR-0001, 6.2 item 6): links comuns para a mesma página no
// outro idioma, acessíveis por teclado e sem cookie; o idioma só muda pela URL.
// Preserva a seção atual (`/pt#services`). O idioma atual fica com o sublinhado
// Red Pen fixo (`aria-current`).
export function LanguageSwitcher({
  current,
  label,
  names,
  codes,
}: LanguageSwitcherProps) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);

  return (
    <nav aria-label={label}>
      <ul className="m-0 flex list-none items-center p-0 font-mono text-xs tracking-[0.16em] text-muted uppercase [&>li+li]:border-l [&>li+li]:border-rule">
        {LOCALES.map((locale) => (
          <li key={locale}>
            <TextLink
              href={`${localePath(locale)}${hash}`}
              lang={LOCALE_TAGS[locale]}
              hrefLang={LOCALE_TAGS[locale]}
              aria-label={names[locale]}
              aria-current={locale === current ? "true" : undefined}
              className="mx-1 min-h-11 min-w-11 px-2 text-center aria-[current=true]:border-red-pen aria-[current=true]:text-ink"
            >
              {codes[locale]}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
