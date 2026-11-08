import type { ComponentPropsWithoutRef } from "react";

// Primitivo estrutural neutro (RIV-14): limita a largura e define o espaçamento
// horizontal. Sem cores, tipografia ou qualquer valor de identidade visual
// (DEC-RIV-007 pendente). Serve para validar a convenção de `components/`.
type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  const classes = ["mx-auto w-full max-w-5xl px-4 sm:px-6", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
