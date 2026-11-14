import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Link de texto da V4 (`.navl`): sublinhado Red Pen de 3px no hover. Acrescentado
// o mesmo estado no foco do teclado (a V4 só definiu hover). O padding vertical
// de 12px dá o alvo de toque. A transição é só da cor da borda, como na V4: com
// `transition-colors` o anel de foco (outline-color) também animaria de Ink para
// Red Pen nos primeiros 200ms, o que o Chrome mostrou na medição.
export function TextLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cx(
        "inline-block border-b-[3px] border-transparent py-3 no-underline transition-[border-color] duration-200 hover:border-red-pen focus-visible:border-red-pen",
        className,
      )}
      {...props}
    />
  );
}
