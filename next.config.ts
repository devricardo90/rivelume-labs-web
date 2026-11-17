import type { NextConfig } from "next";

// Caminhos desconhecidos -> `/error-404/<idioma>` (ver `rewrites`).
// 1) idioma válido com subcaminho que não seja a Privacidade: no idioma da URL.
// 2) primeiro segmento que não seja `en`, `pt`, `_next` nem `error-404`: em inglês.
//    O `(?:/|$)` evita que "en" bloqueie só a URL exata e deixe passar "en/x".
// ATENÇÃO: o Next.js compara estes `source` SEM diferenciar maiúsculas; por isso não
// há regra por caixa (`/PT`): ela também casaria `/pt` e derrubaria a página.
export const NOT_FOUND_REWRITES = [
  {
    source: "/:lang(en|pt)/:rest((?!privacy$).+)",
    destination: "/error-404/:lang",
  },
  {
    source: "/:first((?!(?:en|pt|_next|error-404)(?:/|$))[^/]+)/:rest*",
    destination: "/error-404/en",
  },
];

// Headers de segurança (RIV-46, Fonte da Verdade §13.4). O site é estático, sem
// backend, cookies nem coleta de dados; as proteções são as de baixo custo e sem
// efeito visível: sem sniffing de tipo, sem página dentro de iframe de terceiros, sem
// APIs de dispositivo, Referer só com a origem em outro site.
export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// CSP: o site só carrega recursos da própria origem (fontes locais via next/font,
// sem scripts, estilos, imagens nem requisições de terceiros). `'unsafe-inline'` em
// script e estilo é necessário: o Next.js injeta o script de hidratação (RSC) e
// estilos em linha, e um CSP com nonce ou hash obrigaria a renderizar todas as
// páginas sob demanda (perde a geração estática). Por isso o CSP NÃO protege contra
// XSS por script em linha; o ganho é bloquear recursos externos, plugins, `<base>`,
// envio de formulário a outro site e enquadramento. Sem `'unsafe-eval'`: só em
// produção, porque `next dev` precisa de eval.
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export function buildSecurityHeaders(
  production: boolean = process.env.NODE_ENV === "production",
) {
  return production
    ? [
        ...SECURITY_HEADERS,
        { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
      ]
    : SECURITY_HEADERS;
}

// Configuração mínima (RIV-12).
// - Cache Components e Partial Prefetching ficam desativados por decisão do
//   Owner; qualquer ativação exige nova aprovação.
// - agentRules: false impede que `next dev` escreva um bloco de instruções
//   próprio no AGENTS.md. Esse arquivo é de governança do projeto (Owner) e
//   não pode ser alterado por ferramentas de terceiros.
const nextConfig: NextConfig = {
  agentRules: false,
  // RIV-46: não anuncia o framework (`X-Powered-By: Next.js`).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: buildSecurityHeaders() }];
  },
  // ADR-0001, P4: `/` redireciona para `/en` com HTTP 307 (`permanent: false`),
  // sem `proxy` e sem detectar o idioma do navegador. O destino é o idioma
  // padrão (DEFAULT_LOCALE em i18n/config.ts; um teste garante que coincidem).
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  // RIV-37 (WCAG 3.1.1): toda resposta 404 precisa de `<html lang>`. Como o layout
  // raiz vive em `app/[lang]`, o Next.js não consegue renderizar no servidor o 404
  // de um idioma inválido nem de um caminho sem idioma. Os caminhos desconhecidos
  // são reescritos (a URL do navegador não muda) para `app/error-404/[lang]`, um
  // Route Handler que responde um HTML 404 completo com `lang`. `afterFiles`: os
  // arquivos de `public/` e as páginas prerenderizadas (/en, /pt, /en/privacy,
  // /pt/privacy) têm prioridade e este desvio só vale para o que sobra. Sem recurso
  // experimental e sem `proxy`.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: NOT_FOUND_REWRITES,
      fallback: [],
    };
  },
};

export default nextConfig;
