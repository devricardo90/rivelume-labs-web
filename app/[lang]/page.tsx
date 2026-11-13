import { notFound } from "next/navigation";
import { HomePlaceholder } from "@/components/home/home-placeholder";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// Página inicial por idioma. Ainda é o placeholder técnico: o conteúdo comercial
// entra nas tarefas seguintes da Sprint 3.
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  return <HomePlaceholder locale={lang} dictionary={dictionary} />;
}
