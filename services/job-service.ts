import type { ApiLang } from "./homepage-service";
import type { ApiSeoExtras } from "@/util/seo-metadata";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type JobSort = "newest" | "oldest" | "title";

export type PublicJob = {
  id: number;
  title: string;
  company_name: string | null;
  salary: string | null;
  code: string | null;
  address: string | null;
  is_featured: boolean;
  industry: { id: number; title: string } | null;
  type_ids: number[];
  types: { id: number; title: string }[];
  link: string | null;
  created_at: string | null;
};

export type PublicJobPage = {
  data: PublicJob[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type JobPageContent = {
  notice: string;
  thumbnail: string | null;
  apply: {
    title: string;
    summary: string;
    list_label: string;
    items: string[];
    button_label: string;
    button_link: string;
  };
  contact: { title: string; summary: string };
  need_info: { title: string; summary: string; phone: string; email: string };
};

export type PublicJobDetail = {
  id: number;
  title: string;
  description: string;
  address: string | null;
  company_name: string | null;
  salary: string | null;
  experience: string | null;
  code: string | null;
  apply_for: string | null;
  email: string | null;
  telegram: string | null;
  link: string | null;
  is_featured: boolean;
  created_at: string | null;
  industry: { id: number; title: string } | null;
  types: { id: number; title: string }[];
  task_include: string;
  occupations: string;
  other: string;
  seo: { title: string; description: string; keywords: string } & ApiSeoExtras;
};

// Returns null for missing, inactive, or unreachable jobs so the page can show a not-found state.
export async function fetchPublicJob(id: string, lang: ApiLang): Promise<PublicJobDetail | null> {
  try {
    const response = await fetch(`${API_URL}/public/jobs/${encodeURIComponent(id)}?lang=${lang}`);

    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: PublicJobDetail };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load job details from the API", error);
    return null;
  }
}

// Returns null when the API cannot be reached, so the page can fall back to its defaults.
export async function fetchJobPageContent(lang: ApiLang): Promise<JobPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/job-page?lang=${lang}`);

    if (!response.ok) {
      throw new Error(`Job page request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { data?: JobPageContent };
    return payload.data ?? null;
  } catch (error) {
    console.error("Unable to load job page content from the API", error);
    return null;
  }
}

export type PublicJobQuery = {
  lang: ApiLang;
  page: number;
  perPage?: number;
  keyword?: string;
  location?: string;
  industryId?: number;
  sort: JobSort;
};

export function buildPublicJobsUrl(query: PublicJobQuery): string {
  const params = new URLSearchParams({
    lang: query.lang,
    page: String(query.page),
    sort: query.sort,
  });

  if (query.perPage) params.set("per_page", String(query.perPage));
  if (query.keyword?.trim()) params.set("keyword", query.keyword.trim());
  if (query.location?.trim()) params.set("location", query.location.trim());
  if (query.industryId) params.set("industry_id", String(query.industryId));

  return `${API_URL}/public/jobs?${params.toString()}`;
}

// Used on the client, so the request is not cached: results must follow the current filters.
// Returns null when the API cannot be reached, so the page can show an empty state.
export async function fetchPublicJobs(query: PublicJobQuery, signal?: AbortSignal): Promise<PublicJobPage | null> {
  try {
    const response = await fetch(buildPublicJobsUrl(query), { cache: "no-store", signal });

    if (!response.ok) {
      throw new Error(`Jobs request failed with status ${response.status}`);
    }

    return (await response.json()) as PublicJobPage;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    console.error("Unable to load jobs from the API", error);
    return null;
  }
}
