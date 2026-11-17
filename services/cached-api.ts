"use cache";

import { cacheLife } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

// Server-side API reads are cached so pages are served from memory instead of
// waiting on the API for every request. Failures throw, and thrown errors are not cached.
export async function requestApiData<T>(path: string): Promise<T> {
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  const response = await fetch(`${API_URL}${path}`, {
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`${path} failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { data?: T };
  if (payload.data === undefined || payload.data === null) {
    throw new Error(`${path} did not contain data`);
  }

  return payload.data;
}
