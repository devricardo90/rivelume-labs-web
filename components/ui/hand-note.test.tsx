import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HAND_NOTE_TONES, HandNote } from "@/components/ui/hand-note";

// O axe não tem regra aplicável a texto simples (o helper falha de propósito quando
// nada é avaliado). O contraste destes pares é medido no Chrome, não no jsdom.
describe("HandNote (V4 Red Pen)", () => {
  it("renderiza um parágrafo em Caveat 700, Red Pen e 34px por padrão", () => {
    render(<HandNote>One dashboard for the whole team.</HandNote>);

    const el = screen.getByText("One dashboard for the whole team.");
    expect(el.tagName).toBe("P");
    for (const name of [
      "font-hand",
      "font-bold",
      "text-red-pen",
      "text-[34px]",
    ]) {
      expect(el.classList.contains(name)).toBe(true);
    }
  });

  it.each([
    ["sm", "text-[30px]"],
    ["md", "text-[34px]"],
    ["lg", "text-[40px]"],
  ] as const)("tamanho %s usa %s", (size, className) => {
    render(<HandNote size={size}>x</HandNote>);

    expect(screen.getByText("x").classList.contains(className)).toBe(true);
  });

  it("tom highlight serve para fundos escuros", () => {
    render(<HandNote tone="highlight">x</HandNote>);

    const classes = screen.getByText("x").classList;
    expect(classes.contains("text-highlight")).toBe(true);
    expect(classes.contains("text-red-pen")).toBe(false);
  });

  it.each(HAND_NOTE_TONES)("aceita o tom %s sem classe indefinida", (tone) => {
    render(<HandNote tone={tone}>x</HandNote>);

    expect(screen.getByText("x").className).not.toContain("undefined");
  });

  it("é texto de conteúdo: leitores de tela o leem", () => {
    render(<HandNote>Messy is fine. Start there.</HandNote>);

    expect(screen.getByText("Messy is fine. Start there.")).toBeTruthy();
  });
});
