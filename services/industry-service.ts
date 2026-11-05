import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type IndustryPageContent = {
  banner: string | null;
  items: {
    id: number;
    title: string;
    icon: string | null;
    active_jobs_count: number;
  }[];
};

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchIndustryPage(lang: ApiLang): Promise<IndustryPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/industries?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: IndustryPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load industry page from the API", error);
    return null;
  }
}
