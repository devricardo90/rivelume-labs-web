import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/home/contact-form";
import { ContactSection } from "@/components/home/contact-section";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { expectNoA11yViolations } from "@/test/a11y";

afterEach(() => {
  vi.unstubAllGlobals();
});

function fill(name: string, email: string) {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: email },
  });
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: /Let’s Talk/ }));
}

describe("Seção de contato", () => {
  it("é a seção #contact sobre Burgundy, sem bordas, com h2, nota manuscrita e e-mail pendente", () => {
    const { container } = render(<ContactSection contact={en.contact} />);

    const section = container.querySelector("section") as HTMLElement;
    expect(section.id).toBe("contact");
    expect(section.getAttribute("data-tone")).toBe("burgundy");
    expect(section.className).not.toContain("border-y-2");
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "Have a business problem worth exploring?",
    );
    expect(screen.getByText("Messy is fine. Start there.")).toBeTruthy();
    expect(screen.getByText("Business email: to be announced.")).toBeTruthy();
  });

  it("avisa ANTES de enviar que é um formulário de demonstração", () => {
    render(<ContactSection contact={en.contact} />);

    expect(
      screen.getByText("Preview form: nothing is sent or stored."),
    ).toBeTruthy();
  });

  it("traduz a seção para PT-BR", () => {
    render(<ContactSection contact={pt.contact} />);

    expect(screen.getByLabelText("Nome")).toBeTruthy();
    expect(
      screen.getByText(
        "Formulário de demonstração: nada é enviado nem armazenado.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("E-mail comercial: a ser divulgado.")).toBeTruthy();
  });
});

describe("Formulário de contato (demonstração)", () => {
  it("associa rótulos aos campos e usa texto de pelo menos 16px", () => {
    render(<ContactForm contact={en.contact} />);

    const name = screen.getByLabelText("Name") as HTMLInputElement;
    const email = screen.getByLabelText("Email") as HTMLInputElement;
    const message = screen.getByLabelText("Message (optional)");
    expect(name.type).toBe("text");
    expect(email.type).toBe("email");
    expect(message.tagName).toBe("TEXTAREA");
    for (const field of [name, email, message]) {
      expect(field.className).toContain("text-[22px]");
    }
    expect(name.placeholder).toBe("Your name");
    expect(name.className).toContain("placeholder:text-rose");
  });

  it("oferece os quatro temas como botões de alternância com aria-pressed, em um grupo nomeado", () => {
    render(<ContactForm contact={en.contact} />);

    const group = screen.getByRole("group", {
      name: "What would you like to improve?",
    });
    const chips = Array.from(group.querySelectorAll("button"));
    expect(chips.map((chip) => chip.textContent)).toEqual([
      "Software",
      "Automation",
      "AI",
      "Not sure yet",
    ]);
    expect(
      chips.every((chip) => chip.getAttribute("aria-pressed") === "false"),
    ).toBe(true);

    fireEvent.click(chips[1]);
    expect(chips[1].getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(chips[2]);
    expect(chips[1].getAttribute("aria-pressed")).toBe("false");
    expect(chips[2].getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(chips[2]);
    expect(chips[2].getAttribute("aria-pressed")).toBe("false");
    for (const chip of chips) {
      expect(chip.className).toContain("min-h-11");
    }
  });

  it("sem nome mostra um erro com role=alert, marca o campo e leva o foco a ele", () => {
    render(<ContactForm contact={en.contact} />);

    fill("   ", "ana@example.com");
    submit();

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe(
      "Please add your name and a valid email so we can reply.",
    );
    const name = screen.getByLabelText("Name");
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(name.getAttribute("aria-describedby")).toBe(alert.id);
    expect(document.activeElement).toBe(name);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it.each(["ana@", "a@b", "ana example.com", "@x.com", "a b@x.com"])(
    "recusa o e-mail inválido %s",
    (value) => {
      render(<ContactForm contact={en.contact} />);

      fill("Ana", value);
      submit();

      expect(screen.getByRole("alert")).toBeTruthy();
      expect(screen.queryByRole("status")).toBeNull();
    },
  );

  it("aceita um e-mail com subdomínio e com espaços nas pontas", () => {
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "  ana@mail.example.com  ");
    submit();

    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("com e-mail inválido mostra o erro e foca o e-mail", () => {
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "ana@");
    submit();

    expect(screen.getByRole("alert")).toBeTruthy();
    const email = screen.getByLabelText("Email");
    expect(email.getAttribute("aria-describedby")).toBe(
      screen.getByRole("alert").id,
    );
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(email);
  });

  it("com dados válidos mostra a prévia que NÃO soa como envio", () => {
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "ana@example.com");
    submit();

    const status = screen.getByRole("status");
    expect(status.textContent).toContain("Preview only. No message was sent.");
    expect(status.textContent).toContain(
      "The form is not connected to a server yet, so nothing was sent and nothing was stored.",
    );
    expect(status.textContent).toContain("Status: preview");
    expect(status.textContent).not.toMatch(
      /thanks|thank you|sent!|we received|we will reply/i,
    );
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByLabelText("Name")).toBeNull();
  });

  it("leva o foco ao painel de prévia depois de enviar", async () => {
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "ana@example.com");
    submit();

    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByRole("status")),
    );
    expect(screen.getByRole("status").getAttribute("tabindex")).toBe("-1");
  });

  it("não vaza dados num envio nativo (antes da hidratação ou sem JS): nenhum campo tem name", () => {
    const html = renderToString(<ContactForm contact={en.contact} />);

    expect(html).toContain("<form");
    expect(html).not.toMatch(/<(input|textarea|select)[^>]*\sname=/);
    expect(html).not.toMatch(/<form[^>]*\saction=/);
    const { container } = render(<ContactForm contact={en.contact} />);
    for (const field of container.querySelectorAll("input, textarea")) {
      expect(field.hasAttribute("name")).toBe(false);
    }
  });

  it("não faz nenhuma requisição de rede nem grava no navegador ao enviar", () => {
    const fetchMock = vi.fn();
    const beaconMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    Object.defineProperty(navigator, "sendBeacon", {
      value: beaconMock,
      configurable: true,
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "ana@example.com");
    submit();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(beaconMock).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    setItem.mockRestore();
  });

  it("não é um formulário que navega: o envio nativo é impedido", () => {
    const { container } = render(<ContactForm contact={en.contact} />);
    const form = container.querySelector("form") as HTMLFormElement;
    expect(form.hasAttribute("action")).toBe(false);
    expect(form.noValidate).toBe(true);

    fill("Ana", "ana@example.com");
    const event = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it("apaga o que foi digitado ao mostrar a prévia e volta ao formulário vazio", async () => {
    render(<ContactForm contact={en.contact} />);

    fill("Ana", "ana@example.com");
    fireEvent.change(screen.getByLabelText("Message (optional)"), {
      target: { value: "Preciso de um painel" },
    });
    fireEvent.click(screen.getByRole("button", { name: "AI" }));
    submit();
    expect(document.body.textContent).not.toContain("ana@example.com");
    expect(document.body.textContent).not.toContain("Preciso de um painel");

    fireEvent.click(screen.getByRole("button", { name: "Back to the form" }));

    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("");
    expect(
      (screen.getByLabelText("Message (optional)") as HTMLTextAreaElement)
        .value,
    ).toBe("");
    expect(
      screen.getByRole("button", { name: "AI" }).getAttribute("aria-pressed"),
    ).toBe("false");
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByLabelText("Name")),
    );
  });

  it("o erro some depois de um envio válido", () => {
    render(<ContactForm contact={en.contact} />);

    submit();
    expect(screen.getByRole("alert")).toBeTruthy();
    fill("Ana", "ana@example.com");
    submit();

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("em PT a prévia também diz que nenhuma mensagem foi enviada", () => {
    render(<ContactForm contact={pt.contact} />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "ana@exemplo.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Vamos conversar/ }));

    expect(screen.getByRole("status").textContent).toContain(
      "Apenas uma prévia. Nenhuma mensagem foi enviada.",
    );
    expect(screen.getByRole("status").textContent).not.toMatch(/obrigad/i);
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ] as const)(
    "não tem violações de acessibilidade detectáveis pelo axe (%s, formulário, erro e prévia)",
    async (_locale, dictionary) => {
      const { container } = render(
        <main>
          <ContactSection contact={dictionary.contact} />
        </main>,
      );
      await expectNoA11yViolations(container);

      const button = container.querySelector(
        "button[type=submit]",
      ) as HTMLButtonElement;
      fireEvent.click(button);
      expect(screen.getByRole("alert")).toBeTruthy();
      await expectNoA11yViolations(container);

      const [name, email] = Array.from(
        container.querySelectorAll("input"),
      ) as HTMLInputElement[];
      fireEvent.change(name, { target: { value: "Ana" } });
      fireEvent.change(email, { target: { value: "ana@example.com" } });
      fireEvent.click(button);
      expect(screen.getByRole("status")).toBeTruthy();
      await expectNoA11yViolations(container);
    },
  );
});
