"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";

type DraftFinalBandProps = {
  band: Dictionary["band"];
};

// Faixa Burgundy "The draft and the final" da V4 (RIV-34): nomes de arquivo
// bagunçados em movimento (40s, linear, infinita) e a frase "That's the draft. We
// build the final.".
//
// Acessibilidade (WCAG 2.2.2): a V4 só pausa no hover; aqui há um BOTÃO de
// pausa/retomada (teclado e toque, `aria-pressed`) e a faixa também pausa no hover.
// Com `prefers-reduced-motion` não há animação (regra global) e a lista passa a
// quebrar em linhas, centralizada, sem a cópia decorativa nem o botão. A segunda
// cópia dos nomes é `aria-hidden` (só existe para o laço contínuo).
export function DraftFinalBand({ band }: DraftFinalBandProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label={band.label}
      data-tone="burgundy"
      data-paused={paused}
      className="overflow-hidden border-y-2 border-ink bg-burgundy text-paper"
    >
      <div className="flex justify-end px-[clamp(20px,5vw,80px)] pt-4 motion-reduce:hidden">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="min-h-11 cursor-pointer border-2 border-paper bg-transparent px-4 font-mono text-xs tracking-[0.16em] text-paper uppercase"
        >
          {paused ? band.play : band.pause}
        </button>
      </div>

      <div className="pt-3 motion-reduce:pt-7">
        <div className="marquee motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-[clamp(20px,5vw,80px)]">
          <FileList files={band.files} />
          <FileList files={band.files} decorative />
        </div>
      </div>

      <div className="px-[clamp(20px,5vw,80px)] pt-14 pb-20 text-center">
        <p className="m-0 font-serif text-[clamp(36px,6vw,84px)] leading-[1.1] font-semibold tracking-[-0.02em] italic">
          {band.phraseLead}{" "}
          <span className="inline-block -rotate-2 bg-highlight px-[0.22em] font-extrabold text-ink not-italic">
            {band.phraseEmphasis}
          </span>
        </p>
      </div>
    </section>
  );
}

function FileList({
  files,
  decorative = false,
}: {
  files: ReadonlyArray<string>;
  decorative?: boolean;
}) {
  return (
    <ul
      role="list"
      aria-hidden={decorative || undefined}
      className={
        "m-0 flex shrink-0 list-none p-0 font-mono text-[22px] whitespace-nowrap motion-reduce:flex-wrap motion-reduce:justify-center" +
        (decorative ? " motion-reduce:hidden" : "")
      }
    >
      {files.map((file) => (
        <li
          key={file}
          className="after:mx-8 after:text-rose after:content-['/']"
        >
          {file}
        </li>
      ))}
    </ul>
  );
}
