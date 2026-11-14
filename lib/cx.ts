// Junta nomes de classe ignorando valores vazios. Sem dependência externa.
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
