import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Em, HEADING_SIZES, Heading } from "@/components/ui/heading";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Heading (V4 Red Pen)", () => {
  it.each([1, 2, 3] as const)("renderiza o nível semântico h%s", (level) => {
    render(
      <Heading level={level} size="card">
        Título
      </Heading>,
    );

    expect(screen.getByRole("heading", { level }).tagName).toBe(`H${level}`);
  });

  it("o nível semântico é independente do tamanho visual", () => {
    render(
      <Heading level={2} size="display">
        x
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.classList.contains("text-[clamp(56px,10.5vw,152px)]")).toBe(
      true,
    );
  });

  it("usa Fraunces 800 em todos os tamanhos", () => {
    for (const size of HEADING_SIZES) {
      const { unmount } = render(
        <Heading level={2} size={size}>
          x
        </Heading>,
      );
      const classes = screen.getByRole("heading").classList;
      expect(classes.contains("font-serif")).toBe(true);
      expect(classes.contains("font-extrabold")).toBe(true);
      unmount();
    }
  });

  it("aplica a escala fluida da V4 a cada tamanho", () => {
    const expected: Record<(typeof HEADING_SIZES)[number], string> = {
      display: "text-[clamp(56px,10.5vw,152px)]",
      section: "text-[clamp(44px,7.2vw,104px)]",
      feature: "text-[clamp(52px,9vw,136px)]",
      contact: "text-[clamp(44px,6.8vw,96px)]",
      service: "text-[clamp(30px,3.6vw,50px)]",
      card: "text-[34px]",
      step: "text-[56px]",
    };
    for (const size of HEADING_SIZES) {
      const { unmount } = render(
        <Heading level={3} size={size}>
          x
        </Heading>,
      );
      expect(
        screen.getByRole("heading").classList.contains(expected[size]),
      ).toBe(true);
      unmount();
    }
  });

  it("o tamanho step é itálico", () => {
    render(
      <Heading level={3} size="step">
        Listen
      </Heading>,
    );

    expect(screen.getByRole("heading").classList.contains("italic")).toBe(true);
  });

  it("acrescenta className e repassa id", () => {
    render(
      <Heading level={2} size="section" id="t" className="mb-5">
        x
      </Heading>,
    );

    const heading = screen.getByRole("heading");
    expect(heading.id).toBe("t");
    expect(heading.classList.contains("mb-5")).toBe(true);
  });

  it("Em dá itálico (semântico) com peso 600", () => {
    render(
      <Heading level={1} size="display">
        Software that makes business <Em>simpler.</Em>
      </Heading>,
    );

    const em = screen.getByText("simpler.");
    expect(em.tagName).toBe("EM");
    expect(em.classList.contains("font-semibold")).toBe(true);
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <main>
        <Heading level={1} size="display">
          Título
        </Heading>
        <Heading level={2} size="section">
          Seção
        </Heading>
      </main>,
    );

    await expectNoA11yViolations(container);
  });
});
