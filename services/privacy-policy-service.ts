import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type PrivacyPolicyPageContent = {
  seo: { title: string; description: string; keywords: string };
  banner: string | null;
  content: string;
};

// Returns null when the API is unreachable so the page can show a not-found state.
export async function fetchPrivacyPolicyPage(lang: ApiLang): Promise<PrivacyPolicyPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/privacy-policy?lang=${lang}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: PrivacyPolicyPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load privacy policy from the API", error);
    return null;
  }
}
