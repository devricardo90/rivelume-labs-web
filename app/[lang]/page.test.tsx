import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/[lang]/page";

const params = (lang: string) => Promise.resolve({ lang });

describe("Página inicial por idioma", () => {
  it("renderiza o Hero em inglês em /en, dentro do main", async () => {
    render(await Home({ params: params("en") }));

    const main = screen.getByRole("main");
    expect(main.id).toBe("main");
    expect(screen.getByText("Technology studio")).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renderiza as seções na ordem Hero, Services, Work, Process e About, com as âncoras da navegação", async () => {
    const { container } = render(await Home({ params: params("en") }));

    const ids = Array.from(container.querySelectorAll("main > section")).map(
      (section) => section.id,
    );
    expect(ids).toEqual(["", "services", "work", "process", "about"]);
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual([
      "Technology with a job to do.",
      "A portfolio in progress.",
      "A simple process, built to be understood.",
      "Small studio. Serious about the details.",
    ]);
  });

  it("renderiza o Hero em português do Brasil em /pt", async () => {
    render(await Home({ params: params("pt") }));

    expect(screen.getByText("Estúdio de tecnologia")).toBeTruthy();
    expect(screen.queryByText("Technology studio")).toBeNull();
  });

  it("responde 404 para idioma desconhecido", async () => {
    await expect(Home({ params: params("fr") })).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });
});
