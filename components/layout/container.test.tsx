import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "@/components/layout/container";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Container", () => {
  it("renderiza os filhos dentro de um div", () => {
    render(
      <Container data-testid="container">
        <p>conteúdo</p>
      </Container>,
    );

    const container = screen.getByTestId("container");
    expect(container.tagName).toBe("DIV");
    expect(container.contains(screen.getByText("conteúdo"))).toBe(true);
  });

  it("limita a 1280px (max-w-7xl) e centraliza, sem padding próprio", () => {
    render(<Container data-testid="container" />);

    const classes = screen.getByTestId("container").classList;
    for (const name of ["mx-auto", "w-full", "max-w-7xl"]) {
      expect(classes.contains(name)).toBe(true);
    }
    // O respiro horizontal vem do Section, como na V4.
    expect(classes.contains("px-4")).toBe(false);
    expect(classes.contains("max-w-5xl")).toBe(false);
  });

  it("acrescenta className sem perder as classes padrão", () => {
    render(<Container data-testid="container" className="py-8 custom" />);

    const classes = screen.getByTestId("container").classList;
    expect(classes.contains("py-8")).toBe(true);
    expect(classes.contains("custom")).toBe(true);
    expect(classes.contains("max-w-7xl")).toBe(true);
  });

  it("não deixa a string 'undefined' na classe quando não há className", () => {
    render(<Container data-testid="container" />);

    expect(screen.getByTestId("container").className).not.toContain(
      "undefined",
    );
  });

  it("repassa as demais propriedades de div", () => {
    render(
      <Container
        data-testid="container"
        id="topo"
        aria-label="Área principal"
      />,
    );

    const container = screen.getByTestId("container");
    expect(container.id).toBe("topo");
    expect(container.getAttribute("aria-label")).toBe("Área principal");
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <Container>
        <h2>Título</h2>
        <p>conteúdo</p>
      </Container>,
    );

    await expectNoA11yViolations(container);
  });
});
