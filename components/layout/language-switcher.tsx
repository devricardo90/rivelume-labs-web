import Link from "next/link";
import { LOCALES, LOCALE_TAGS, localePath, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  current: Locale;
  // Nome acessível do seletor, no idioma atual (vem do dicionário).
  label: string;
  // Cada idioma escrito no próprio idioma (vem do dicionário).
  names: Record<Locale, string>;
};

// Seletor de idioma (ADR-0001, 6.2 item 6): links comuns, acessíveis por teclado,
// sem JavaScript obrigatório e sem cookie. O idioma só muda pela URL.
export function LanguageSwitcher({
  current,
  label,
  names,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-4">
        {LOCALES.map((locale) => (
          <li key={locale}>
            <Link
              href={localePath(locale)}
              lang={LOCALE_TAGS[locale]}
              hrefLang={LOCALE_TAGS[locale]}
              aria-current={locale === current ? "true" : undefined}
            >
              {names[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
