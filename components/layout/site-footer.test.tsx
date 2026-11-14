import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

function renderFooter(locale: "en" | "pt" = "en") {
  const dictionary = locale === "en" ? en : pt;
  return render(<SiteFooter footer={dictionary.footer} nav={dictionary.nav} />);
}

describe("Rodapé", () => {
  it("é o landmark contentinfo sobre fundo Ink (foco em Highlight)", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");
    expect(footer.getAttribute("data-tone")).toBe("ink");
    expect(footer.classList.contains("bg-ink")).toBe(true);
  });

  it("mostra a descrição, o fecho e os direitos da V4", () => {
    renderFooter();

    expect(
      screen.getByText(
        "Custom software, automation, and practical AI for businesses.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Drawn by hand. Built in code.")).toBeTruthy();
    expect(screen.getByText("© Rivelume Labs")).toBeTruthy();
  });

  it("tem a navegação do rodapé com as mesmas âncoras, SEM Home", () => {
    renderFooter();

    const nav = screen.getByRole("navigation", { name: "Footer" });
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#services",
      "#work",
      "#process",
      "#about",
      "#contact",
    ]);
    expect(screen.queryByText("Home")).toBeNull();
  });

  it("mostra a política de privacidade como texto, não como link", () => {
    renderFooter();

    expect(screen.getByText("Privacy Policy (coming soon)")).toBeTruthy();
    expect(screen.queryByRole("link", { name: /privacy/i })).toBeNull();
  });

  it("está em português do Brasil no idioma PT", () => {
    renderFooter("pt");

    expect(screen.getByRole("navigation", { name: "Rodapé" })).toBeTruthy();
    expect(screen.getByText("Política de Privacidade (em breve)")).toBeTruthy();
    expect(
      screen.getByText("Desenhado à mão. Construído em código."),
    ).toBeTruthy();
  });

  it.each(["en", "pt"] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (locale) => {
      const { container } = renderFooter(locale);

      await expectNoA11yViolations(container);
    },
  );
});
