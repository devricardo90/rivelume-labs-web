import { render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

function renderSwitcher(locale: "en" | "pt") {
  const dictionary = locale === "en" ? en : pt;
  return render(
    <LanguageSwitcher
      current={locale}
      label={dictionary.language.label}
      names={dictionary.language.names}
      codes={dictionary.language.codes}
    />,
  );
}

afterEach(() => {
  window.location.hash = "";
});

describe("Seletor de idioma", () => {
  it("é uma navegação com nome acessível no idioma atual", () => {
    renderSwitcher("pt");

    expect(screen.getByRole("navigation", { name: "Idioma" })).toBeTruthy();
  });

  it("mostra EN e PT e dá a cada link o nome do idioma por extenso", () => {
    renderSwitcher("en");

    const english = screen.getByRole("link", { name: "EN, English" });
    const portuguese = screen.getByRole("link", {
      name: "PT, Português (Brasil)",
    });
    expect(english.textContent).toBe("EN");
    expect(portuguese.textContent).toBe("PT");
  });

  it("usa links comuns para /en e /pt com lang e hreflang corretos", () => {
    renderSwitcher("en");

    const english = screen.getByRole("link", { name: "EN, English" });
    const portuguese = screen.getByRole("link", {
      name: "PT, Português (Brasil)",
    });
    expect(english.getAttribute("href")).toBe("/en");
    expect(english.getAttribute("hreflang")).toBe("en");
    expect(english.getAttribute("lang")).toBe("en");
    expect(portuguese.getAttribute("href")).toBe("/pt");
    expect(portuguese.getAttribute("hreflang")).toBe("pt-BR");
    expect(portuguese.getAttribute("lang")).toBe("pt-BR");
  });

  it("marca só o idioma atual com aria-current", () => {
    renderSwitcher("pt");

    expect(
      screen
        .getByRole("link", { name: "PT, Português (Brasil)" })
        .getAttribute("aria-current"),
    ).toBe("true");
    expect(
      screen
        .getByRole("link", { name: "EN, English" })
        .getAttribute("aria-current"),
    ).toBeNull();
  });

  it("não depende de cookie nem de JavaScript para trocar: são âncoras", () => {
    const { container } = renderSwitcher("en");

    expect(container.querySelectorAll("a[href]")).toHaveLength(2);
    expect(container.querySelector("button")).toBeNull();
  });

  it("preserva a seção atual (hash) ao trocar de idioma", () => {
    window.location.hash = "#services";
    renderSwitcher("en");

    expect(
      screen
        .getByRole("link", { name: "PT, Português (Brasil)" })
        .getAttribute("href"),
    ).toBe("/pt#services");
    expect(
      screen.getByRole("link", { name: "EN, English" }).getAttribute("href"),
    ).toBe("/en#services");
  });

  it("renderiza no servidor sem hash, mesmo com hash no navegador (hidratação segura)", () => {
    window.location.hash = "#services";
    const html = renderToStaticMarkup(
      <LanguageSwitcher
        current="en"
        label={en.language.label}
        names={en.language.names}
        codes={en.language.codes}
      />,
    );

    expect(html).toContain('href="/pt"');
    expect(html).not.toContain("#services");
  });

  it("acompanha a mudança de seção depois de montado (hashchange)", async () => {
    renderSwitcher("en");
    const portuguese = screen.getByRole("link", {
      name: "PT, Português (Brasil)",
    });
    expect(portuguese.getAttribute("href")).toBe("/pt");

    window.location.hash = "#contact";

    await waitFor(() =>
      expect(portuguese.getAttribute("href")).toBe("/pt#contact"),
    );
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = renderSwitcher("en");

    await expectNoA11yViolations(container);
  });
});
