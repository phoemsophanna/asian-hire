import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type ContactPageContent = {
  seo: { title: string; description: string; keywords: string };
  banner: string | null;
  consultation: {
    title: string;
    description: string;
    image: string | null;
  };
  contact: {
    title: string;
    summary: string;
    address: string;
    phones: string[];
    emails: string[];
    map_embed: string;
  };
  disclaimer: string;
  social: {
    facebook: string | null;
    telegram: string | null;
    instagram: string | null;
    linkedin: string | null;
  };
};

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchContactPage(lang: ApiLang): Promise<ContactPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/contact?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: ContactPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load contact page from the API", error);
    return null;
  }
}
