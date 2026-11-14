import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextLink } from "@/components/ui/text-link";
import { expectNoA11yViolations } from "@/test/a11y";

describe("TextLink (V4 Red Pen)", () => {
  it("renderiza uma âncora com href", () => {
    render(<TextLink href="#services">Services</TextLink>);

    const link = screen.getByRole("link", { name: "Services" });
    expect(link.getAttribute("href")).toBe("#services");
  });

  it("mostra o sublinhado Red Pen de 3px no hover e também no foco do teclado", () => {
    render(<TextLink href="#x">x</TextLink>);

    const classes = screen.getByRole("link").classList;
    expect(classes.contains("border-b-[3px]")).toBe(true);
    expect(classes.contains("border-transparent")).toBe(true);
    expect(classes.contains("hover:border-red-pen")).toBe(true);
    // Paridade com o teclado: a V4 só definiu o hover.
    expect(classes.contains("focus-visible:border-red-pen")).toBe(true);
  });

  it("a transição é só da cor da borda (o anel de foco não anima), como na V4", () => {
    render(<TextLink href="#x">x</TextLink>);

    const classes = screen.getByRole("link").classList;
    expect(classes.contains("transition-[border-color]")).toBe(true);
    expect(classes.contains("transition-colors")).toBe(false);
    expect(classes.contains("duration-200")).toBe(true);
  });

  it("tem padding vertical de 12px (alvo de toque) e acrescenta className", () => {
    render(
      <TextLink href="#x" className="font-semibold">
        x
      </TextLink>,
    );

    const classes = screen.getByRole("link").classList;
    expect(classes.contains("py-3")).toBe(true);
    expect(classes.contains("font-semibold")).toBe(true);
  });

  it("repassa lang, hrefLang e aria-current", () => {
    render(
      <TextLink href="/pt" lang="pt-BR" hrefLang="pt-BR" aria-current="true">
        PT
      </TextLink>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("lang")).toBe("pt-BR");
    expect(link.getAttribute("hreflang")).toBe("pt-BR");
    expect(link.getAttribute("aria-current")).toBe("true");
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(<TextLink href="#x">Texto do link</TextLink>);

    await expectNoA11yViolations(container);
  });
});
