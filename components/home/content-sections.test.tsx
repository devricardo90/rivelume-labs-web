import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "@/components/home/about-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { WorkSection } from "@/components/home/work-section";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

const DICTIONARIES = [
  ["en", en],
  ["pt", pt],
] as const;

describe("Services", () => {
  it("é a seção #services com h2 e os TRÊS serviços oficiais em h3, numerados 01 a 03", () => {
    const { container } = render(<ServicesSection services={en.services} />);

    expect(container.querySelector("section")?.id).toBe("services");
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "Technology with a job to do.",
    );
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual([
      "Custom Software Development",
      "Business Automation",
      "Practical AI Solutions",
    ]);
    expect(
      Array.from(container.querySelectorAll('li > [aria-hidden="true"]')).map(
        (node) => node.textContent,
      ),
    ).toEqual(["01", "02", "03"]);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("não usa o nome 'Business Process Automation' da V4", () => {
    render(<ServicesSection services={en.services} />);

    expect(screen.queryByText(/Business Process Automation/)).toBeNull();
  });

  it("mostra aplicação prática, exemplo em mono e o benefício manuscrito", () => {
    render(<ServicesSection services={en.services} />);

    expect(screen.getAllByText("Practical application")).toHaveLength(3);
    expect(screen.getByText("leads.csv")).toBeTruthy();
    expect(screen.getByText("one dashboard").tagName).toBe("STRONG");
    expect(screen.getByText("More time for higher-value work.")).toBeTruthy();
  });

  it("liga hover e foco interno ao marcador, ao sublinhado e à seta", () => {
    const { container } = render(<ServicesSection services={en.services} />);

    const row = container.querySelector("li") as HTMLElement;
    expect(row.className).toContain("group/row");
    expect(row.className).toContain("hover:bg-burgundy/6");
    expect(row.className).toContain("focus-within:bg-burgundy/6");
    const marker = row.querySelector(".marker-reveal") as HTMLElement;
    expect(marker.className).toContain("group-hover/row:bg-[length:100%_100%]");
    expect(marker.className).toContain(
      "group-focus-within/row:bg-[length:100%_100%]",
    );
    expect(row.querySelector(".underline-reveal")?.className).toContain(
      "group-hover/row:bg-[length:100%_3px]",
    );
    expect(
      row.querySelector('[aria-hidden="true"].inline-block')?.className,
    ).toContain("group-hover/row:translate-x-2");
  });

  it.each(DICTIONARIES)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_name, dictionary) => {
      const { container } = render(
        <main>
          <ServicesSection services={dictionary.services} />
        </main>,
      );

      await expectNoA11yViolations(container);
    },
  );
});

describe("Selected Work", () => {
  it("é a seção #work sobre Deep Burgundy com três cartões de CONCEITO", () => {
    const { container } = render(<WorkSection work={en.work} />);

    const section = container.querySelector("section") as HTMLElement;
    expect(section.id).toBe("work");
    expect(section.getAttribute("data-tone")).toBe("burgundy-deep");
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(3);
    for (const [index, card] of cards.entries()) {
      expect(card.textContent).toContain(`Concept 0${index + 1}`);
      expect(card.textContent).toContain("Case study soon");
      expect(card.textContent).toContain("/ concept ]");
    }
  });

  it("deixa explícito que são conceitos e que os projetos dependem de aprovação", () => {
    render(<WorkSection work={en.work} />);

    expect(
      screen.getByText(/These concepts show how we will present selected work/),
    ).toBeTruthy();
    expect(screen.getByText(/subject to approval/)).toBeTruthy();
  });

  it("não traz cliente, depoimento, resultado, métrica nem link de case", () => {
    const { container } = render(<WorkSection work={en.work} />);

    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.textContent).not.toMatch(
      /testimonial|%|\d+x\b|increase|saved|revenue|ROI/i,
    );
  });

  it("cada cartão tem h3, rótulo de problema e fita decorativa", () => {
    const { container } = render(<WorkSection work={en.work} />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(["Own Project", "Technical Demonstration", "Client Project"]);
    expect(screen.getAllByText("Business problem")).toHaveLength(3);
    expect(
      container.querySelectorAll("article > [aria-hidden='true']"),
    ).toHaveLength(3);
  });

  it("inclina os cartões e os levanta no hover e no foco interno", () => {
    render(<WorkSection work={en.work} />);

    const [first, second, third] = screen.getAllByRole("article");
    expect(first.className).toContain("-rotate-[1.6deg]");
    expect(second.className).toContain("rotate-1");
    expect(second.className).toContain("mt-10");
    expect(third.className).toContain("-rotate-[0.8deg]");
    for (const card of [first, second, third]) {
      expect(card.className).toContain("hover:rotate-0");
      expect(card.className).toContain("hover:-translate-y-2");
      expect(card.className).toContain("focus-within:rotate-0");
    }
  });

  it.each(DICTIONARIES)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_name, dictionary) => {
      const { container } = render(
        <main>
          <WorkSection work={dictionary.work} />
        </main>,
      );

      await expectNoA11yViolations(container);
    },
  );
});

