import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import type { Dictionary } from "@/i18n/dictionary";

type WorkSectionProps = {
  work: Dictionary["work"];
};

// Inclinação, deslocamento e inclinação da fita de cada cartão, como na V4.
const PIN_STYLES = [
  { card: "-rotate-[1.6deg]", tape: "-rotate-3" },
  { card: "mt-10 rotate-1", tape: "rotate-2" },
  { card: "-rotate-[0.8deg]", tape: "-rotate-1" },
] as const;

// Selected Work da V4 (RIV-32). SÃO CONCEITOS: cartões "pin" com fita, selo e área
// tracejada de conceito, sem cliente, projeto, resultado, métrica ou depoimento
// reais (Fonte §8, DEC-RIV-012). Um case só entra com confirmação e aprovação do
// Owner. Rótulos "Concept 0N" e o texto de apoio deixam isso explícito.
// TEXTO COMERCIAL PROVISÓRIO, pendente de validação do Owner.
export function WorkSection({ work }: WorkSectionProps) {
  return (
    <Section id="work" tone="burgundy-deep" className="pb-[136px]">
      <Container>
        <Eyebrow
          tone="rose"
          marker="02 /"
          markerTone="highlight"
          className="m-0 mb-5"
        >
          {work.eyebrow}
        </Eyebrow>

        <div className="mb-[72px] flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <Heading level={2} size="section" className="flex-[1_1_560px]">
            {work.headingLead}{" "}
            <Em className="text-highlight">{work.headingEmphasis}</Em>
          </Heading>
          <p className="m-0 max-w-[420px] flex-[1_1_300px] text-[21px] leading-normal text-rose">
            {work.intro}
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-14">
          {work.items.map((item, index) => {
            const style = PIN_STYLES[index];
            return (
              <article
                key={item.label}
                className={`relative max-w-[400px] flex-[1_1_320px] border-2 border-ink bg-paper px-6 pt-7 pb-[26px] text-ink shadow-[8px_8px_0_var(--color-ink)] transition-[rotate,translate] duration-300 focus-within:-translate-y-2 focus-within:rotate-0 hover:-translate-y-2 hover:rotate-0 ${style.card}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute -top-4 left-[calc(50%-48px)] h-[30px] w-24 bg-highlight/92 ${style.tape}`}
                />
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Eyebrow size="sm" className="m-0">
                    {item.label}
                  </Eyebrow>
                  <span className="border-[1.5px] border-red-pen px-2 py-0.5 font-mono text-[11px] tracking-[0.16em] text-red-pen uppercase">
                    {item.badge}
                  </span>
                </div>
                <div className="box-content mb-5 flex h-[200px] items-center justify-center border-2 border-dashed border-ink bg-[repeating-linear-gradient(135deg,transparent_0,transparent_9px,var(--color-rule)_9px,var(--color-rule)_10px)]">
                  <span className="border-[1.5px] border-ink bg-paper px-2.5 py-1 font-mono text-sm leading-normal">
                    {item.placeholder}
                  </span>
                </div>
                <Heading level={3} size="card" className="mb-3.5">
                  {item.title}
                </Heading>
                <Eyebrow size="sm" className="m-0 mb-1">
                  {work.problemLabel}
                </Eyebrow>
                <p className="m-0 text-[17px] leading-normal text-body">
                  {item.problem}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
