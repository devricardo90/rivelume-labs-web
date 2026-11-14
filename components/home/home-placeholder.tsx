import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import type { Dictionary } from "@/i18n/dictionary";

type HomePlaceholderProps = {
  dictionary: Dictionary;
};

// Placeholder técnico da página inicial (RIV-12), com o texto por props (RIV-16)
// e agora sobre a fundação da V4 Red Pen (RIV-27 e RIV-28). Sem conteúdo
// comercial: o Hero e as seções chegam nas tarefas seguintes. Cabeçalho, seletor
// de idioma e rodapé ficam no layout (RIV-30).
export function HomePlaceholder({ dictionary }: HomePlaceholderProps) {
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
        </Container>
      </Section>
    </main>
  );
}
