import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DraftSheet } from "@/components/home/draft-sheet";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function root(container: HTMLElement) {
  return container.firstElementChild as HTMLElement;
}

beforeEach(() => {
  vi.useFakeTimers();
  mockReducedMotion(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Folha de rascunho: conteúdo", () => {
  it("mostra as três linhas riscadas em <del> e as respostas manuscritas", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    expect(
      Array.from(container.querySelectorAll("del")).map(
        (node) => node.textContent,
      ),
    ).toEqual([
      "Merge six spreadsheets before every meeting.",
      "Chase new leads across five inboxes.",
      "Rebuild the weekly report by hand. Again.",
    ]);
    expect(
      Array.from(container.querySelectorAll("del")).every((del) =>
        del.classList.contains("strike"),
      ),
    ).toBe(true);
    expect(container.querySelector("ol")?.getAttribute("role")).toBe("list");
    expect(screen.getByText("One dashboard for the whole team.")).toBeTruthy();
    expect(screen.getByText("Routed to the right team.")).toBeTruthy();
    expect(screen.getByText("A report that sends itself.")).toBeTruthy();
    expect(
      screen.getByText("Result: more time for higher-value work."),
    ).toBeTruthy();
  });

  it("é marcada como exemplo e traz os selos como elementos decorativos", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    expect(screen.getByText("Example")).toBeTruthy();
    expect(screen.getByText("DRAFT").getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByText("FINAL").getAttribute("aria-hidden")).toBe("true");
  });

  it("os selos DRAFT e FINAL ficam 12px acima da posição da V4 (-top-9) para não cobrir a etiqueta Example", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    for (const text of ["DRAFT", "FINAL"]) {
      const stamp = screen.getByText(text);
      expect(stamp.classList.contains("-top-9")).toBe(true);
      expect(stamp.classList.contains("-top-6")).toBe(false);
    }
  });

  it("usa a sombra dura, a rotação de -1,4° e o papel da V4", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const sheet = root(container);
    expect(sheet.className).toContain("shadow-[10px_12px_0_var(--color-ink)]");
    expect(sheet.className).toContain("-rotate-[1.4deg]");
    expect(sheet.className).toContain("bg-sheet");
    expect(sheet.className).toContain("border-ink");
  });

  it("numera as linhas com marcadores decorativos 01, 02 e 03", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    expect(
      Array.from(
        container.querySelectorAll('li > [aria-hidden="true"]:first-child'),
      ).map((node) => node.textContent),
    ).toEqual(["01", "02", "03"]);
  });

  it("escalona os atrasos das linhas (0, 0,5 s, 1 s) e do resultado (1,5 s), como na V4", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const rows = Array.from(container.querySelectorAll("li"));
    expect(rows.map((row) => row.className)).toEqual([
      expect.stringContaining("[--d:0s]"),
      expect.stringContaining("[--d:0.5s]"),
      expect.stringContaining("[--d:1s]"),
    ]);
    expect(screen.getByText(/Result:/).className).toContain("[--d:1.5s]");
  });
});

