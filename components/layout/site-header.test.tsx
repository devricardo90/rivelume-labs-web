import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

function renderHeader(locale: "en" | "pt" = "en") {
  const dictionary = locale === "en" ? en : pt;
  return render(
    <SiteHeader
      locale={locale}
      nav={dictionary.nav}
      language={dictionary.language}
    />,
  );
}

function expanded(name: string) {
  return screen.getByRole("button", { name }).getAttribute("aria-expanded");
}

describe("Cabeçalho", () => {
  it("é o landmark banner", () => {
    renderHeader();

    expect(screen.getByRole("banner")).toBeTruthy();
  });

  it("tem o logotipo como link para o início no idioma atual", () => {
    renderHeader("pt");

    const logo = screen.getByRole("link", {
      name: "Rivelume Labs, voltar ao início",
    });
    expect(logo.getAttribute("href")).toBe("/pt");
  });

  it("tem a navegação principal SEM Home, na ordem da V4", () => {
    renderHeader();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links.map((link) => link.textContent)).toEqual([
      "Services",
      "Work",
      "Process",
      "About",
      "Contact",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#services",
      "#work",
      "#process",
      "#about",
      "#contact",
    ]);
    expect(screen.queryByText("Home")).toBeNull();
  });

  it("traduz a navegação para PT-BR sem mudar as âncoras", () => {
    renderHeader("pt");

    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(
      Array.from(nav.querySelectorAll("a")).map((link) => link.textContent),
    ).toEqual(["Serviços", "Trabalhos", "Processo", "Sobre", "Contato"]);
    expect(nav.querySelector("a")?.getAttribute("href")).toBe("#services");
  });

  it("inclui o seletor de idioma funcional", () => {
    renderHeader();

    const switcher = screen.getByRole("navigation", { name: "Language" });
    expect(switcher.querySelectorAll("a")).toHaveLength(2);
  });

  describe("menu móvel", () => {
    it("começa fechado: botão com aria-expanded=false ligado ao painel", () => {
      renderHeader();

      const button = screen.getByRole("button", { name: "Menu" });
      expect(button.getAttribute("aria-expanded")).toBe("false");
      const panel = document.getElementById(
        button.getAttribute("aria-controls") ?? "",
      );
      expect(panel).toBeTruthy();
      expect(panel?.classList.contains("hidden")).toBe(true);
      expect(
        panel?.contains(screen.getByRole("link", { name: "Services" })),
      ).toBe(true);
    });

    it("abre e fecha pelo botão, trocando o rótulo", () => {
      renderHeader();

      fireEvent.click(screen.getByRole("button", { name: "Menu" }));
      expect(expanded("Close")).toBe("true");
      expect(
        document.getElementById("site-menu")?.classList.contains("hidden"),
      ).toBe(false);

      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      expect(expanded("Menu")).toBe("false");
    });

    it("fecha com Escape e devolve o foco ao botão", () => {
      renderHeader();
      fireEvent.click(screen.getByRole("button", { name: "Menu" }));

      fireEvent.keyDown(document, { key: "Escape" });

      expect(expanded("Menu")).toBe("false");
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Menu" }),
      );
    });

    it("fecha ao escolher um link", () => {
      renderHeader();
      fireEvent.click(screen.getByRole("button", { name: "Menu" }));

      fireEvent.click(screen.getByRole("link", { name: "Work" }));

      expect(expanded("Menu")).toBe("false");
    });

    it("tem alvo de toque de pelo menos 44px (min-h-11)", () => {
      renderHeader();

      expect(
        screen
          .getByRole("button", { name: "Menu" })
          .classList.contains("min-h-11"),
      ).toBe(true);
    });

    it("usa o rótulo em português", () => {
      renderHeader("pt");

      fireEvent.click(screen.getByRole("button", { name: "Menu" }));
      expect(screen.getByRole("button", { name: "Fechar" })).toBeTruthy();
    });
  });

  it.each(["en", "pt"] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s, menu fechado e aberto)",
    async (locale) => {
      const { container } = renderHeader(locale);
      await expectNoA11yViolations(container);

      const dictionary = locale === "en" ? en : pt;
      fireEvent.click(
        screen.getByRole("button", { name: dictionary.nav.menuOpen }),
      );
      await expectNoA11yViolations(container);
    },
  );
});
