import { getSiteUrl } from "./site-url";

// Do not substitute a generated deployment URL for the host confirmed in RIV-38.
const PUBLIC_HOST = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const RESERVED_HOST =
  /(?:^|\.)(?:localhost|local|test|example|invalid|vercel\.app)$|(?:^|\.)example\.(?:com|net|org)$/;

export function getIndexableSiteUrl(): URL | null {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.VERCEL_ENV !== "production" ||
    process.env.SEO_INDEXING_ENABLED !== "true"
  ) {
    return null;
  }

  const host = process.env.SEO_CANONICAL_HOST?.trim().toLowerCase();
  const value = process.env.SITE_URL?.trim();
  if (!host || !PUBLIC_HOST.test(host) || RESERVED_HOST.test(host)) return null;

  // Accept only the exact HTTPS origin, without credentials, port, path or query.
  if (value !== `https://${host}` && value !== `https://${host}/`) return null;
  return getSiteUrl(value);
}
