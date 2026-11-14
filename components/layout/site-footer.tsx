import { Container } from "@/components/layout/container";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import type { Dictionary } from "@/i18n/dictionary";

type SiteFooterProps = {
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
};

// Rodapé da V4 Red Pen (RIV-30): fundo Ink. `data-tone="ink"` troca o foco para
// Highlight (regra em globals.css). A política de privacidade é texto simples:
// não há página nem texto legal publicado (pendência do Owner).
export function SiteFooter({ footer, nav }: SiteFooterProps) {
  return (
    <footer
      data-tone="ink"
      className="bg-ink px-[clamp(20px,5vw,80px)] pt-20 pb-12 text-paper"
    >
      <Container>
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-12">
          <div className="max-w-[460px] flex-[1_1_320px]">
            <p className="m-0 mb-3 font-serif text-[44px] leading-none font-extrabold tracking-[-0.02em]">
              Rivelume{" "}
              <span className="inline-block -rotate-4 font-hand font-bold text-highlight">
                labs
              </span>
            </p>
            <p className="m-0 text-lg leading-normal text-rule">
              {footer.description}
            </p>
          </div>

          <nav aria-label={footer.label} className="flex-[0_1_200px]">
            <p className="m-0 mb-3 font-mono text-xs leading-normal tracking-[0.16em] text-rule uppercase">
              {footer.navigateHeading}
            </p>
            <ul className="m-0 flex list-none flex-col p-0 text-lg font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block py-2">
                    {nav[item.label]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-[0_1_220px]">
            <p className="m-0 mb-3 font-mono text-xs leading-normal tracking-[0.16em] text-rule uppercase">
              {footer.legalHeading}
            </p>
            <p className="m-0 py-2 text-lg font-medium text-rule">
              {footer.privacy}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-[#4A443B] pt-7">
          <span className="font-hand text-[32px] leading-[1.1] font-bold text-highlight">
            {footer.tagline}
          </span>
          <span className="font-mono text-xs tracking-[0.16em] text-rule uppercase">
            {footer.copyright}
          </span>
        </div>
      </Container>
    </footer>
  );
}
