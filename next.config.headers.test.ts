import { describe, expect, it } from "vitest";
import nextConfig, {
  CONTENT_SECURITY_POLICY,
  SECURITY_HEADERS,
  buildSecurityHeaders,
} from "./next.config";

const byKey = (headers: { key: string; value: string }[]) =>
  Object.fromEntries(headers.map((h) => [h.key, h.value]));

describe("next.config: headers de segurança (RIV-46)", () => {
  it("aplica os headers a todas as rotas e não anuncia o framework", async () => {
    const rules = await nextConfig.headers?.();

    expect(rules).toHaveLength(1);
    expect(rules?.[0].source).toBe("/:path*");
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("traz os headers básicos em qualquer ambiente", () => {
    const headers = byKey(SECURITY_HEADERS);

    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
  });

  it("o CSP só entra em produção (next dev precisa de eval)", () => {
    expect(
      buildSecurityHeaders(false).some(
        (h) => h.key === "Content-Security-Policy",
      ),
    ).toBe(false);
    expect(byKey(buildSecurityHeaders(true))["Content-Security-Policy"]).toBe(
      CONTENT_SECURITY_POLICY,
    );
  });

  it("o CSP bloqueia plugins, <base>, enquadramento e recursos externos", () => {
    const csp = CONTENT_SECURITY_POLICY;

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("font-src 'self'");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).not.toMatch(/https?:|\*/);
  });

  it("script-src só aceita a própria origem e script em linha (sem data:, blob:)", () => {
    const script = CONTENT_SECURITY_POLICY.split("; ").find((d) =>
      d.startsWith("script-src "),
    );

    expect(script).toBe("script-src 'self' 'unsafe-inline'");
  });
});
