import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EYEBROW_MARKER_TONES,
  EYEBROW_TONES,
  Eyebrow,
} from "@/components/ui/eyebrow";

// O axe não tem regra aplicável a texto simples (o helper falha de propósito quando
// nada é avaliado). O contraste destes pares é medido no Chrome, não no jsdom.
describe("Eyebrow (V4 Red Pen)", () => {
  it("renderiza um parágrafo em Geist Mono, caixa alta, 13px e tracking 0,16em", () => {
    render(<Eyebrow>Technology studio</Eyebrow>);

    const el = screen.getByText("Technology studio");
    expect(el.tagName).toBe("P");
    for (const name of [
      "font-mono",
      "uppercase",
      "tracking-[0.16em]",
      "text-[13px]",
      "text-muted",
    ]) {
      expect(el.classList.contains(name)).toBe(true);
    }
  });

  it("tamanho sm usa 12px", () => {
    render(<Eyebrow size="sm">x</Eyebrow>);

    const classes = screen.getByText("x").classList;
    expect(classes.contains("text-xs")).toBe(true);
    expect(classes.contains("text-[13px]")).toBe(false);
  });

  it.each(EYEBROW_TONES)("aceita o tom %s sem classe indefinida", (tone) => {
    render(<Eyebrow tone={tone}>x</Eyebrow>);

    expect(screen.getByText("x").className).not.toContain("undefined");
  });

  it("tom rose usa o token de apoio sobre Burgundy", () => {
    render(<Eyebrow tone="rose">x</Eyebrow>);

    expect(screen.getByText("x").classList.contains("text-rose")).toBe(true);
  });

  it("mostra o marcador em outra cor, antes do texto", () => {
    render(<Eyebrow marker="01 /">Services</Eyebrow>);

    const marker = screen.getByText("01 /");
    expect(marker.classList.contains("text-red-pen")).toBe(true);
    expect(marker.parentElement?.textContent).toBe("01 / Services");
  });

  it.each(EYEBROW_MARKER_TONES)("marcador no tom %s", (markerTone) => {
    render(
      <Eyebrow marker="/" markerTone={markerTone}>
        x
      </Eyebrow>,
    );

    expect(screen.getByText("/").className).toContain("text-");
  });

  it("não cria marcador quando não é pedido", () => {
    const { container } = render(<Eyebrow>x</Eyebrow>);

    expect(container.querySelector("span")).toBeNull();
  });
});
