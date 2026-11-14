import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Highlight } from "@/components/ui/highlight";

// O axe não tem regra aplicável a texto simples (o helper falha de propósito quando
// nada é avaliado). O contraste destes pares é medido no Chrome, não no jsdom.
describe("Highlight (V4 Red Pen)", () => {
  it("marca o texto com o marcador amarelo, sem varredura por padrão", () => {
    render(<Highlight>simpler.</Highlight>);

    const el = screen.getByText("simpler.");
    expect(el.tagName).toBe("SPAN");
    expect(el.classList.contains("marker")).toBe(true);
    expect(el.classList.contains("marker-sweep")).toBe(false);
  });

  it("anima a varredura quando pedido", () => {
    render(<Highlight sweep>simpler.</Highlight>);

    expect(
      screen.getByText("simpler.").classList.contains("marker-sweep"),
    ).toBe(true);
  });

  it("acrescenta className sem perder o marcador", () => {
    render(<Highlight className="italic">x</Highlight>);

    const classes = screen.getByText("x").classList;
    expect(classes.contains("marker")).toBe(true);
    expect(classes.contains("italic")).toBe(true);
  });

  it("mantém o texto acessível: o destaque é só visual", () => {
    render(
      <p>
        Software that makes business <Highlight>simpler.</Highlight>
      </p>,
    );

    expect(screen.getByText(/Software that makes business/).textContent).toBe(
      "Software that makes business simpler.",
    );
  });
});
