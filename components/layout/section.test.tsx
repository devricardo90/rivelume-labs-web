import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SECTION_TONES, Section } from "@/components/layout/section";
import { expectNoA11yViolations } from "@/test/a11y";

const BACKGROUND: Record<(typeof SECTION_TONES)[number], string> = {
  paper: "bg-paper",
  highlight: "bg-highlight",
  burgundy: "bg-burgundy",
  "burgundy-deep": "bg-burgundy-deep",
  ink: "bg-ink",
};

describe("Section", () => {
  it("renderiza um <section> com o tom paper por padrão", () => {
    render(<Section aria-label="Teste">conteúdo</Section>);

    const section = screen.getByRole("region", { name: "Teste" });
    expect(section.tagName).toBe("SECTION");
    expect(section.getAttribute("data-tone")).toBe("paper");
    expect(section.classList.contains("bg-paper")).toBe(true);
  });

  it.each(SECTION_TONES)(
    "aplica o fundo do tom %s e o expõe em data-tone",
    (tone) => {
      render(
        <Section tone={tone} aria-label="Teste">
          x
        </Section>,
      );

      const section = screen.getByRole("region");
      expect(section.getAttribute("data-tone")).toBe(tone);
      expect(section.classList.contains(BACKGROUND[tone])).toBe(true);
    },
  );

  it("usa texto Paper nos tons escuros e Ink nos claros", () => {
    const dark = ["burgundy", "burgundy-deep", "ink"] as const;
    const light = ["paper", "highlight"] as const;
    for (const tone of dark) {
      const { unmount } = render(
        <Section tone={tone} aria-label="Teste">
          x
        </Section>,
      );
      expect(screen.getByRole("region").classList.contains("text-paper")).toBe(
        true,
      );
      unmount();
    }
    for (const tone of light) {
      const { unmount } = render(
        <Section tone={tone} aria-label="Teste">
          x
        </Section>,
      );
      expect(screen.getByRole("region").classList.contains("text-ink")).toBe(
        true,
      );
      unmount();
    }
  });

  it("não tem borda por padrão, em nenhum tom (o Contato da V4 é Burgundy sem borda)", () => {
    for (const tone of SECTION_TONES) {
      const { unmount } = render(
        <Section tone={tone} aria-label="Teste">
          x
        </Section>,
      );
      const classes = screen.getByRole("region").classList;
      expect(classes.contains("border-y-2")).toBe(false);
      unmount();
    }
  });

  it("bordered acrescenta as bordas superior e inferior de 2px em Ink, em qualquer tom", () => {
    render(
      <Section tone="burgundy" bordered aria-label="Teste">
        x
      </Section>,
    );

    const classes = screen.getByRole("region").classList;
    expect(classes.contains("border-y-2")).toBe(true);
    expect(classes.contains("border-ink")).toBe(true);
  });

  it("aplica o respiro horizontal fluido da V4, clamp(20px,5vw,80px)", () => {
    render(<Section aria-label="Teste">x</Section>);

    expect(
      screen
        .getByRole("region")
        .classList.contains("px-[clamp(20px,5vw,80px)]"),
    ).toBe(true);
  });

  it("acrescenta className e repassa id", () => {
    render(
      <Section id="services" className="py-10" aria-label="Teste">
        x
      </Section>,
    );

    const section = screen.getByRole("region");
    expect(section.id).toBe("services");
    expect(section.classList.contains("py-10")).toBe(true);
    expect(section.className).not.toContain("undefined");
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <Section tone="burgundy" aria-labelledby="t">
        <h2 id="t">Título</h2>
      </Section>,
    );

    await expectNoA11yViolations(container);
  });
});
