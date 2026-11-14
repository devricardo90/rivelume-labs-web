import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "@/components/layout/skip-link";
import { expectNoA11yViolations } from "@/test/a11y";

describe("SkipLink", () => {
  it("aponta para o <main> (#main) por padrão", () => {
    render(<SkipLink label="Skip to content" />);

    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link.getAttribute("href")).toBe("#main");
  });

  it("aceita outro alvo", () => {
    render(<SkipLink label="Ir para o conteúdo" targetId="conteudo" />);

    expect(screen.getByRole("link").getAttribute("href")).toBe("#conteudo");
  });

  it("fica oculto até receber foco, e então aparece fixo no topo", () => {
    render(<SkipLink label="Skip to content" />);

    const classes = screen.getByRole("link").classList;
    expect(classes.contains("sr-only")).toBe(true);
    expect(classes.contains("focus:not-sr-only")).toBe(true);
    expect(classes.contains("focus:fixed")).toBe(true);
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <div>
        <SkipLink label="Skip to content" />
        <main id="main">x</main>
      </div>,
    );

    await expectNoA11yViolations(container);
  });
});
