import { Container } from "@/components/layout/container";
import { DraftSheet } from "@/components/home/draft-sheet";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import { Highlight } from "@/components/ui/highlight";
import { TEXT_LINK_CLASSES } from "@/components/ui/text-link";
import type { Dictionary } from "@/i18n/dictionary";

type HeroProps = {
  hero: Dictionary["hero"];
};

// Hero da V4 Red Pen (RIV-31). Rótulo vertical e anotação manuscrita são
// decorativos e somem abaixo de 1100px, como na V4. A folha de rascunho é
// estática (a interação Draft → Final é da RIV-34). Os destinos das âncoras
// (#contact, #process, #services) chegam com as seções seguintes.
export function Hero({ hero }: HeroProps) {
  return (
    <section className="relative px-[clamp(20px,5vw,80px)] pt-8 pb-[104px]">
      <div
        aria-hidden="true"
        className="absolute top-14 left-[22px] hidden rotate-180 font-mono text-xs tracking-[0.24em] text-muted [writing-mode:vertical-rl] min-[1101px]:block"
      >
        {hero.verticalLabel}
      </div>

      <Container>
        <Eyebrow marker="/" className="m-0 mb-6">
          {hero.eyebrow}
        </Eyebrow>

        <div className="relative">
          <Heading level={1} size="display">
            {hero.headingLine1}
            <br />
            {hero.headingLine2}
            <br />
            <Highlight sweep>
              <Em>{hero.headingEmphasis}</Em>
            </Highlight>
          </Heading>
          <div
            aria-hidden="true"
            className="absolute bottom-3.5 left-[56%] hidden -rotate-4 items-end gap-3.5 min-[1101px]:flex"
          >
            <svg
              width="86"
              height="46"
              viewBox="0 0 86 46"
              fill="none"
              className="stroke-red-pen"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M84 30 C60 44 28 42 8 20" />
              <path d="M8 20 L22 8 M8 20 L24 30" />
            </svg>
            <span className="font-hand text-[38px] leading-none font-bold text-red-pen">
              {hero.note}
            </span>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-16 gap-y-14">
          <div className="max-w-[560px] min-w-0 flex-[1_1_420px]">
            <p className="m-0 mb-8 text-[22px] leading-normal text-body">
              {hero.body}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href="#contact">
                {hero.cta}
                <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-7 text-[17px] font-semibold">
              <a href="#process" className={TEXT_LINK_CLASSES}>
                {hero.linkProcess}
              </a>
              <a href="#services" className={TEXT_LINK_CLASSES}>
                {hero.linkServices}
              </a>
            </div>
          </div>

          <div className="ml-auto box-content max-w-[640px] min-w-0 flex-[1_1_520px] px-[18px] pt-6">
            <DraftSheet sheet={hero.sheet} />
          </div>
        </div>
      </Container>
    </section>
  );
}
