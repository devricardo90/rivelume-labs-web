import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// A fonte Caveat só é usada em negrito (700): carregar só esse peso reduz o
// arquivo latin de ~74 KB para ~51 KB sem mudar a tipografia (RIV-35). O teste
// lê o código-fonte porque `next/font` só funciona dentro do compilador do Next.js.
const fonts = readFileSync("app/[lang]/fonts.ts", "utf8");

describe("Fontes (RIV-35)", () => {
  it("carrega a Caveat só no peso 700", () => {
    const caveat = fonts.slice(fonts.indexOf("const caveat = Caveat({"));
    expect(caveat).toMatch(/weight:\s*"700"/);
  });

  it("todo uso de font-hand no código é negrito (font-bold)", () => {
    const files = [
      "components/ui/hand-note.tsx",
      "components/home/hero.tsx",
      "components/layout/site-header.tsx",
      "components/layout/site-footer.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/[^"`]*font-hand[^"`]*/g)) {
        expect(match[0]).toContain("font-bold");
      }
    }
  });
});
