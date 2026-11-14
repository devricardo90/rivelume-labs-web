import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Rótulo técnico da V4: Geist Mono, caixa alta, espaçamento de 0,16em. O marcador
// ("01 /", "/") pode ter outra cor. O tom do texto é escolhido pelo fundo.
export const EYEBROW_TONES = ["muted", "rose", "inherit"] as const;
export type EyebrowTone = (typeof EYEBROW_TONES)[number];

export const EYEBROW_MARKER_TONES = ["pen", "highlight", "burgundy"] as const;
export type EyebrowMarkerTone = (typeof EYEBROW_MARKER_TONES)[number];

const TONE_CLASSES: Record<EyebrowTone, string> = {
  muted: "text-muted", // sobre Paper e folha (6,6:1 e 7,3:1)
  rose: "text-rose", // sobre Burgundy (6,0:1) e Deep Burgundy (9,7:1)
  inherit: "",
};

const MARKER_CLASSES: Record<EyebrowMarkerTone, string> = {
  pen: "text-red-pen", // sobre Paper (5,0:1)
  highlight: "text-highlight", // sobre Burgundy, Deep Burgundy e Ink
  burgundy: "text-burgundy", // sobre Highlight (7,3:1)
};

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  tone?: EyebrowTone;
  // Tamanho: 13px (padrão) ou 12px (`sm`, usado em rótulos secundários).
  size?: "default" | "sm";
  marker?: string;
  markerTone?: EyebrowMarkerTone;
};

export function Eyebrow({
  tone = "muted",
  size = "default",
  marker,
  markerTone = "pen",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cx(
        "font-mono uppercase tracking-[0.16em]",
        size === "sm" ? "text-xs" : "text-[13px]",
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    >
      {marker ? (
        <>
          <span className={MARKER_CLASSES[markerTone]}>{marker}</span>{" "}
        </>
      ) : null}
      {children}
    </p>
  );
}
