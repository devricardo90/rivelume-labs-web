import { Container } from "@/components/layout/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type HomePlaceholderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

// Placeholder técnico da página inicial (RIV-12), agora recebendo o idioma e o
// texto por props (RIV-16). Sem conteúdo comercial nem identidade visual. O
// seletor de idioma passa para o cabeçalho na tarefa da navegação.
export function HomePlaceholder({ locale, dictionary }: HomePlaceholderProps) {
  return (
    <main className="py-8">
      <Container>
        <h1 className="text-2xl font-semibold">{dictionary.home.heading}</h1>
        <p className="mt-2">{dictionary.home.underConstruction}</p>
        <div className="mt-4">
          <LanguageSwitcher
            current={locale}
            label={dictionary.language.label}
            names={dictionary.language.names}
          />
        </div>
      </Container>
    </main>
  );
}