describe("How We Work", () => {
  it("é a seção #process com os quatro passos aprovados na ordem Understand, Plan, Build, Deliver", () => {
    const { container } = render(<ProcessSection process={en.process} />);

    expect(container.querySelector("section")?.id).toBe("process");
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(
      within(list)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(["Understand", "Plan", "Build", "Deliver"]);
    expect(
      screen.getByText("understand → plan → build → deliver"),
    ).toBeTruthy();
  });

  it("não usa Listen, Map nem Maintain e não promete manutenção recorrente", () => {
    const { container } = render(<ProcessSection process={en.process} />);

    expect(container.textContent).not.toMatch(
      /Listen|\bMap\b|Maintain|ongoing|support plan/i,
    );
  });

  it("preenche a borda superior de cada passo no hover e no foco interno", () => {
    const { container } = render(<ProcessSection process={en.process} />);

    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(item.className).toContain("group/step");
      expect(item.className).toContain("border-t-[3px]");
      const line = item.querySelector("div[aria-hidden='true']") as HTMLElement;
      expect(line.className).toContain("group-hover/step:w-full");
      expect(line.className).toContain("group-focus-within/step:w-full");
      expect(item.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
        "true",
      );
    }
  });

  it("destaca 'understood.' em itálico com sublinhado ondulado Red Pen", () => {
    render(<ProcessSection process={en.process} />);

    const em = screen.getByText("understood.");
    expect(em.tagName).toBe("EM");
    expect(em.className).toContain("decoration-red-pen");
    expect(em.className).toContain("[text-decoration-style:wavy]");
  });

  it.each(DICTIONARIES)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_name, dictionary) => {
      const { container } = render(
        <main>
          <ProcessSection process={dictionary.process} />
        </main>,
      );

      await expectNoA11yViolations(container);
    },
  );
});

describe("About", () => {
  it("é a seção #about sobre Highlight com bordas Ink e o título da V4", () => {
    const { container } = render(<AboutSection about={en.about} />);

    const section = container.querySelector("section") as HTMLElement;
    expect(section.id).toBe("about");
    expect(section.getAttribute("data-tone")).toBe("highlight");
    expect(section.className).toContain("border-y-2");
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "Small studio. Serious about the details.",
    );
  });

  it("apresenta um pequeno estúdio, sem equipe, certificações nem histórico", () => {
    const { container } = render(<AboutSection about={en.about} />);

    expect(screen.getByText(/is a small technology studio/)).toBeTruthy();
    expect(container.textContent).not.toMatch(
      /founded|since \d{4}|years of experience|certified|certification|our team|award/i,
    );
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual([
      "Practical technology",
      "Clear communication",
      "Long-term maintainability",
    ]);
  });

  it.each(DICTIONARIES)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (_name, dictionary) => {
      const { container } = render(
        <main>
          <AboutSection about={dictionary.about} />
        </main>,
      );

      await expectNoA11yViolations(container);
    },
  );
});

describe("Conteúdo PT-BR", () => {
  it("traduz os serviços, os conceitos, o processo e o About", () => {
    render(
      <main>
        <ServicesSection services={pt.services} />
        <WorkSection work={pt.work} />
        <ProcessSection process={pt.process} />
        <AboutSection about={pt.about} />
      </main>,
    );

    expect(screen.getByText("Automação de Negócios")).toBeTruthy();
    expect(screen.getByText("Conceito 01")).toBeTruthy();
    expect(screen.getByText("Entender")).toBeTruthy();
    expect(screen.getByText(/pequeno estúdio de tecnologia/)).toBeTruthy();
    expect(screen.queryByText("Business Automation")).toBeNull();
  });
});
