import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import type { Dictionary } from "@/i18n/dictionary";

type AboutSectionProps = {
  about: Dictionary["about"];
};

// About da V4 (RIV-32): faixa Highlight Yellow com bordas Ink. Apresenta a
// Rivelume Labs como um pequeno estúdio de tecnologia; sem equipe, certificações,
// experiência ou histórico inventados. TEXTO COMERCIAL PROVISÓRIO, pendente de
// validação do Owner.
export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section id="about" tone="highlight" bordered>
      <Container>
        <Eyebrow
          tone="inherit"
          marker="04 /"
          markerTone="burgundy"
          className="m-0 mb-7"
        >
          {about.eyebrow}
        </Eyebrow>
        <div className="flex flex-wrap items-start gap-x-[72px] gap-y-12">
          <Heading level={2} size="feature" className="flex-[1_1_560px]">
            {about.headingLead}{" "}
            <Em className="text-burgundy">{about.headingEmphasis}</Em>
          </Heading>
          <div className="max-w-[480px] flex-[1_1_340px] pt-3">
            <p className="m-0 mb-5 text-[22px] leading-normal font-medium">
              {about.lead}
            </p>
            <p className="m-0 mb-9 text-[19px] leading-[1.55]">{about.body}</p>
            <ul role="list" className="m-0 flex list-none flex-col gap-3.5 p-0">
              {about.values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-3.5 hyphens-auto font-serif text-[30px] leading-[1.1] font-extrabold tracking-[-0.01em]"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 56 56"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 stroke-burgundy"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 30 L22 44 L50 10" />
                  </svg>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
