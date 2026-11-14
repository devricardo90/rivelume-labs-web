import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePlaceholder } from "@/components/home/home-placeholder";
import { LOCALES } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Placeholder da página inicial", () => {
  it("mostra o título principal da marca e o aviso em inglês", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Rivelume Labs",
    );
    expect(screen.getByText("Website under construction.")).toBeTruthy();
  });

  it("mostra o aviso em português do Brasil", () => {
    render(<HomePlaceholder locale="pt" dictionary={pt} />);

    expect(screen.getByText("Site em construção.")).toBeTruthy();
    expect(screen.queryByText("Website under construction.")).toBeNull();
  });

  it("tem um único h1 e ele fica dentro do landmark main", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const main = screen.getByRole("main");
    expect(main.contains(screen.getByRole("heading", { level: 1 }))).toBe(true);
  });

  it("usa o Container de 1280px para limitar a largura do conteúdo", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.parentElement?.classList.contains("max-w-7xl")).toBe(true);
  });

  it("é o destino do link de pular (main com id=main) sobre uma faixa Paper", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    const main = screen.getByRole("main");
    expect(main.id).toBe("main");
    expect(main.querySelector('[data-tone="paper"]')?.tagName).toBe("SECTION");
  });

  it("usa Fraunces (font-serif) no título principal", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    expect(
      screen
        .getByRole("heading", { level: 1 })
        .classList.contains("font-serif"),
    ).toBe(true);
  });

  it("inclui o seletor de idioma com os dois idiomas", () => {
    render(<HomePlaceholder locale="en" dictionary={en} />);

    const nav = screen.getByRole("navigation", { name: "Language" });
    expect(nav.querySelectorAll("a")).toHaveLength(LOCALES.length);
  });

  it.each(LOCALES)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (locale) => {
      const dictionary = locale === "en" ? en : pt;
      const { container } = render(
        <HomePlaceholder locale={locale} dictionary={dictionary} />,
      );

      await expectNoA11yViolations(container);
    },
  );
});
