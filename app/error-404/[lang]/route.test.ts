import { describe, expect, it } from "vitest";
import { GET } from "@/app/error-404/[lang]/route";

const call = (lang: string) =>
  GET(new Request(`http://localhost/error-404/${lang}`), {
    params: Promise.resolve({ lang }),
  });

describe("Resposta 404 (RIV-37)", () => {
  it("responde 404 com HTML, no-store e noindex", async () => {
    const response = await call("en");

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("usa lang=en em inglês e lang=pt-BR em português", async () => {
    const en = await (await call("en")).text();
    const pt = await (await call("pt")).text();

    expect(en).toContain('<html lang="en">');
    expect(en).toContain("This page");
    expect(pt).toContain('<html lang="pt-BR">');
    expect(pt).toContain("Esta página");
  });

  it("cai no inglês para idioma desconhecido, sem lançar erro", async () => {
    for (const lang of ["fr", "PT", "zz"]) {
      const response = await call(lang);

      expect(response.status).toBe(404);
      expect(await response.text()).toContain('<html lang="en">');
    }
  });
});
