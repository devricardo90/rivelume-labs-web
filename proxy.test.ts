import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "@/proxy";

const run = (path: string) => proxy(new NextRequest(`http://localhost${path}`));

describe("Proxy: normalização de caixa do idioma na URL (RIV-37)", () => {
  it.each([
    ["/PT", "/pt"],
    ["/EN", "/en"],
    ["/Pt", "/pt"],
    ["/EN/privacy", "/en/privacy"],
    ["/Pt/privacy", "/pt/privacy"],
    ["/en/PRIVACY", "/en/privacy"],
    ["/PT/x", "/pt/x"],
    ["/EN/x", "/en/x"],
    ["/EN/PRIVACY/X", "/en/privacy/x"],
  ])("%s redireciona (308) para %s", (from, to) => {
    const response = run(from);

    expect(response.status).toBe(308);
    expect(new URL(response.headers.get("location")!).pathname).toBe(to);
  });

  it("preserva a query string", () => {
    const response = run("/PT?a=1&b=2");
    const location = new URL(response.headers.get("location")!);

    expect(location.pathname).toBe("/pt");
    expect(location.search).toBe("?a=1&b=2");
  });

  it.each(["/en", "/pt", "/en/privacy", "/pt/privacy", "/en/x", "/pt/a/b"])(
    "%s já é canônico: não redireciona (sem laço)",
    (path) => {
      const response = run(path);

      expect(response.headers.get("location")).toBeNull();
      expect(response.status).toBe(200);
    },
  );

  it.each(["/", "/fr", "/FR", "/Foo/Bar", "/Entrada", "/enx/Y"])(
    "%s não começa por um idioma: não é tocado",
    (path) => {
      expect(run(path).headers.get("location")).toBeNull();
    },
  );

  it("o matcher exclui _next e arquivos com extensão (sitemap, favicon, estáticos)", () => {
    const re = new RegExp(`^${config.matcher[0]}$`);

    expect(re.test("/en/PRIVACY")).toBe(true);
    expect(re.test("/PT")).toBe(true);
    expect(re.test("/_next/static/x.js")).toBe(false);
    expect(re.test("/sitemap.xml")).toBe(false);
    expect(re.test("/favicon.ico")).toBe(false);
  });
});
