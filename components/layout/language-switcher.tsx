import { TextLink } from "@/components/ui/text-link";
import { LOCALES, LOCALE_TAGS, localePath, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  current: Locale;
  // Nome acessível do seletor, no idioma atual (vem do dicionário).
  label: string;
  // Cada idioma escrito no próprio idioma (vem do dicionário).
  names: Record<Locale, string>;
};

// Seletor de idioma (ADR-0001, 6.2 item 6): links comuns, acessíveis por teclado,
// sem JavaScript obrigatório e sem cookie. O idioma só muda pela URL. O estilo é
// o do `TextLink` da V4; o idioma atual fica com o sublinhado Red Pen fixo.
export function LanguageSwitcher({
  current,
  label,
  names,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="m-0 flex list-none gap-8 p-0 text-base font-semibold">
        {LOCALES.map((locale) => (
          <li key={locale}>
            <TextLink
              href={localePath(locale)}
              lang={LOCALE_TAGS[locale]}
              hrefLang={LOCALE_TAGS[locale]}
              aria-current={locale === current ? "true" : undefined}
              className="aria-[current=true]:border-red-pen"
            >
              {names[locale]}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
