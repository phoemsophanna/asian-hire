import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type RelatedService = {
  id: number;
  title: string;
  thumbnail: string | null;
};

export type ServiceDetailContent = {
  id: number;
  title: string;
  summary: string;
  description: string;
  thumbnail: string | null;
  banner: string | null;
  related: RelatedService[];
  seo: { title: string; description: string; keywords: string };
};

// Returns null for missing, inactive, or unreachable services so the page can show a not-found state.
export async function fetchServiceDetail(id: string, lang: ApiLang): Promise<ServiceDetailContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/services/${encodeURIComponent(id)}?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: ServiceDetailContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load service details from the API", error);
    return null;
  }
}
