import type { Metadata } from "next";

export const SITE_NAME = "Asian Hire";
export const DEFAULT_SHARE_IMAGE = "/images/logo_en.png";

type SeoInput = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string | null;
};

// Image chain: page image, then the site logo. Relative paths resolve via metadataBase in the root layout.
export function buildPageMetadata({ title, description, keywords, image }: SeoInput): Metadata {
  const cleanKeywords = keywords?.trim() ?? "";
  const cleanDescription = description?.trim() ?? "";
  const shareImage = image || DEFAULT_SHARE_IMAGE;

  return {
    title,
    ...(cleanDescription ? { description: cleanDescription } : {}),
    ...(cleanKeywords
      ? { keywords: cleanKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) }
      : {}),
    openGraph: {
      title,
      siteName: SITE_NAME,
      type: "website",
      ...(cleanDescription ? { description: cleanDescription } : {}),
      images: [{ url: shareImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(cleanDescription ? { description: cleanDescription } : {}),
      images: [shareImage],
    },
  };
}
