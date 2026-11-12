import { describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

describe("URL-base do site (SITE_URL)", () => {
  it("devolve null quando não está definida ou está vazia", () => {
    expect(getSiteUrl(undefined)).toBeNull();
    expect(getSiteUrl("")).toBeNull();
    expect(getSiteUrl("   ")).toBeNull();
  });

  it("aceita http e https e mantém só a origem", () => {
    expect(getSiteUrl("https://example.com")?.href).toBe(
      "https://example.com/",
    );
    expect(getSiteUrl(" https://example.com/algum/caminho?x=1#y ")?.href).toBe(
      "https://example.com/",
    );
    expect(getSiteUrl("http://localhost:3000")?.href).toBe(
      "http://localhost:3000/",
    );
  });

  it("falha de forma clara para valor inválido ou protocolo inseguro", () => {
    expect(() => getSiteUrl("example.com")).toThrow("SITE_URL inválida");
    expect(() => getSiteUrl("ftp://example.com")).toThrow("http ou https");
    expect(() => getSiteUrl("javascript:alert(1)")).toThrow("http ou https");
  });

  it("monta URLs absolutas só quando há base", () => {
    expect(absoluteUrl("/en", new URL("https://example.com"))).toBe(
      "https://example.com/en",
    );
    expect(absoluteUrl("/en", null)).toBeNull();
  });
});
