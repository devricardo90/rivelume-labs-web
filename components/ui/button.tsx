import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

// Botões da V4 Red Pen (RIV-28): borda de 2px Ink, sombra dura de 6px que cresce
// para 9px no hover (deslocando -2px) e some no clique (deslocando +3px). Altura
// mínima de 52px de conteúdo (56px com as bordas, como na V4, que usa content-box) e Instrument Sans 600 a 17px.
export const BUTTON_VARIANTS = ["ink", "highlight"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

const BASE =
  "box-content inline-flex min-h-[52px] items-center gap-2.5 border-2 border-ink px-[26px] font-sans text-[17px] font-semibold no-underline cursor-pointer transition-[translate,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  ink: "bg-ink text-paper shadow-hard-burgundy hover:shadow-hard-burgundy-lg active:shadow-none",
  highlight:
    "bg-highlight text-ink shadow-hard-ink hover:shadow-hard-ink-lg active:shadow-none",
};

export function buttonClasses(variant: ButtonVariant, className?: string) {
  return cx(BASE, VARIANT_CLASSES[variant], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "ink",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

// Link com aparência de botão (CTA de navegação).
export function ButtonLink({
  variant = "ink",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
