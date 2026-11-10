import type { MetadataRoute } from "next";
import { URL_LOCALES, localizePath, type UrlLocale } from "@/util/i18n";
import { absoluteUrl } from "@/util/site-url";
import type { PublicJobPage } from "@/services/job-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
const PAGE_SIZE = 50;

const STATIC_PATHS = [
  "/",
  "/jobs",
  "/blogs",
  "/services",
  "/about-us",
  "/contact-us",
  "/job-seeker",
  "/employers",
  "/industry",
  "/privacy-policy",
  "/terms-and-conditions",
];

// A failed list request only drops those URLs, so the rest of the sitemap still builds.
async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function entry(path: string, lastModified?: string | null): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    URL_LOCALES.map((locale: UrlLocale) => [locale, absoluteUrl(localizePath(path, locale))]),
  );

  return {
    url: absoluteUrl(localizePath(path, "en")),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: { languages },
  };
}

async function fetchAllJobs(): Promise<{ id: number; created_at: string | null }[]> {
  const firstPage = await fetchJson<PublicJobPage>(
    `${API_URL}/public/jobs?lang=eng&page=1&per_page=${PAGE_SIZE}`,
  );
  if (!firstPage) return [];

  const jobs = [...firstPage.data];
  for (let page = 2; page <= firstPage.last_page; page += 1) {
    const next = await fetchJson<PublicJobPage>(
      `${API_URL}/public/jobs?lang=eng&page=${page}&per_page=${PAGE_SIZE}`,
    );
    if (next) jobs.push(...next.data);
  }
  return jobs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, news, services] = await Promise.all([
    fetchAllJobs(),
    fetchJson<{ data?: { items: { id: number; date: string | null }[] } }>(`${API_URL}/public/news?lang=eng`),
    fetchJson<{ data?: { items: { id: number }[] } }>(`${API_URL}/public/services?lang=eng`),
  ]);

  return [
    ...STATIC_PATHS.map((path) => entry(path)),
    ...jobs.map((job) => entry(`/jobs/${job.id}`, job.created_at)),
    ...(news?.data?.items ?? []).map((item) => entry(`/blogs/${item.id}`, item.date)),
    ...(services?.data?.items ?? []).map((item) => entry(`/services/${item.id}`)),
  ];
}
