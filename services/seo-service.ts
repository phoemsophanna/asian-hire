"use cache";

import { cacheLife } from "next/cache";
import type { ApiLang, SeoData, SeoPage } from "@/services/homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

// Cached so generateMetadata can prerender with cacheComponents enabled.
// Failures throw, and thrown errors are not cached, so outages are retried.
export async function requestSeo(lang: ApiLang, page: SeoPage): Promise<SeoData> {
  cacheLife("hours");

  const response = await fetch(`${API_URL}/seo?lang=${lang}&type=${page}`);

  if (!response.ok) {
    throw new Error(`SEO request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { data?: SeoData };
  if (!payload.data) {
    throw new Error("SEO response did not contain data");
  }

  return payload.data;
}
