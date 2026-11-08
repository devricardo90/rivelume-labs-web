import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "@/components/layout/container";

describe("Container", () => {
  it("renderiza os filhos dentro de um div", () => {
    render(
      <Container data-testid="container">
        <p>conteúdo</p>
      </Container>,
    );

    const container = screen.getByTestId("container");
    expect(container.tagName).toBe("SPAN");
    expect(container.contains(screen.getByText("conteúdo"))).toBe(true);
  });

  it("aplica as classes estruturais padrão", () => {
    render(<Container data-testid="container" />);

    const classes = screen.getByTestId("container").classList;
    for (const name of ["mx-auto", "w-full", "max-w-5xl", "px-4", "sm:px-6"]) {
      expect(classes.contains(name)).toBe(true);
    }
  });

  it("acrescenta className sem perder as classes padrão", () => {
    render(<Container data-testid="container" className="py-8 custom" />);

    const classes = screen.getByTestId("container").classList;
    expect(classes.contains("py-8")).toBe(true);
    expect(classes.contains("custom")).toBe(true);
    expect(classes.contains("max-w-5xl")).toBe(true);
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
});
