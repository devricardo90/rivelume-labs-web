import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Anotação manuscrita da V4: Caveat 700. Red Pen sobre Paper e a folha (5,0:1 e
// 5,6:1); Highlight sobre fundos escuros. É texto de conteúdo: leitores de tela
// o leem.
export const HAND_NOTE_TONES = ["pen", "highlight"] as const;
export type HandNoteTone = (typeof HAND_NOTE_TONES)[number];

const TONE_CLASSES: Record<HandNoteTone, string> = {
  pen: "text-red-pen",
  highlight: "text-highlight",
};

const SIZE_CLASSES = {
  sm: "text-[30px]",
  md: "text-[34px]",
  lg: "text-[40px]",
} as const;

type HandNoteProps = ComponentPropsWithoutRef<"p"> & {
  tone?: HandNoteTone;
  size?: keyof typeof SIZE_CLASSES;
};

export function HandNote({
  tone = "pen",
  size = "md",
  className,
  ...props
}: HandNoteProps) {
  return (
    <p
      className={cx(
        "m-0 font-hand leading-[1.1] font-bold",
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}
