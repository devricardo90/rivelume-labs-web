import { describe, expect, it } from "vitest";
import { LOCALES } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { getDictionary } from "@/i18n/get-dictionary";

// Caminhos de todas as chaves de texto de um dicionário, ex.: "hero.eyebrow".
function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  return Object.values(value as Record<string, unknown>).flatMap(strings);
}

describe("Dicionários EN e PT", () => {
  it("têm exatamente as mesmas chaves (paridade)", () => {
    expect(keyPaths(pt).sort()).toEqual(keyPaths(en).sort());
  });

  it("não têm textos vazios", () => {
    for (const dictionary of [en, pt]) {
      for (const text of strings(dictionary)) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("nomeiam cada idioma no próprio idioma, igual nos dois dicionários", () => {
    expect(en.language.names).toEqual(pt.language.names);
    expect(Object.keys(en.language.names).sort()).toEqual([...LOCALES].sort());
  });

  it("diferem onde há tradução (não é cópia do inglês)", () => {
    expect(pt.hero.body).not.toBe(en.hero.body);
    expect(pt.hero.cta).not.toBe(en.hero.cta);
    expect(pt.language.label).not.toBe(en.language.label);
  });

  it("são carregados por idioma com getDictionary", async () => {
    expect(await getDictionary("en")).toBe(en);
    expect(await getDictionary("pt")).toBe(pt);
  });
});

describe("Conteúdo comercial provisório (RIV-32)", () => {
  it("mantém os três serviços oficiais e o processo aprovado em EN", () => {
    expect(en.services.items.map((item) => item.title)).toEqual([
      "Custom Software Development",
      "Business Automation",
      "Practical AI Solutions",
    ]);
    expect(en.process.steps.map((step) => step.title)).toEqual([
      "Understand",
      "Plan",
      "Build",
      "Deliver",
    ]);
  });

  it("tem o mesmo número de serviços, conceitos, passos e valores nos dois idiomas", () => {
    expect(pt.services.items).toHaveLength(en.services.items.length);
    expect(pt.work.items).toHaveLength(en.work.items.length);
    expect(pt.process.steps).toHaveLength(4);
    expect(pt.about.values).toHaveLength(en.about.values.length);
  });

  it("identifica todos os cartões de Selected Work como conceito, sem estudo de caso", () => {
    for (const dictionary of [en, pt]) {
      for (const item of dictionary.work.items) {
        expect(item.label).toMatch(/Concept|Conceito/);
        expect(item.placeholder).toMatch(/concept|conceito/);
      }
    }
  });

  it("não usa Maintain/Manter nem Listen/Map como etapas do processo", () => {
    const titles = [...en.process.steps, ...pt.process.steps].map(
      (step) => step.title,
    );
    expect(titles.join("|")).not.toMatch(/Maintain|Manter|Listen|Map\b/);
  });
});
