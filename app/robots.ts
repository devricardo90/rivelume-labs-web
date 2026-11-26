import type { MetadataRoute } from "next";
import { getIndexableSiteUrl } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  const base = getIndexableSiteUrl();

  return {
    // Crawlers must be able to read the noindex directive on accessible pages.
    rules: { userAgent: "*", allow: "/" },
    ...(base && { sitemap: new URL("/sitemap.xml", base).href }),
  };
}
