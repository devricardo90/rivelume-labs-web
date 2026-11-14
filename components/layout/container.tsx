import type { ComponentPropsWithoutRef } from "react";

// Primitivo estrutural (RIV-14, atualizado na RIV-27 para a V4): limita a
// largura do conteúdo a 1280px (max-w-7xl) e centraliza. O respiro horizontal
// da página NÃO fica aqui: vem do `Section` (clamp(20px, 5vw, 80px)), como na V4.
type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  const classes = ["mx-auto w-full max-w-7xl", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
