import { requestSeo } from "@/services/seo-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type ApiLang = "eng" | "km";

export type HomepageItem = {
  title: string;
  text: string;
  icon: string | null;
};

export type HomepageIndustry = {
  id: number;
  title: string;
  icon: string | null;
  active_jobs_count: number;
};

export type HomepageJob = {
  id: number;
  title: string;
  company_name: string | null;
  salary: string | null;
  address: string | null;
  is_featured: boolean;
  industry: { id: number; title_eng: string; title_km: string | null } | null;
  type_ids: number[];
  types: { id: number; title_eng: string; title_km: string | null }[];
  link: string | null;
};

export type HomepageNews = {
  id: number;
  title: string;
  summary: string;
  date: string | null;
  thumbnail: string | null;
  tag_eng: string | null;
  tag_km: string | null;
};

export type SeoData = {
  title: string;
  description: string;
  keywords: string;
  image: string | null;
};

export type HomepageData = {
  hero: { image: string | null; subtitle: string; title: string };
  find_job: { title: string; description: string; items: HomepageItem[]; trending_keywords: string[] };
  industries: { title: string; description: string; items: HomepageIndustry[] };
  jobs: { title: string; description: string; items: HomepageJob[] };
  types: { id: number; title: string; }[];
  why_choose: { title: string; description: string; thumbnail: string | null; items: HomepageItem[] };
  news: { title: string; description: string; items: HomepageNews[] };
  seo: { title: string; description: string; keywords: string; image: string | null };
};

export type SeoPage = "homepage" | "about" | "jobseeker" | "employer" | "contact" | "job";

// Returns null when the API cannot be reached so pages can render their static fallback.
export async function fetchSeo(lang: ApiLang, page: SeoPage = "homepage"): Promise<SeoData | null> {
  try {
    return await requestSeo(lang, page);
  } catch (error) {
    console.error("Unable to load SEO data from the API", error);
    return null;
  }
}

// Keeps list fields as arrays even if the API returns an object or omits them.
function toList<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") return Object.values(value) as T[];
  return [];
}

function normalizeHomepage(data: HomepageData): HomepageData {
  return {
    ...data,
    find_job: {
      ...data.find_job,
      items: toList<HomepageItem>(data.find_job?.items),
      trending_keywords: toList<string>(data.find_job?.trending_keywords),
    },
    industries: { ...data.industries, items: toList<HomepageIndustry>(data.industries?.items) },
    jobs: { ...data.jobs, items: toList<HomepageJob>(data.jobs?.items) },
    types: toList(data.types),
    why_choose: { ...data.why_choose, items: toList<HomepageItem>(data.why_choose?.items) },
    news: { ...data.news, items: toList<HomepageNews>(data.news?.items) },
  };
}

// Returns null when the API cannot be reached so pages can render their static fallback.
export async function fetchHomepage(lang: ApiLang): Promise<HomepageData | null> {
  try {
    const response = await fetch(`${API_URL}/homepage?lang=${lang}`);

    if (!response.ok) {
      throw new Error(`Homepage request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { data?: HomepageData };
    if (!payload.data) {
      throw new Error("Homepage response did not contain data");
    }

    return normalizeHomepage(payload.data);
  } catch (error) {
    console.error("Unable to load homepage data from the API", error);
    return null;
  }
}
