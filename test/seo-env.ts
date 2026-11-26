import { vi } from "vitest";

// Local fixture only. No request is made to this hostname.
export const SEO_HOST = "canonical.riv40-fixture.dev";
export const SEO_ORIGIN = `https://${SEO_HOST}`;

export function enableIndexingFixture() {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("SEO_INDEXING_ENABLED", "true");
  vi.stubEnv("SEO_CANONICAL_HOST", SEO_HOST);
  vi.stubEnv("SITE_URL", SEO_ORIGIN);
}
