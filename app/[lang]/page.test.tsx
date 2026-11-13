import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/[lang]/page";

const params = (lang: string) => Promise.resolve({ lang });

describe("Página inicial por idioma", () => {
  it("renderiza o texto em inglês em /en", async () => {
    render(await Home({ params: params("en") }));

    expect(screen.getByText("Website under construction.")).toBeTruthy();
  });

  it("renderiza o texto em português do Brasil em /pt", async () => {
    render(await Home({ params: params("pt") }));

    expect(screen.getByText("Site em construção.")).toBeTruthy();
  });

  it("marca o idioma atual no seletor", async () => {
    render(await Home({ params: params("pt") }));

    const current = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "true");
    expect(current).toHaveLength(1);
    expect(current[0].getAttribute("href")).toBe("/pt");
  });

  it("responde 404 para idioma desconhecido", async () => {
    await expect(Home({ params: params("fr") })).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });
});
