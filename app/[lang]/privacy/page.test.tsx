import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PrivacyPage, { generateMetadata } from "@/app/[lang]/privacy/page";
import { expectNoA11yViolations } from "@/test/a11y";

const params = (lang: string) => Promise.resolve({ lang });

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Política de Privacidade (rascunho)", () => {
  it("é uma página com main, h1 e aviso de RASCUNHO bem visível, em EN", async () => {
    render(await PrivacyPage({ params: params("en") }));

    expect(screen.getByRole("main").id).toBe("main");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Privacy Policy",
    );
    expect(
      screen.getByText("Draft: to be reviewed before publication"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /This page is a draft placeholder\. It is not a final policy/,
      ),
    ).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: "Back to home" }).getAttribute("href"),
    ).toBe("/en");
  });

  it("não traz afirmações jurídicas nem de conformidade", async () => {
    const { container } = render(await PrivacyPage({ params: params("en") }));

    expect(container.textContent).not.toMatch(
      /GDPR|LGPD|CCPA|compliant|in accordance with|we comply|legal basis|Data Protection Officer/i,
    );
  });

  it("existe em PT-BR, também como rascunho", async () => {
    render(await PrivacyPage({ params: params("pt") }));

    expect(
      screen.getByText("Rascunho: a ser revisado antes da publicação"),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Política de Privacidade",
    );
    expect(
      screen
        .getByRole("link", { name: "Voltar ao início" })
        .getAttribute("href"),
    ).toBe("/pt");
  });

  it("fica fora dos mecanismos de busca e aponta o canonical para a própria página", async () => {
    vi.stubEnv("SITE_URL", "https://example.com");

    const metadata = await generateMetadata({ params: params("pt") });
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.title).toBe(
      "Política de Privacidade (rascunho) — Rivelume Labs",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://example.com/pt/privacy",
    );
  });

  it("responde 404 para idioma desconhecido", async () => {
    await expect(PrivacyPage({ params: params("fr") })).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
    await expect(
      generateMetadata({ params: params("fr") }),
    ).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it.each(["en", "pt"])(
    "não tem violações de acessibilidade detectáveis pelo axe (%s)",
    async (lang) => {
      const { container } = render(await PrivacyPage({ params: params(lang) }));

      await expectNoA11yViolations(container);
    },
  );
});
