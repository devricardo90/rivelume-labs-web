import { notFound } from "next/navigation";
import { AboutSection } from "@/components/home/about-section";
import { Hero } from "@/components/home/hero";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { WorkSection } from "@/components/home/work-section";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// Página inicial por idioma. Hero (RIV-31) e as seções Services, Work, Process e About
// (RIV-32). Contato (RIV-33) e a interação Draft → Final (RIV-34) vêm depois.
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
      <ServicesSection services={dictionary.services} />
      <WorkSection work={dictionary.work} />
      <ProcessSection process={dictionary.process} />
      <AboutSection about={dictionary.about} />
    </main>
  );
}
