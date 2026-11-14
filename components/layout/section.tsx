import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Faixa de página da V4 Red Pen (RIV-27). O tom define fundo, texto e bordas; o
// foco troca de Red Pen para Highlight nos tons escuros (regra em globals.css,
// pelo atributo data-tone). As bordas de 2px Ink (`bordered`) NÃO dependem do tom:
// na V4 a faixa Burgundy e o About têm, o Contato (também Burgundy) não tem.
// Não contém conteúdo comercial.
export const SECTION_TONES = [
  "paper",
  "highlight",
  "burgundy",
  "burgundy-deep",
  "ink",
] as const;
export type SectionTone = (typeof SECTION_TONES)[number];

const TONE_CLASSES: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  highlight: "bg-highlight text-ink",
  burgundy: "bg-burgundy text-paper",
  "burgundy-deep": "bg-burgundy-deep text-paper",
  ink: "bg-ink text-paper",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  // Bordas superior e inferior de 2px em Ink.
  bordered?: boolean;
};

// Respiro horizontal da V4: clamp(20px, 5vw, 80px). Vertical padrão: 112px.
const BASE_CLASSES = "px-[clamp(20px,5vw,80px)] py-28";

export function Section({
  tone = "paper",
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  const classes = cx(
    BASE_CLASSES,
    TONE_CLASSES[tone],
    bordered && "border-y-2 border-ink",
    className,
  );

  return (
    <section data-tone={tone} className={classes} {...props}>
      {children}
    </section>
  );
}
