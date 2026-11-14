type SkipLinkProps = {
  // Texto no idioma atual (vem do dicionário).
  label: string;
  // id do <main> de destino.
  targetId?: string;
};

// Link "pular para o conteúdo" (WCAG 2.4.1): invisível até receber foco do
// teclado; o primeiro item da ordem de tabulação.
export function SkipLink({ label, targetId = "main" }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-paper"
    >
      {label}
    </a>
  );
}
