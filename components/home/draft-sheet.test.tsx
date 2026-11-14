import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DraftSheet } from "@/components/home/draft-sheet";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Folha de rascunho", () => {
  it("mostra as três linhas riscadas e as respostas manuscritas", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const struck = Array.from(container.querySelectorAll("del")).map(
      (node) => node.textContent,
    );
    expect(struck).toEqual([
      "Merge six spreadsheets before every meeting.",
      "Chase new leads across five inboxes.",
      "Rebuild the weekly report by hand. Again.",
    ]);
    expect(
      Array.from(container.querySelectorAll("del")).every((del) =>
        del.classList.contains("strike"),
      ),
    ).toBe(true);
    expect(container.querySelector("ol")).toBeTruthy();
    expect(screen.getByText("One dashboard for the whole team.")).toBeTruthy();
    expect(screen.getByText("Routed to the right team.")).toBeTruthy();
    expect(screen.getByText("A report that sends itself.")).toBeTruthy();
    expect(
      screen.getByText("Result: more time for higher-value work."),
    ).toBeTruthy();
  });

  it("é marcada como exemplo e traz o selo como elemento decorativo", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    expect(screen.getByText("Example")).toBeTruthy();
    const stamp = screen.getByText("FINAL");
    expect(stamp.getAttribute("aria-hidden")).toBe("true");
  });

  it("é estática: data-edited=true por padrão, pronta para a RIV-34 alternar", () => {
    const { container, rerender } = render(
      <DraftSheet sheet={en.hero.sheet} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-edited")).toBe("true");

    rerender(<DraftSheet sheet={en.hero.sheet} edited={false} />);
    expect(root.getAttribute("data-edited")).toBe("false");
  });

  it("usa a sombra dura, a rotação de -1,4° e o papel da V4", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("shadow-[10px_12px_0_var(--color-ink)]");
    expect(root.className).toContain("-rotate-[1.4deg]");
    expect(root.className).toContain("bg-sheet");
    expect(root.className).toContain("border-ink");
  });

  it("numera as linhas com marcadores decorativos 01, 02 e 03", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const numbers = Array.from(
      container.querySelectorAll('li [aria-hidden="true"]'),
    ).map((node) => node.textContent);
    expect(numbers).toEqual(["01", "02", "03"]);
  });

  it("mantém as respostas e o resultado ocultos até o estado editado (opacity-0 + variante)", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    for (const text of [
      "One dashboard for the whole team.",
      "Result: more time for higher-value work.",
    ]) {
      const note = screen.getByText(text);
      expect(note.classList.contains("opacity-0")).toBe(true);
      expect(
        note.classList.contains("group-data-[edited=true]:opacity-100"),
      ).toBe(true);
    }
  });

  it("traduz o exemplo para PT-BR", () => {
    render(<DraftSheet sheet={pt.hero.sheet} />);

    expect(screen.getByText("Exemplo")).toBeTruthy();
    expect(screen.getByText("Um painel para o time inteiro.")).toBeTruthy();
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_locale, dictionary) => {
      const { container } = render(
        <DraftSheet sheet={dictionary.hero.sheet} />,
      );

      await expectNoA11yViolations(container);
    },
  );
});
