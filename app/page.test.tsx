import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Página inicial", () => {
  it("mostra o título principal da marca", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Rivelume Labs");
  });

  it("tem um único h1 e ele fica dentro do landmark main", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const main = screen.getByRole("main");
    expect(main.contains(screen.getByRole("heading", { level: 1 }))).toBe(true);
  });

  it("mostra o aviso de site em construção", () => {
    render(<Home />);

    expect(screen.getByText("Website under construction.")).toBeTruthy();
  });

  it("usa o Container para limitar a largura do conteúdo", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.parentElement?.classList.contains("max-w-5xl")).toBe(true);
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(<Home />);

    await expectNoA11yViolations(container);
  });
});