describe("Folha de rascunho: estados Draft e Final", () => {
  it("começa em DRAFT: data-edited=false, botão 'Apply the edits' sem aria-pressed", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    expect(root(container).getAttribute("data-edited")).toBe("false");
    const button = screen.getByRole("button", { name: "Apply the edits" });
    // O nome do botão muda conforme a ação: não combina com aria-pressed (WAI-ARIA).
    expect(button.hasAttribute("aria-pressed")).toBe(false);
    expect(screen.getByRole("status").textContent).toBe(
      "Draft: the edits have not been applied.",
    );
  });

  it("aplica as edições sozinho depois de 1,8 s se a pessoa não interagiu", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    act(() => {
      vi.advanceTimersByTime(1799);
    });
    expect(root(container).getAttribute("data-edited")).toBe("false");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(root(container).getAttribute("data-edited")).toBe("true");
    const button = screen.getByRole("button", { name: "Undo the edits" });
    expect(button.hasAttribute("aria-pressed")).toBe(false);
    expect(screen.getByRole("status").textContent).toBe(
      "Final: the edits were applied.",
    );
  });

  it("clicar em 'Apply the edits' aplica na hora; desfazer volta a DRAFT e não reaplica sozinho", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    fireEvent.click(screen.getByRole("button", { name: "Apply the edits" }));
    expect(root(container).getAttribute("data-edited")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Undo the edits" }));
    expect(root(container).getAttribute("data-edited")).toBe("false");
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(root(container).getAttribute("data-edited")).toBe("false");
    expect(
      screen.getByRole("button", { name: "Apply the edits" }),
    ).toBeTruthy();
  });

  it("o foco no botão também cancela a aplicação automática (teclado)", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const button = screen.getByRole("button", { name: "Apply the edits" });
    fireEvent.focus(button);
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(root(container).getAttribute("data-edited")).toBe("false");
  });

  it("ao desmontar antes dos 1,8 s o temporizador é limpo", () => {
    const { unmount } = render(<DraftSheet sheet={en.hero.sheet} />);

    unmount();

    expect(() =>
      act(() => {
        vi.advanceTimersByTime(5000);
      }),
    ).not.toThrow();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("com prefers-reduced-motion mostra o estado final de imediato", () => {
    mockReducedMotion(true);
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    expect(root(container).getAttribute("data-edited")).toBe("true");
    expect(screen.getByRole("button", { name: "Undo the edits" })).toBeTruthy();
  });

  it("os botões da folha e da faixa nunca usam aria-pressed", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    expect(container.querySelector("[aria-pressed]")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Apply the edits" }));
    expect(container.querySelector("[aria-pressed]")).toBeNull();
  });

  it("no estado DRAFT as respostas e o resultado ficam fora da árvore de acessibilidade (aria-hidden)", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    const answer = screen.getByText("One dashboard for the whole team.");
    const result = screen.getByText(/Result:/);
    expect(answer.getAttribute("aria-hidden")).toBe("true");
    expect(result.getAttribute("aria-hidden")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Apply the edits" }));
    expect(answer.hasAttribute("aria-hidden")).toBe(false);
    expect(result.hasAttribute("aria-hidden")).toBe(false);
  });

  it("o texto de estado é uma região educada e atômica", () => {
    render(<DraftSheet sheet={en.hero.sheet} />);

    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.getAttribute("aria-atomic")).toBe("true");
    expect(status.className).toContain("sr-only");
  });

  it("dois cliques seguidos no mesmo ciclo voltam ao estado original", () => {
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);

    const button = screen.getByRole("button", { name: "Apply the edits" });
    act(() => {
      button.click();
      button.click();
    });

    expect(root(container).getAttribute("data-edited")).toBe("false");
  });

  it("mudar de movimento reduzido para normal depois de montar não faz a folha piscar para DRAFT", () => {
    let listener: (() => void) | undefined;
    let reduce = true;
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return reduce && query.includes("prefers-reduced-motion");
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => {
          listener = cb;
        },
        removeEventListener: vi.fn(),
      })),
    );
    const { container } = render(<DraftSheet sheet={en.hero.sheet} />);
    expect(root(container).getAttribute("data-edited")).toBe("true");

    // Depois dos 1,8 s a aplicação automática já ocorreu: a preferência pode mudar.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    reduce = false;
    act(() => {
      listener?.();
    });

    expect(root(container).getAttribute("data-edited")).toBe("true");
  });

  it("initialEdited fixa o estado inicial e não agenda aplicação automática", () => {
    const { container } = render(
      <DraftSheet sheet={en.hero.sheet} initialEdited />,
    );

    expect(root(container).getAttribute("data-edited")).toBe("true");
    expect(vi.getTimerCount()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Undo the edits" }));
    expect(root(container).getAttribute("data-edited")).toBe("false");
  });

  it("as respostas, o resultado e os selos dependem do estado (opacidade por variante)", () => {
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
      expect(
        note.classList.contains("group-data-[edited=true]:translate-y-0"),
      ).toBe(true);
    }
    expect(screen.getByText("FINAL").className).toContain(
      "group-data-[edited=true]:opacity-100",
    );
    expect(screen.getByText("DRAFT").className).toContain(
      "group-data-[edited=true]:opacity-0",
    );
  });

  it("o botão é um <button> com altura mínima de toque e rótulo no idioma", () => {
    render(<DraftSheet sheet={pt.hero.sheet} />);

    const button = screen.getByRole("button", { name: "Aplicar as edições" });
    expect(button.tagName).toBe("BUTTON");
    expect(button.classList.contains("min-h-[52px]")).toBe(true);
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "Desfazer as edições" }),
    ).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe(
      "Final: as edições foram aplicadas.",
    );
  });

  it.each([
    ["en", en, false],
    ["en", en, true],
    ["pt", pt, false],
    ["pt", pt, true],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s, editado=%s)",
    async (_name, dictionary, edited) => {
      vi.useRealTimers();
      const { container } = render(
        <DraftSheet sheet={dictionary.hero.sheet} initialEdited={edited} />,
      );

      await expectNoA11yViolations(container);
    },
  );
});
