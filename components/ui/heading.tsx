import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "@/lib/cx";

// Títulos da V4: Fraunces 800, com tamanhos fluidos. O NÍVEL semântico (h1, h2,
// h3) é independente do TAMANHO visual: escolha o nível pela estrutura da página.
export const HEADING_SIZES = [
  "display", // H1 do Hero
  "section", // H2 das seções
  "feature", // H2 do About
  "contact", // H2 do Contato
  "service", // H3 das linhas de serviço
  "card", // H3 dos cartões
  "step", // H3 dos passos (itálico)
  "panel", // H3 do painel de prévia do Contato
] as const;
export type HeadingSize = (typeof HEADING_SIZES)[number];

const SIZE_CLASSES: Record<HeadingSize, string> = {
  display: "text-[clamp(56px,10.5vw,152px)] leading-[0.92] tracking-[-0.035em]",
  section: "text-[clamp(44px,7.2vw,104px)] leading-[0.95] tracking-[-0.03em]",
  feature: "text-[clamp(52px,9vw,136px)] leading-[0.92] tracking-[-0.035em]",
  contact: "text-[clamp(44px,6.8vw,96px)] leading-[0.96] tracking-[-0.03em]",
  service: "text-[clamp(30px,3.6vw,50px)] leading-[1.05] tracking-[-0.02em]",
  card: "text-[34px] leading-[1.05] tracking-[-0.02em]",
  // 56px, mas nunca mais largo que a coluna: a palavra mais longa ("Understand") mede
  // cerca de 5,4 a 5,7 vezes o corpo (conforme o motor de fontes), então abaixo de
  // ~376px de viewport o corpo diminui (coluna = 100vw - 40px de margens, dividida por 6).
  // A rede de segurança (texto ampliado, espaçamento de texto) é o `overflow-wrap:
  // break-word` do `body` e o `min-w-0` da base: quebra a palavra em vez de estourar
  // a coluna, sem cortar conteúdo (RIV-47).
  step: "text-[min(56px,calc((100vw_-_40px)/6))] italic leading-none tracking-[-0.02em]",
  panel: "text-[44px] leading-[1.05] tracking-[-0.02em]",
};

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  level: 1 | 2 | 3;
  size: HeadingSize;
};

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  return (
    <Tag
      className={cx(
        "m-0 min-w-0 font-serif font-extrabold",
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}

// Ênfase dos títulos: itálico 600 (a palavra "simpler.", "job", "details.").
export function Em({ className, ...props }: ComponentPropsWithoutRef<"em">) {
  return <em className={cx("font-semibold", className)} {...props} />;
}
