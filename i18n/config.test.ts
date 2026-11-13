import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  hasLocale,
  localePath,
} from "@/i18n/config";

describe("Configuração de idiomas", () => {
  it("aceita só en e pt, com EN como idioma padrão", () => {
    expect([...LOCALES]).toEqual(["en", "pt"]);
    expect(DEFAULT_LOCALE).toBe("en");
  });

  it("mapeia o slug da URL para a tag de idioma: en -> en, pt -> pt-BR", () => {
    expect(LOCALE_TAGS).toEqual({ en: "en", pt: "pt-BR" });
  });

  it("reconhece os idiomas válidos e recusa os demais", () => {
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("pt")).toBe(true);
    for (const invalid of ["fr", "pt-br", "pt-BR", "EN", "", "en/"]) {
      expect(hasLocale(invalid)).toBe(false);
    }
  });

  it("monta o caminho de cada idioma", () => {
    expect(localePath("en")).toBe("/en");
    expect(localePath("pt")).toBe("/pt");
    expect(localePath("pt", "#services")).toBe("/pt#services");
  });
});
