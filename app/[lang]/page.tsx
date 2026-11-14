import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// Página inicial por idioma. Por ora só o Hero (RIV-31); as demais seções entram
// nas tarefas seguintes da Sprint 3.
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  return (
    <main id="main">
      <Hero hero={dictionary.hero} />
    </main>
  );
}
