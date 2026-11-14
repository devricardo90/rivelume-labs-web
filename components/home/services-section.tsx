import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import { Highlight } from "@/components/ui/highlight";
import { HandNote } from "@/components/ui/hand-note";
import type { Dictionary } from "@/i18n/dictionary";

type ServicesSectionProps = {
  services: Dictionary["services"];
};

// Services da V4 Red Pen (RIV-32): três serviços oficiais (Custom Software
// Development, Business Automation, Practical AI Solutions) em linhas numeradas.
// No hover (e `focus-within`, para quando houver itens focáveis) a linha ganha um
// fundo leve, o título recebe o marcador amarelo, o exemplo é sublinhado em Red
// Pen e a seta avança. As linhas não são focáveis (são texto): o efeito é de
// ponteiro. TEXTO COMERCIAL PROVISÓRIO, pendente de validação do Owner.
export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <Section id="services" tone="paper">
      <Container>
        <Eyebrow marker="01 /" className="m-0 mb-5">
          {services.eyebrow}
        </Eyebrow>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <Heading level={2} size="section" className="flex-[1_1_560px]">
            {services.headingLead}{" "}
            <Highlight>
              <Em>{services.headingEmphasis}</Em>
            </Highlight>{" "}
            {services.headingTail}
          </Heading>
          <p className="m-0 max-w-[420px] flex-[1_1_300px] text-[21px] leading-normal text-body">
            {services.intro}
          </p>
        </div>

        <ul role="list" className="m-0 list-none border-t-2 border-ink p-0">
          {services.items.map((item, index) => (
            <li
              key={item.title}
              className="group/row flex flex-wrap items-start gap-x-12 gap-y-5 border-b-2 border-ink px-2 py-11 transition-colors duration-[250ms] focus-within:bg-burgundy/6 hover:bg-burgundy/6"
            >
              <div
                aria-hidden="true"
                className="flex-[0_0_150px] font-serif text-[clamp(72px,8vw,120px)] leading-[0.85] font-extrabold text-red-pen italic"
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-[1_1_360px]">
                <Heading level={3} size="service" className="mb-4">
                  <span className="marker-reveal group-focus-within/row:bg-[length:100%_100%] group-hover/row:bg-[length:100%_100%]">
                    {item.title}
                  </span>
                </Heading>
                <p className="m-0 max-w-[520px] text-xl leading-normal text-body">
                  {item.description}
                </p>
              </div>

              <div className="max-w-[420px] flex-[1_1_300px]">
                <Eyebrow size="sm" className="m-0 mb-2">
                  {services.applicationLabel}
                </Eyebrow>
                <p className="m-0 mb-[18px] text-lg leading-normal font-medium">
                  {item.application}
                </p>
                <p className="m-0 font-mono text-base">
                  <span className="underline-reveal group-focus-within/row:bg-[length:100%_3px] group-hover/row:bg-[length:100%_3px]">
                    {item.from}
                  </span>{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-[translate] duration-[250ms] group-focus-within/row:translate-x-2 group-hover/row:translate-x-2"
                  >
                    →
                  </span>{" "}
                  <strong className="font-medium text-burgundy">
                    {item.to}
                  </strong>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <Eyebrow size="sm" className="m-0">
            {services.benefitLabel}
          </Eyebrow>
          <HandNote size="lg">{services.benefit}</HandNote>
        </div>
      </Container>
    </Section>
  );
}
