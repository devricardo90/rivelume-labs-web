// URL-base do site, configurável por variável de ambiente (RIV-16).
//
// O domínio definitivo é a DEC-RIV-008 (pendente). Enquanto `SITE_URL` não estiver
// definida, o site NÃO emite `canonical`, `hreflang` nem sitemap: URLs absolutas
// inventadas ou apontando para localhost seriam piores do que nenhuma.
//
// `SITE_URL` é lida só no servidor (sem prefixo NEXT_PUBLIC) e não é um segredo.
// Exemplo: SITE_URL=https://example.com
export function getSiteUrl(
  value: string | undefined = process.env.SITE_URL,
): URL | null {
  const raw = value?.trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      `SITE_URL inválida: "${raw}". Use uma URL absoluta, por exemplo https://example.com`,
    );
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(
      `SITE_URL deve usar http ou https (recebido: ${url.protocol})`,
    );
  }

  // Só a origem importa; caminho, consulta e fragmento são descartados.
  return new URL(url.origin);
}

// URL absoluta de um caminho do site, ou `null` se `SITE_URL` não está definida.
export function absoluteUrl(path: string, base = getSiteUrl()): string | null {
  return base ? new URL(path, base).toString() : null;
}
