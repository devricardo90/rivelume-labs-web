import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations, runAxe } from "@/test/a11y";

// Testes do próprio helper: provam que ele detecta problemas reais e que não
// depende de regras que o jsdom não consegue avaliar.
// `img` via createElement: o fixture precisa de <img> sem alt de propósito, e o
// lint (next/no-img-element, jsx-a11y/alt-text) trataria isso como erro de código.
const img = (props: { alt?: string }) =>
  createElement("img", { src: "/exemplo.png", ...props });

describe("helper de acessibilidade (axe-core)", () => {
  it("aceita marcação acessível", async () => {
    const { container } = render(
      <section aria-labelledby="titulo">
        <h2 id="titulo">Título</h2>
        <button type="button">Enviar</button>
        {img({ alt: "Diagrama do fluxo" })}
      </section>,
    );

    await expectNoA11yViolations(container);
  });

  it("detecta imagem sem texto alternativo", async () => {
    const { container } = render(img({}));

    const { violations } = await runAxe(container);
    expect(violations.map((v) => v.id)).toContain("image-alt");
    await expect(expectNoA11yViolations(container)).rejects.toThrow(
      "image-alt",
    );
  });

  it("detecta botão sem nome acessível", async () => {
    const { container } = render(<button type="button" />);

    const { violations } = await runAxe(container);
    expect(violations.map((v) => v.id)).toContain("button-name");
  });

  it("detecta campo de formulário sem rótulo", async () => {
    const { container } = render(<input type="text" />);

    const { violations } = await runAxe(container);
    expect(violations.map((v) => v.id)).toContain("label");
  });

  it("não avalia contraste de cores no jsdom (limite documentado)", async () => {
    const { container } = render(
      <p style={{ color: "#ccc", backgroundColor: "#fff" }}>Texto claro</p>,
    );

    // Passa de propósito: o contraste é verificado no Chrome, não aqui.
    await expectNoA11yViolations(container);
    const { violations } = await runAxe(container);
    expect(violations.map((v) => v.id)).not.toContain("color-contrast");
  });

  it("falha quando o axe não avalia nada (container vazio)", async () => {
    const { container } = render(<div />);

    await expect(expectNoA11yViolations(container)).rejects.toThrow(
      "nenhuma regra",
    );
  });

  it("falha de forma explícita para um nó fora do document", async () => {
    const detached = document.createElement("button");

    await expect(expectNoA11yViolations(detached)).rejects.toThrow();
  });

  it("detecta link sem nome, role inválido e ARIA inválido", async () => {
    const { container } = render(
      <div>
        <a href="/x" />
        <div role="foo" />
        {/* valor inválido de propósito; o cast evita o erro de tipos do React */}
        <button type="button" {...({ "aria-pressed": "maybe" } as object)}>
          Ok
        </button>
      </div>,
    );

    const ids = (await runAxe(container)).violations.map((v) => v.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "link-name",
        "aria-roles",
        "aria-valid-attr-value",
      ]),
    );
  });
});
