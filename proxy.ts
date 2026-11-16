import { NextResponse, type NextRequest } from "next/server";
import { hasLocale } from "@/i18n/config";

// Normalização de URL (RIV-37, alternativa D). O Next.js casa o slug de idioma sem
// diferenciar maiúsculas e, para `/PT`, `/EN/privacy` etc., responde 404 pela página
// padrão do framework (sem `<html lang>`). Antes do roteamento, redireciona qualquer
// caminho que comece por `en`/`pt` (em qualquer caixa) e tenha maiúsculas para a
// forma minúscula canônica. A query string é preservada. Caminhos já canônicos não
// são tocados (sem laço de redirecionamento).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (!hasLocale(first.toLowerCase())) return NextResponse.next();

  const canonical = pathname.toLowerCase();
  if (canonical === pathname) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = canonical;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Fora de `_next` e de arquivos com extensão (estáticos, sitemap.xml, favicon).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
