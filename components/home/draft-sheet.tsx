import { Eyebrow } from "@/components/ui/eyebrow";
import { HandNote } from "@/components/ui/hand-note";
import type { Dictionary } from "@/i18n/dictionary";

type DraftSheetProps = {
  sheet: Dictionary["hero"]["sheet"];
  // Estado "editado": risco completo, respostas manuscritas e resultado visíveis.
  // Estático nesta tarefa (RIV-31, padrão `true`); a RIV-34 alterna o valor. O
  // atributo `data-edited` na raiz comanda o CSS (`.strike` em globals.css e as
  // variantes `group-data-[edited=true]:`).
  edited?: boolean;
};

// Folha de rascunho do Hero (V4 Red Pen): papel claro, borda e sombra dura Ink,
// girada -1,4°, selo e linhas riscadas com a resposta à mão. É um EXEMPLO
// ilustrativo (selo "Example"), nunca um caso real. Texto riscado usa <del>
// (semântica de remoção); números e selo são decorativos (aria-hidden).
export function DraftSheet({ sheet, edited = true }: DraftSheetProps) {
  return (
    <div
      data-edited={edited}
      className="group relative -rotate-[1.4deg] border-2 border-ink bg-sheet shadow-[10px_12px_0_var(--color-ink)]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-6 -right-[18px] rotate-[7deg] border-[3px] border-red-pen bg-sheet px-3.5 py-2 font-mono text-[15px] font-medium tracking-[0.18em] text-red-pen"
      >
        {sheet.stamp}
      </div>

      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-5 py-3">
        <span className="font-mono text-xs leading-normal tracking-[0.1em] uppercase">
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
        <ol className="m-0 list-none py-1 pr-7 pl-[76px]">
          {sheet.items.map((item, index) => (
            <li
              key={item.before}
              className="relative border-b border-dashed border-dash py-[22px] last:border-b-0"
            >
              <Eyebrow
                size="sm"
                aria-hidden="true"
                className="absolute top-[30px] -left-[60px] m-0"
              >
                {String(index + 1).padStart(2, "0")}
              </Eyebrow>
              <p className="m-0 text-2xl leading-[1.35] font-medium">
                <del className="strike no-underline">{item.before}</del>
              </p>
              <HandNote className="mt-2 -rotate-[1.2deg] opacity-0 group-data-[edited=true]:opacity-100">
                {item.after}
              </HandNote>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t-2 border-ink px-7 pt-5 pb-6">
        <HandNote
          size="sm"
          className="-rotate-[1.2deg] opacity-0 group-data-[edited=true]:opacity-100"
        >
          {sheet.result}
        </HandNote>
      </div>
    </div>
  );
}
