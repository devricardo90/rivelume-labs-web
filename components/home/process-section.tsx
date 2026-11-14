import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import type { Dictionary } from "@/i18n/dictionary";

type ProcessSectionProps = {
  process: Dictionary["process"];
};

// Ícones manuscritos dos quatro passos (traço Red Pen, da V4), na ordem
// Understand, Plan, Build, Deliver.
const STEP_ICONS: ReactNode[] = [
  <path key="wave" d="M6 36 q6 -16 12 0 t12 0 t12 0 t8 -4" />,
  <path
    key="loop"
    d="M10 30 C8 14 38 8 48 24 C56 40 26 52 12 40 C7 35 8 28 14 24"
  />,
  <g key="peak">
    <path d="M8 44 L28 18 L48 44" />
    <path d="M28 18 L28 4" />
  </g>,
  <path key="check" d="M8 30 L22 44 L50 10" />,
];

// How We Work da V4 (RIV-32), com o processo aprovado: Understand → Plan →
// Build → Deliver (os nomes Listen/Map/Build/Maintain da V4 foram substituídos por
// decisão do Owner). "Deliver" NÃO é compromisso de manutenção recorrente.
// A borda superior de cada passo se preenche em Red Pen no hover (e foco interno).
// TEXTO COMERCIAL PROVISÓRIO, pendente de validação do Owner.
export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <Section id="process" tone="paper">
      <Container>
        <Eyebrow marker="03 /" className="m-0 mb-5">
          {process.eyebrow}
        </Eyebrow>
        <Heading level={2} size="section" className="mb-5 max-w-[1000px]">
          {process.headingLead}{" "}
          <Em className="underline decoration-red-pen decoration-4 underline-offset-12 [text-decoration-style:wavy]">
            {process.headingEmphasis}
          </Em>
        </Heading>
        <Eyebrow className="m-0 mb-[72px]">{process.flow}</Eyebrow>

        <ol
          role="list"
          className="m-0 flex list-none flex-wrap gap-x-10 gap-y-14 p-0"
        >
          {process.steps.map((step, index) => (
            <li
              key={step.title}
              className="group/step relative min-w-0 flex-[1_1_240px] border-t-[3px] border-ink pt-7"
            >
              <div
                aria-hidden="true"
                className="absolute -top-[3px] left-0 h-[3px] w-0 bg-red-pen transition-[width] duration-500 group-focus-within/step:w-full group-hover/step:w-full"
              />
              <div className="mb-5 flex items-center justify-between">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  aria-hidden="true"
                  className="stroke-red-pen"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {STEP_ICONS[index]}
                </svg>
                <Eyebrow aria-hidden="true" className="m-0">
                  {String(index + 1).padStart(2, "0")}
                </Eyebrow>
              </div>
              <Heading level={3} size="step" className="mb-3">
                {step.title}
              </Heading>
              <p className="m-0 text-[19px] leading-normal text-body">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
