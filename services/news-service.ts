import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type NewsPageContent = {
  seo: { title: string; description: string; keywords: string };
  banner: string | null;
  items: {
    id: number;
    title: string;
    summary: string;
    date: string | null;
    thumbnail: string | null;
    tag: string;
  }[];
};

export type NewsDetailContent = {
  id: number;
  title: string;
  summary: string;
  description: string;
  tag: string;
  date: string | null;
  thumbnail: string | null;
  banner: string | null;
  related: {
    id: number;
    title: string;
    tag: string;
    date: string | null;
    thumbnail: string | null;
  }[];
  seo: { title: string; description: string; keywords: string };
};

// Returns null when the article is missing or the API is unreachable.
export async function fetchNewsDetail(id: string, lang: ApiLang): Promise<NewsDetailContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/news/${id}?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: NewsDetailContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load news detail from the API", error);
    return null;
  }
}

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchNewsPage(lang: ApiLang): Promise<NewsPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/news?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: NewsPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load news page from the API", error);
    return null;
  }
}
