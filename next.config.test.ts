import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";
import { DEFAULT_LOCALE, localePath } from "@/i18n/config";

describe("next.config: redirecionamento da raiz (ADR-0001, P4)", () => {
  it("redireciona / para /en de forma temporária (307), sem permanent", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual([
      { source: "/", destination: "/en", permanent: false },
    ]);
  });

  it("o destino coincide com o idioma padrão", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects?.[0].destination).toBe(localePath(DEFAULT_LOCALE));
  });
});
