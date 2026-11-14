import { Container } from "@/components/layout/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type HomePlaceholderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

// Placeholder técnico da página inicial (RIV-12), com o texto por props (RIV-16)
// e agora sobre a fundação da V4 Red Pen (RIV-27 e RIV-28). Sem conteúdo
// comercial: o Hero, as seções e o cabeçalho chegam nas tarefas seguintes.
export function HomePlaceholder({ locale, dictionary }: HomePlaceholderProps) {
  return (
    <main id="main">
      <Section tone="paper">
        <Container>
          <Heading level={1} size="section">
            {dictionary.home.heading}
          </Heading>
          <p className="mt-4 text-xl text-body">
            {dictionary.home.underConstruction}
          </p>
          <div className="mt-8">
            <LanguageSwitcher
              current={locale}
              label={dictionary.language.label}
              names={dictionary.language.names}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
