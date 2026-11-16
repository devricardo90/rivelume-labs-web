import { LOCALE_TAGS, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

// Documento HTML COMPLETO da página 404 (RIV-37, WCAG 3.1.1). Por que uma string
// HTML e não um `not-found.tsx`: o layout raiz do site vive em `app/[lang]` (segmento
// dinâmico), e nesse arranjo o Next.js 16.4.4 NÃO consegue renderizar no servidor o
// `not-found` de um idioma inválido nem de um caminho sem idioma: devolve uma casca
// vazia (`<html id="__next_error__">`, sem `lang`) que só é preenchida por
// JavaScript. A solução estável é um Route Handler que responde um HTML 404
// autossuficiente, com `<html lang>`, sem JavaScript e sem hidratação.
//
// Visual: as cores, o marcador amarelo e o botão da V4 Red Pen, com fontes de sistema
// (esta página não carrega as fontes do site). TEXTO PROVISÓRIO, pendente de
// validação do Owner (dicionários `notFound`).
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const STYLES = `
:root{--paper:#f5f0e4;--ink:#1d1a17;--burgundy:#6b3343;--red:#c8231d;--highlight:#f6e24b;--body:#3b362f;--muted:#5b544b}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;line-height:1.5}
a{color:inherit}
a:focus-visible{outline:3px solid var(--red);outline-offset:3px}
header{padding:20px clamp(20px,5vw,80px)}
.logo{display:inline-block;padding:8px 0;font-family:Georgia,"Times New Roman",serif;font-weight:800;font-size:30px;letter-spacing:-.02em;text-decoration:none}
.logo span{display:inline-block;margin-left:10px;color:var(--red);font-style:italic;font-weight:700;transform:rotate(-4deg)}
main{max-width:calc(1280px + 2 * clamp(20px,5vw,80px));margin:0 auto;padding:clamp(40px,8vw,112px) clamp(20px,5vw,80px)}
.eyebrow{margin:0 0 20px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.eyebrow span{color:var(--red)}
h1{margin:0 0 24px;font-family:Georgia,"Times New Roman",serif;font-weight:800;font-size:clamp(44px,6.8vw,96px);line-height:.96;letter-spacing:-.03em}
h1 em{font-weight:600;padding:0 .08em;margin:0 -.08em;background:linear-gradient(transparent 58%,var(--highlight) 58%,var(--highlight) 94%,transparent 94%)}
.body{max-width:560px;margin:0 0 40px;font-size:22px;color:var(--body)}
.btn{display:inline-flex;align-items:center;min-height:52px;padding:0 26px;border:2px solid var(--ink);background:var(--ink);color:var(--paper);font-size:17px;font-weight:600;text-decoration:none;box-shadow:6px 6px 0 var(--burgundy)}
.btn:hover{transform:translate(-2px,-2px);box-shadow:9px 9px 0 var(--burgundy)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.btn:hover{transform:none}}
`.trim();

export function renderNotFoundDocument(
  locale: Locale,
  copy: Dictionary["notFound"],
): string {
  const home = escapeHtml(localePath(locale));
  const title = `${copy.eyebrow} — Rivelume Labs`;

  return `<!DOCTYPE html>
<html lang="${LOCALE_TAGS[locale]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
<header><a class="logo" href="${home}">Rivelume <span>labs</span></a></header>
<main id="main">
<p class="eyebrow"><span aria-hidden="true">404 /</span> ${escapeHtml(copy.eyebrow)}</p>
<h1>${escapeHtml(copy.headingLead)} <em>${escapeHtml(copy.headingEmphasis)}</em></h1>
<p class="body">${escapeHtml(copy.body)}</p>
<a class="btn" href="${home}">${escapeHtml(copy.home)}</a>
</main>
</body>
</html>
`;
}
