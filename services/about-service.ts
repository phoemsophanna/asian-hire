import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type AboutPageContent = {
  seo: { title: string; description: string; keywords: string };
  hero: { title: string; description: string; image: string | null };
  who_we_are: { title: string; description: string; image: string | null };
  what_we_do: { title: string; description: string; items: { icon: string | null; title: string; summary: string }[] };
  what_guides_us: { title: string; description: string };
  principles: { id: string; title: string; icon: string | null; description: string; image: string | null }[];
  statistics: { title: string; items: { value: string; label: string }[] };
  team: { title: string; members: { id: number; name: string; role: string; image: string | null }[] };
  why_choose: {
    title: string;
    description: string;
    thumbnail: string | null;
    items: { title: string; text: string; icon: string | null }[];
  };
};

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchAboutPage(lang: ApiLang): Promise<AboutPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/about?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: AboutPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load about page from the API", error);
    return null;
  }
}
