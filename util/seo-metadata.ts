import type { Metadata } from "next";
import { absoluteUrl } from "./site-url";

export const SITE_NAME = "Asian Hire";
export const DEFAULT_SHARE_IMAGE = "/images/logo_en.png";

// Optional SEO fields returned by the Laravel API for jobs, news, and services.
export type ApiSeoExtras = {
  og_image?: string | null;
  canonical_url?: string | null;
  robots_index?: boolean;
  robots_follow?: boolean;
};

type SeoInput = ApiSeoExtras & {
  title: string;
  description?: string;
  keywords?: string;
  image?: string | null;
  // Locale-prefixed path such as /en/jobs/12, used when no canonical_url is set.
  path?: string;
  lang?: "en" | "km";
  type?: "website" | "article";
};

const OG_LOCALE = { en: "en_US", km: "km_KH" } as const;

// Image chain: API og_image, page image, then the site logo. All values are made absolute for crawlers.
export function buildPageMetadata({
  title,
  description,
  keywords,
  image,
  og_image,
  canonical_url,
  robots_index = true,
  robots_follow = true,
  path,
  lang = "en",
  type = "website",
}: SeoInput): Metadata {
  const cleanKeywords = keywords?.trim() ?? "";
  const cleanDescription = description?.trim() ?? "";
  const canonicalSource = canonical_url?.trim() || path;
  const canonical = canonicalSource ? absoluteUrl(canonicalSource) : undefined;
  const shareImage = absoluteUrl(og_image || image || DEFAULT_SHARE_IMAGE);

  return {
    title,
    ...(cleanDescription ? { description: cleanDescription } : {}),
    ...(cleanKeywords
      ? { keywords: cleanKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) }
      : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: { index: robots_index, follow: robots_follow },
    openGraph: {
      title,
      ...(canonical ? { url: canonical } : {}),
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      type,
      ...(cleanDescription ? { description: cleanDescription } : {}),
      images: [{ url: shareImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(cleanDescription ? { description: cleanDescription } : {}),
      images: [shareImage],
    },
  };
}
