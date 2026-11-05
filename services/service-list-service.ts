import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type ServiceListItem = {
  id: number;
  title: string;
  summary: string;
  thumbnail: string | null;
};

export type ServiceListContent = {
  banner: string | null;
  items: ServiceListItem[];
};

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchServiceList(lang: ApiLang): Promise<ServiceListContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/services?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: ServiceListContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load services from the API", error);
    return null;
  }
}
