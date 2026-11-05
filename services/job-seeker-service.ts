import type { ApiLang } from "./homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type JobSeekerPageContent = {
  seo: { title: string; description: string; keywords: string };
  banner: string | null;
  hero: { subtitle: string; title: string; quote: string; description: string };
  process: {
    title: string;
    items: { summary: string }[];
    label: string;
    link: string;
  };
  support: { subtitle: string; title: string; description: string };
  opportunities: {
    subtitle: string;
    title: string;
    description: string;
    background: string | null;
    items: string[];
  };
  services: {
    title: string;
    summary: string;
    items: { id: number; title: string; description: string; image: string | null }[];
  };
  faq: {
    subtitle: string;
    title: string;
    summary: string;
    items: { question: string; answer: string }[];
  };
  cta: { title: string; summary: string; label: string; link: string };
};

export async function fetchJobSeekerPage(lang: ApiLang): Promise<JobSeekerPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/job-seeker?lang=${lang}`);
    if (!response.ok) return null;

    const payload = await response.json();
    console.log(payload);
    return (payload.data ?? null) as JobSeekerPageContent | null;
  } catch {
    return null;
  }
}
