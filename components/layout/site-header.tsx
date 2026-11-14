"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { TEXT_LINK_CLASSES } from "@/components/ui/text-link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  language: Dictionary["language"];
};

const PANEL_ID = "site-menu";

// Cabeçalho da V4 Red Pen (RIV-30). Logotipo (volta ao início no idioma atual),
// navegação por âncoras SEM "Home" e seletor EN | PT. A V4 não define o mobile:
// abaixo de 768px a navegação e o seletor ficam num painel aberto por um botão
// com `aria-expanded` (alvo de 44px). Escape fecha e devolve o foco ao botão; o
// clique em um link também fecha. O menu móvel depende de JavaScript.
export function SiteHeader({ locale, nav, language }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-[clamp(20px,5vw,80px)] py-5">
      <Link
        href={localePath(locale)}
        aria-label={nav.logoLabel}
        className="flex items-baseline gap-2.5 py-2"
      >
        <span className="font-serif text-[30px] font-extrabold tracking-[-0.02em]">
          Rivelume
        </span>
        <span className="inline-block -rotate-4 font-hand text-[30px] font-bold text-red-pen">
          labs
        </span>
      </Link>

      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className="min-h-11 border-2 border-ink px-4 font-mono text-xs tracking-[0.16em] uppercase aria-expanded:bg-ink aria-expanded:text-paper md:hidden"
      >
        {open ? nav.menuClose : nav.menuOpen}
      </button>

      <div
        id={PANEL_ID}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className={
          open
            ? "flex w-full flex-col gap-4 border-t-2 border-ink pt-2 md:contents"
            : "hidden md:contents"
        }
      >
        <nav aria-label={nav.label}>
          <ul className="m-0 flex list-none flex-col p-0 text-base font-semibold md:flex-row md:flex-wrap md:gap-x-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={TEXT_LINK_CLASSES}>
                  {nav[item.label]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher
          current={locale}
          label={language.label}
          names={language.names}
          codes={language.codes}
        />
      </div>
    </header>
  );
}
