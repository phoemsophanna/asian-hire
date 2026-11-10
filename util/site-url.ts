const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/+$/, "");
}

// Crawlers need absolute URLs, so relative paths are resolved against the site URL.
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${getSiteUrl()}/${pathOrUrl.replace(/^\/+/, "")}`;
}
