import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/home/hero";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Hero", () => {
  it("tem um único h1 com o título da V4 em EN", () => {
    render(<Hero hero={en.hero} />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe("Software thatmakes businesssimpler.");
    expect(headings[0].classList.contains("font-serif")).toBe(true);
    expect(headings[0].querySelectorAll("br")).toHaveLength(2);
  });

  it("destaca a última palavra em itálico sobre o marcador amarelo com varredura", () => {
    render(<Hero hero={en.hero} />);

    const em = screen.getByText("simpler.");
    expect(em.tagName).toBe("EM");
    expect(em.parentElement?.classList.contains("marker")).toBe(true);
    expect(em.parentElement?.classList.contains("marker-sweep")).toBe(true);
  });

  it("mostra o eyebrow, o parágrafo de apoio e o CTA que levam ao contato", () => {
    render(<Hero hero={en.hero} />);

    expect(screen.getByText("Technology studio")).toBeTruthy();
    expect(
      screen.getByText(/custom software, automation, and practical AI/),
    ).toBeTruthy();
    const cta = screen.getByRole("link", {
      name: /Let’s Talk About Your Project/,
    });
    expect(cta.getAttribute("href")).toBe("#contact");
    expect(cta.classList.contains("bg-ink")).toBe(true);
  });

  it("tem os links secundários para o processo e os serviços", () => {
    render(<Hero hero={en.hero} />);

    expect(
      screen
        .getByRole("link", { name: "See how we build" })
        .getAttribute("href"),
    ).toBe("#process");
    expect(
      screen
        .getByRole("link", { name: "Explore Our Services" })
        .getAttribute("href"),
    ).toBe("#services");
  });

  it("esconde dos leitores de tela o rótulo vertical, a nota e a seta", () => {
    const { container } = render(<Hero hero={en.hero} />);

    const hidden = Array.from(
      container.querySelectorAll('[aria-hidden="true"]'),
    )
      .map((node) => node.textContent)
      .join("|");
    expect(hidden).toContain("RIVELUME LABS / TECHNOLOGY STUDIO");
    expect(hidden).toContain("this is the job.");
  });

  it("oculta o rótulo vertical e a nota abaixo de 1100px (visíveis só em min-[1101px])", () => {
    const { container } = render(<Hero hero={en.hero} />);

    const label = screen.getByText("RIVELUME LABS / TECHNOLOGY STUDIO");
    expect(label.classList.contains("hidden")).toBe(true);
    expect(label.classList.contains("min-[1101px]:block")).toBe(true);
    const note = screen.getByText("this is the job.").parentElement;
    expect(note?.classList.contains("hidden")).toBe(true);
    expect(note?.classList.contains("min-[1101px]:flex")).toBe(true);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("inclui a folha de rascunho com o selo Example", () => {
    render(<Hero hero={en.hero} />);

    expect(screen.getByText("Example")).toBeTruthy();
    expect(screen.getByText("monday_morning — draft 3")).toBeTruthy();
  });

  it("traduz o Hero para PT-BR", () => {
    render(<Hero hero={pt.hero} />);

    expect(screen.getByText("Estúdio de tecnologia")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Vamos conversar sobre o seu projeto/ }),
    ).toBeTruthy();
    expect(screen.getByText("Exemplo")).toBeTruthy();
    expect(screen.queryByText("Example")).toBeNull();
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_locale, dictionary) => {
      const { container } = render(
        <main>
          <Hero hero={dictionary.hero} />
        </main>,
      );

      await expectNoA11yViolations(container);
    },
  );
});
