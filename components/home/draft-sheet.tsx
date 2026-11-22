"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HandNote } from "@/components/ui/hand-note";
import type { Dictionary } from "@/i18n/dictionary";

type DraftSheetProps = {
  sheet: Dictionary["hero"]["sheet"];
  // Estado inicial. Padrão `false` (Draft), igual à V4 e igual no servidor e na
  // hidratação. Existe para os testes e para quem quiser fixar um estado.
  initialEdited?: boolean;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION).matches
  );
}
const getServerReducedMotion = () => false;

// Atraso da aplicação automática das edições (V4: 1,8 s).
const AUTO_APPLY_MS = 1800;

// Atrasos (`--d`) das três linhas, como na V4 (d1 a d3); o resultado usa 1,5 s (d4).
const ROW_DELAYS = ["[--d:0s]", "[--d:0.5s]", "[--d:1s]"] as const;

// Folha de rascunho do Hero com a interação Draft → Final da V4 Red Pen (RIV-34).
//
// Comportamento (da V4 aprovada):
// - Começa em DRAFT: problemas sem risco, selo DRAFT, respostas ocultas.
// - Se a pessoa não interagiu, 1,8 s depois as edições se aplicam sozinhas
//   ("momento da transformação"): riscos Red Pen em sequência (0, 0,5 s, 1 s), as
//   respostas manuscritas surgem, o resultado entra a 1,5 s e o selo troca para FINAL.
// - O botão alterna "Apply the edits" / "Undo the edits" (o NOME muda conforme a
//   próxima ação, então NÃO usa `aria-pressed`: padrão WAI-ARIA, decisão do Owner).
//   Clicar nele cancela a aplicação automática; desfazer volta ao estado DRAFT e NÃO
//   reaplica sozinho.
//
// Acessibilidade e controle (acréscimos sobre a V4): o foco no botão também cancela a
// aplicação automática (o estado não muda embaixo de quem navega por teclado); a
// mudança é anunciada por TEXTO (`role="status"`, educado), não só por cor; no estado
// DRAFT as respostas ficam `aria-hidden` (ainda não foram aplicadas); com
// `prefers-reduced-motion` as edições se aplicam de imediato e sem animação
// (as transições são desligadas globalmente em globals.css). O texto riscado usa
// <del>. Os selos ficam 12px mais altos que na V4 (24px para 36px acima da folha)
// para não cobrir a etiqueta "Example" (RIV-35, decisão do Owner). O estado é
// `data-edited`, usado pelo CSS (`.strike` e as variantes
// `group-data-[edited=true]:`). É um EXEMPLO ilustrativo (selo "Example").
export function DraftSheet({ sheet, initialEdited = false }: DraftSheetProps) {
  // `manual` é a escolha explícita (botão); `auto` é a aplicação automática de 1,8 s.
  // O estado exibido é a escolha manual, se houver, senão o automático (ou o final
  // imediato com movimento reduzido). O servidor e a hidratação sempre começam em
  // DRAFT (`reduced` é falso no servidor), então não há descompasso.
  const [manual, setManual] = useState<boolean | null>(
    initialEdited ? true : null,
  );
  const [auto, setAuto] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  // Se a pessoa já interagiu (clique ou foco no botão), não há aplicação automática.
  const touched = useRef(false);
  const edited = manual ?? (reduced || auto);

  useEffect(() => {
    // O temporizador roda mesmo com movimento reduzido (a folha já abre em FINAL):
    // se a preferência mudar para "sem reduzir" em seguida, não há piscada de DRAFT.
    if (initialEdited) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) setAuto(true);
    }, AUTO_APPLY_MS);
    return () => window.clearTimeout(timer);
  }, [initialEdited]);

  function toggle() {
    touched.current = true;
    setManual((previous) => !(previous ?? (reduced || auto)));
  }

  return (
    <div
      data-edited={edited}
      className="group relative -rotate-[1.4deg] border-2 border-ink bg-sheet shadow-[10px_12px_0_var(--color-ink)]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-9 -right-[18px] rotate-[7deg] border-[3px] border-red-pen bg-sheet px-3.5 py-2 font-mono text-[15px] font-medium tracking-[0.18em] text-red-pen transition-opacity duration-[400ms] group-data-[edited=true]:opacity-0"
      >
        {sheet.stampDraft}
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-9 -right-[18px] rotate-[7deg] border-[3px] border-red-pen bg-sheet px-3.5 py-2 font-mono text-[15px] font-medium tracking-[0.18em] text-red-pen opacity-0 transition-opacity duration-[400ms] group-data-[edited=true]:opacity-100"
      >
        {sheet.stampFinal}
      </div>

      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-5 py-3">
        <span className="min-w-0 font-mono text-xs leading-normal tracking-[0.1em] [overflow-wrap:anywhere] uppercase">
          {sheet.title}
        </span>
        <span className="border-[1.5px] border-ink bg-highlight px-2 py-0.5 font-mono text-[11px] tracking-[0.16em] uppercase">
          {sheet.example}
        </span>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-[52px] w-0.5 bg-red-pen/35"
        />
        <ol role="list" className="m-0 list-none py-1 pr-7 pl-[76px]">
          {sheet.items.map((item, index) => (
            <li
              key={item.before}
              className={`relative border-b border-dashed border-dash py-[22px] last:border-b-0 ${ROW_DELAYS[index]}`}
            >
              <Eyebrow
                size="sm"
                aria-hidden="true"
                className="absolute top-[30px] -left-[60px] m-0"
              >
                {String(index + 1).padStart(2, "0")}
              </Eyebrow>
              <p className="m-0 text-2xl leading-[1.35] font-medium [overflow-wrap:anywhere]">
                <del className="strike no-underline">{item.before}</del>
              </p>
              <HandNote
                aria-hidden={!edited || undefined}
                className="mt-2 translate-y-2 -rotate-[1.2deg] [overflow-wrap:anywhere] opacity-0 transition-[opacity,translate] duration-[450ms] delay-[calc(var(--d,0s)+0.3s)] group-data-[edited=true]:translate-y-0 group-data-[edited=true]:opacity-100"
              >
                {item.after}
              </HandNote>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t-2 border-ink px-7 pt-5 pb-6">
        <Button
          type="button"
          variant="ink"
          onClick={toggle}
          onFocus={() => {
            touched.current = true;
          }}
        >
          {edited ? sheet.undo : sheet.apply}
        </Button>
        <HandNote
          size="sm"
          aria-hidden={!edited || undefined}
          className="translate-y-2 -rotate-[1.2deg] [overflow-wrap:anywhere] opacity-0 transition-[opacity,translate] duration-[450ms] delay-[calc(var(--d,0s)+0.3s)] [--d:1.5s] group-data-[edited=true]:translate-y-0 group-data-[edited=true]:opacity-100"
        >
          {sheet.result}
        </HandNote>
      </div>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {edited ? sheet.statusFinal : sheet.statusDraft}
      </p>
    </div>
  );
}
