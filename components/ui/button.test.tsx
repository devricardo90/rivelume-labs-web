import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  BUTTON_VARIANTS,
  Button,
  ButtonLink,
  buttonClasses,
} from "@/components/ui/button";
import { expectNoA11yViolations } from "@/test/a11y";

describe("Button (V4 Red Pen)", () => {
  it("renderiza um <button type=button> por padrão (não envia formulários sem querer)", () => {
    render(<Button>Apply the edits</Button>);

    const button = screen.getByRole("button", { name: "Apply the edits" });
    expect(button.getAttribute("type")).toBe("button");
  });

  it("aceita type=submit explícito", () => {
    render(<Button type="submit">Enviar</Button>);

    expect(screen.getByRole("button").getAttribute("type")).toBe("submit");
  });

  it("variante ink: fundo Ink, texto Paper e sombra dura Burgundy de 6px (9px no hover)", () => {
    render(<Button variant="ink">x</Button>);

    const classes = screen.getByRole("button").classList;
    for (const name of [
      "bg-ink",
      "text-paper",
      "shadow-hard-burgundy",
      "hover:shadow-hard-burgundy-lg",
      "active:shadow-none",
      "border-2",
      "border-ink",
    ]) {
      expect(classes.contains(name)).toBe(true);
    }
  });

  it("variante highlight: fundo Highlight, texto Ink e sombra dura Ink", () => {
    render(<Button variant="highlight">x</Button>);

    const classes = screen.getByRole("button").classList;
    for (const name of [
      "bg-highlight",
      "text-ink",
      "shadow-hard-ink",
      "hover:shadow-hard-ink-lg",
      "active:shadow-none",
    ]) {
      expect(classes.contains(name)).toBe(true);
    }
    expect(classes.contains("bg-ink")).toBe(false);
  });

  it("usa a variante ink por padrão", () => {
    render(<Button>x</Button>);

    expect(screen.getByRole("button").classList.contains("bg-ink")).toBe(true);
  });

  it("tem alvo de toque de pelo menos 52px e texto de 17px (V4)", () => {
    render(<Button>x</Button>);

    const classes = screen.getByRole("button").classList;
    expect(classes.contains("min-h-[52px]")).toBe(true);
    expect(classes.contains("box-content")).toBe(true);
    expect(classes.contains("text-[17px]")).toBe(true);
    expect(classes.contains("font-semibold")).toBe(true);
  });

  it("desloca no hover (-2px) e no clique (+3px)", () => {
    render(<Button>x</Button>);

    const classes = screen.getByRole("button").classList;
    for (const name of [
      "hover:-translate-x-0.5",
      "hover:-translate-y-0.5",
      "active:translate-x-[3px]",
      "active:translate-y-[3px]",
    ]) {
      expect(classes.contains(name)).toBe(true);
    }
  });

  it("chama onClick e respeita disabled", () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>x</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button onClick={onClick} disabled>
        x
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
  });

  it("repassa aria-pressed (usado pelo botão Draft/Final)", () => {
    render(<Button aria-pressed="true">x</Button>);

    expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe(
      "true",
    );
  });

  it("buttonClasses cobre todas as variantes e acrescenta className", () => {
    for (const variant of BUTTON_VARIANTS) {
      expect(buttonClasses(variant, "extra")).toContain("extra");
      expect(buttonClasses(variant)).not.toContain("undefined");
    }
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(
      <div>
        <Button>Um</Button>
        <Button variant="highlight" aria-pressed="false">
          Dois
        </Button>
        <Button disabled>Três</Button>
      </div>,
    );

    await expectNoA11yViolations(container);
  });
});

describe("ButtonLink (V4 Red Pen)", () => {
  it("renderiza uma âncora com o href e a aparência de botão", () => {
    render(
      <ButtonLink href="#contact" variant="highlight">
        Let&apos;s talk
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Let's talk" });
    expect(link.getAttribute("href")).toBe("#contact");
    expect(link.classList.contains("bg-highlight")).toBe(true);
    expect(link.classList.contains("min-h-[52px]")).toBe(true);
  });

  it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
    const { container } = render(<ButtonLink href="/en">Início</ButtonLink>);

    await expectNoA11yViolations(container);
  });
});
