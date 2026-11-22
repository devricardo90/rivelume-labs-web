"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { cx } from "@/lib/cx";
import type { Dictionary } from "@/i18n/dictionary";

type ContactFormProps = {
  contact: Dictionary["contact"];
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABEL =
  "font-mono text-xs leading-normal tracking-[0.16em] text-rose uppercase";
// Campos da V4 (`.fld`): linha inferior de 2px Paper, texto de 22px (mínimo de
// 16px, sem zoom no iOS), 52px de altura. O placeholder fica em Rose com opacidade
// 1 (a V4 usa 0,8, que dá 4,48:1 sobre Burgundy, abaixo de 4,5:1; com 1 são 6,0:1).
const FIELD =
  "box-border w-full rounded-none border-0 border-b-2 border-paper bg-transparent font-sans text-[22px] font-medium text-paper placeholder:text-rose min-h-[52px] py-2.5 leading-[normal]";
const TEXTAREA =
  "box-border w-full resize-y rounded-none border-2 border-paper bg-transparent p-3.5 font-sans text-[22px] font-medium text-paper placeholder:text-rose min-h-[120px] leading-[normal]";

// Os campos NÃO têm atributo `name` de propósito: o HTML pré-renderizado não tem
// `onSubmit` até a hidratação, e um envio nativo (Enter antes do JS carregar, ou
// sem JS) faria um GET com os campos na URL. Sem `name`, nada é enviado.
// Formulário de contato DEMONSTRATIVO da V4 (RIV-33). Não há backend: nada é
// enviado, gravado nem registrado. Ao "enviar", os
// dados digitados são APAGADOS e aparece a prévia ("Preview only. No message was
// sent."), que nunca soa como envio. O envio real depende da decisão do Owner
// sobre o método de contato (Fonte §6.2).
export function ContactForm({ contact }: ContactFormProps) {
  const { form, preview } = contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<"name" | "email" | null>(null);
  const [previewed, setPreviewed] = useState(false);
  const nameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("name");
      nameField.current?.focus();
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("email");
      emailField.current?.focus();
      return;
    }
    // Sem envio: descarta o que foi digitado e mostra a prévia.
    setError(null);
    setName("");
    setEmail("");
    setTopic(null);
    setMessage("");
    setPreviewed(true);
    // O formulário some: leva o foco ao painel para teclado e leitor de tela.
    requestAnimationFrame(() => panel.current?.focus());
  }

  function backToForm() {
    setPreviewed(false);
    requestAnimationFrame(() => nameField.current?.focus());
  }

  if (previewed) {
    return (
      <div
        ref={panel}
        role="status"
        tabIndex={-1}
        className="flex -rotate-1 flex-col gap-5 border-2 border-paper px-8 py-9 outline-offset-4"
      >
        <Eyebrow tone="inherit" size="sm" className="m-0 text-highlight">
          {preview.status}
        </Eyebrow>
        <Heading level={3} size="panel">
          {preview.title}
        </Heading>
        <p className="m-0 text-[19px] leading-normal text-rose">
          {preview.body}
        </p>
        <div>
          <Button type="button" variant="highlight" onClick={backToForm}>
            {preview.back}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-name" className={LABEL}>
          {form.nameLabel}
        </label>
        <input
          ref={nameField}
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={form.namePlaceholder}
          aria-required="true"
          aria-invalid={error === "name" || undefined}
          aria-describedby={error === "name" ? "contact-error" : undefined}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className={LABEL}>
          {form.emailLabel}
        </label>
        <input
          ref={emailField}
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={form.emailPlaceholder}
          aria-required="true"
          aria-invalid={error === "email" || undefined}
          aria-describedby={error === "email" ? "contact-error" : undefined}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span id="contact-topics" className={LABEL}>
          {form.topicsLabel}
        </span>
        <div
          role="group"
          aria-labelledby="contact-topics"
          className="flex flex-wrap gap-3"
        >
          {form.topics.map((label) => {
            const pressed = topic === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={pressed}
                onClick={() => setTopic(pressed ? null : label)}
                className={cx(
                  "min-h-11 cursor-pointer rounded-[999px] border-2 border-paper px-5 font-sans text-base font-semibold",
                  pressed
                    ? "bg-highlight text-ink"
                    : "bg-transparent text-paper",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={LABEL}>
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={form.messagePlaceholder}
          className={TEXTAREA}
        />
      </div>

      {error ? (
        <p
          id="contact-error"
          role="alert"
          className="m-0 text-[17px] font-semibold text-highlight"
        >
          {error === "name" ? form.errorName : form.errorEmail}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-4">
        <Button type="submit" variant="highlight">
          {form.submit} <span aria-hidden="true">→</span>
        </Button>
        <Eyebrow tone="rose" size="sm" className="m-0">
          {contact.demoNotice}
        </Eyebrow>
      </div>
    </form>
  );
}
