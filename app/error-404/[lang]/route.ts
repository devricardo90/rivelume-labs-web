import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { renderNotFoundDocument } from "@/lib/not-found-html";

// Resposta 404 do site (RIV-37). Recebe os caminhos desconhecidos por reescrita
// (`rewrites` em next.config.ts; a URL do navegador não muda) e devolve um documento
// HTML completo com `<html lang>` e status 404, no idioma da URL quando for `en` ou
// `pt` e em inglês nos demais casos. Não usa JavaScript nem layout do app.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const { notFound } = await getDictionary(locale);

  return new Response(renderNotFoundDocument(locale, notFound), {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": "no-store",
    },
  });
}
