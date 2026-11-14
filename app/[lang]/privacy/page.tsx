import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { TextLink } from "@/components/ui/text-link";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates } from "@/i18n/seo";

type PrivacyParams = { params: Promise<{ lang: string }> };

// Política de Privacidade em RASCUNHO (RIV-33). Identificada como rascunho, sem
// afirmações jurídicas e fora dos mecanismos de busca (`noindex`) e do sitemap até
// o texto ser revisado e aprovado pelo Owner. Não publicar como definitiva.
export async function generateMetadata({
  params,
}: PrivacyParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { privacy } = await getDictionary(lang);
  return {
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    robots: { index: false, follow: false },
    alternates: buildAlternates(lang, undefined, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: PrivacyParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { privacy } = await getDictionary(lang);

  return (
    <main id="main">
      <Section tone="paper">
        <Container>
          <div className="max-w-[720px]">
            <p className="m-0 mb-6 inline-block border-[1.5px] border-red-pen px-2 py-0.5 font-mono text-xs tracking-[0.16em] text-red-pen uppercase">
              {privacy.draftNotice}
            </p>
            <Heading level={1} size="contact" className="mb-6">
              {privacy.title}
            </Heading>
            <p className="m-0 mb-12 text-[22px] leading-normal text-body">
              {privacy.intro}
            </p>
            {privacy.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <Heading level={2} size="card" className="mb-3">
                  {section.heading}
                </Heading>
                <p className="m-0 text-xl leading-normal text-body">
                  {section.body}
                </p>
              </section>
            ))}
            <TextLink
              href={localePath(lang)}
              className="text-[17px] font-semibold"
            >
              {privacy.back}
            </TextLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
