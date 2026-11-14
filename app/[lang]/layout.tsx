import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/app/[lang]/fonts";
import { SkipLink } from "@/components/layout/skip-link";
import { LOCALES, LOCALE_TAGS, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates } from "@/i18n/seo";
import "../globals.css";

// Layout raiz por idioma (RIV-16, ADR-0001). Todas as rotas ficam sob `[lang]`;
// `/` apenas redireciona para `/en` (next.config.ts). O idioma vem só da URL.
// Fontes e tokens da V4 Red Pen: RIV-27.
type LangParams = { params: Promise<{ lang: string }> };

// Idioma desconhecido (por exemplo /fr) responde 404, sem renderizar sob demanda.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: buildAlternates(lang),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode }> & LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  return (
    <html lang={LOCALE_TAGS[lang]} className={fontVariables}>
      <body>
        <SkipLink label={dictionary.a11y.skipToContent} />
        {children}
      </body>
    </html>
  );
}
