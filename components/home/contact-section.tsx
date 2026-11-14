import { ContactForm } from "@/components/home/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em, Heading } from "@/components/ui/heading";
import { HandNote } from "@/components/ui/hand-note";
import type { Dictionary } from "@/i18n/dictionary";

type ContactSectionProps = {
  contact: Dictionary["contact"];
};

// Contato da V4 Red Pen (RIV-33): faixa Burgundy sem bordas. O formulário é uma
// DEMONSTRAÇÃO sem backend (ver ContactForm); o e-mail comercial está marcado como
// pendente. TEXTO PROVISÓRIO, pendente de validação do Owner.
export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <Section id="contact" tone="burgundy">
      <Container className="flex flex-wrap items-start gap-x-20 gap-y-16">
        <div className="min-w-0 flex-[1_1_440px]">
          <Eyebrow
            tone="rose"
            marker="05 /"
            markerTone="highlight"
            className="m-0 mb-6"
          >
            {contact.eyebrow}
          </Eyebrow>
          <Heading level={2} size="contact" className="mb-7">
            {contact.headingLead}{" "}
            <Em className="text-highlight">{contact.headingEmphasis}</Em>
          </Heading>
          <p className="m-0 mb-7 max-w-[480px] text-[22px] leading-normal text-rose">
            {contact.intro}
          </p>
          <HandNote
            tone="highlight"
            size="lg"
            className="inline-block -rotate-3"
          >
            {contact.note}
          </HandNote>
          <Eyebrow tone="rose" size="sm" className="m-0 mt-8">
            {contact.emailPending}
          </Eyebrow>
        </div>

        <div className="min-w-0 max-w-[560px] flex-[1_1_400px]">
          <ContactForm contact={contact} />
        </div>
      </Container>
    </Section>
  );
}
