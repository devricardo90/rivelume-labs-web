import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Seletor de idioma", () => {
  it("é uma navegação com nome acessível no idioma atual", () => {
    render(
      <LanguageSwitcher
        current="pt"
        label={pt.language.label}
        names={pt.language.names}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Idioma" })).toBeTruthy();
  });

  it("usa links comuns para /en e /pt com lang e hreflang corretos", () => {
    render(
      <LanguageSwitcher
        current="en"
        label={en.language.label}
        names={en.language.names}
      />,
    );

    const english = screen.getByRole("link", { name: "English" });
    const portuguese = screen.getByRole("link", { name: "Português (Brasil)" });
    expect(english.getAttribute("href")).toBe("/en");
    expect(english.getAttribute("hreflang")).toBe("en");
    expect(english.getAttribute("lang")).toBe("en");
    expect(portuguese.getAttribute("href")).toBe("/pt");
    expect(portuguese.getAttribute("hreflang")).toBe("pt-BR");
    expect(portuguese.getAttribute("lang")).toBe("pt-BR");
  });

  it("marca só o idioma atual com aria-current", () => {
    render(
      <LanguageSwitcher
        current="pt"
        label={pt.language.label}
        names={pt.language.names}
      />,
    );

    expect(
      screen
        .getByRole("link", { name: "Português (Brasil)" })
        .getAttribute("aria-current"),
    ).toBe("true");
    expect(
      screen
        .getByRole("link", { name: "English" })
        .getAttribute("aria-current"),
    ).toBeNull();
  });

  it("não depende de cookie nem de JavaScript: são âncoras", () => {
    const { container } = render(
      <LanguageSwitcher
        current="en"
        label={en.language.label}
        names={en.language.names}
      />,
    );

    expect(container.querySelectorAll("a[href]")).toHaveLength(2);
    expect(container.querySelector("button")).toBeNull();
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <LanguageSwitcher
        current="en"
        label={en.language.label}
        names={en.language.names}
      />,
    );

    await expectNoA11yViolations(container);
  });
});
