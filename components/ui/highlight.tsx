import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Marcador amarelo da V4 (`.hl`). `sweep` anima a varredura uma vez; com
// prefers-reduced-motion a animação some e o marcador aparece completo.
type HighlightProps = ComponentPropsWithoutRef<"span"> & {
  sweep?: boolean;
};

export function Highlight({
  sweep = false,
  className,
  ...props
}: HighlightProps) {
  return (
    <span
      className={cx("marker", sweep && "marker-sweep", className)}
      {...props}
    />
  );
}
