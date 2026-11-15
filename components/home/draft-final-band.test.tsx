import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DraftFinalBand } from "@/components/home/draft-final-band";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Faixa 'The draft and the final'", () => {
  it("é uma região nomeada sobre Burgundy com bordas Ink", () => {
    render(<DraftFinalBand band={en.band} />);

    const region = screen.getByRole("region", {
      name: "The draft and the final",
    });
    expect(region.getAttribute("data-tone")).toBe("burgundy");
    expect(region.className).toContain("bg-burgundy");
    expect(region.className).toContain("border-y-2");
  });

  it("mostra a frase com 'the final.' em destaque amarelo inclinado", () => {
    render(<DraftFinalBand band={en.band} />);

    const emphasis = screen.getByText("the final.");
    expect(emphasis.className).toContain("bg-highlight");
    expect(emphasis.className).toContain("-rotate-2");
    expect(emphasis.className).toContain("not-italic");
    expect(emphasis.parentElement?.textContent).toBe(
      "That’s the draft. We build the final.",
    );
  });

  it("lista os nomes de arquivo uma vez para leitores de tela; a cópia do laço é aria-hidden", () => {
    const { container } = render(<DraftFinalBand band={en.band} />);

    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0].getAttribute("aria-hidden")).toBeNull();
    expect(lists[1].getAttribute("aria-hidden")).toBe("true");
    expect(
      Array.from(lists[0].querySelectorAll("li")).map((li) => li.textContent),
    ).toEqual(en.band.files);
    expect(lists[1].textContent).toBe(lists[0].textContent);
  });

  it("anima só pelo contêiner .marquee (CSS), sem biblioteca", () => {
    const { container } = render(<DraftFinalBand band={en.band} />);

    expect(container.querySelectorAll(".marquee")).toHaveLength(1);
  });

  it("tem um botão de pausa por teclado e toque, sem aria-pressed e com rótulo que alterna", () => {
    const { container } = render(<DraftFinalBand band={en.band} />);
    const region = container.querySelector("section") as HTMLElement;

    const pause = screen.getByRole("button", { name: "Pause motion" });
    // O nome muda conforme a ação: não combina com aria-pressed (WAI-ARIA).
    expect(pause.hasAttribute("aria-pressed")).toBe(false);
    expect(pause.classList.contains("min-h-11")).toBe(true);
    expect(region.getAttribute("data-paused")).toBe("false");

    fireEvent.click(pause);
    const play = screen.getByRole("button", { name: "Play motion" });
    expect(play.hasAttribute("aria-pressed")).toBe(false);
    expect(region.getAttribute("data-paused")).toBe("true");

    fireEvent.click(play);
    expect(region.getAttribute("data-paused")).toBe("false");
  });

  it("com prefers-reduced-motion some o botão e a cópia, e a lista quebra em linhas", () => {
    const { container } = render(<DraftFinalBand band={en.band} />);

    expect(
      screen.getByRole("button", { name: "Pause motion" }).parentElement
        ?.className,
    ).toContain("motion-reduce:hidden");
    const [first, second] = Array.from(container.querySelectorAll("ul"));
    expect(second.className).toContain("motion-reduce:hidden");
    expect(first.className).toContain("motion-reduce:flex-wrap");
    // Sem encolher, a lista estoura o contêiner e os nomes são cortados (verificado no Chrome).
    expect(first.className).toContain("motion-reduce:shrink");
    expect(first.className).toContain("motion-reduce:min-w-0");
    // Cada nome pode quebrar e perde o separador (senão nomes longos estouram a 320px).
    const item = first.querySelector("li") as HTMLElement;
    expect(item.className).toContain("motion-reduce:whitespace-normal");
    expect(item.className).toContain("motion-reduce:[overflow-wrap:anywhere]");
    expect(item.className).toContain("motion-reduce:after:content-none");
    expect(
      (container.querySelector(".marquee") as HTMLElement).className,
    ).toContain("motion-reduce:flex-wrap");
  });

  it("traduz a faixa para PT-BR", () => {
    render(<DraftFinalBand band={pt.band} />);

    expect(
      screen.getByRole("region", { name: "O rascunho e o final" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Pausar movimento" }),
    ).toBeTruthy();
    expect(screen.getByText("o final.")).toBeTruthy();
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s, em movimento e pausada)",
    async (_name, dictionary) => {
      const { container } = render(<DraftFinalBand band={dictionary.band} />);
      await expectNoA11yViolations(container);

      fireEvent.click(
        screen.getByRole("button", { name: dictionary.band.pause }),
      );
      await expectNoA11yViolations(container);
    },
  );
});
