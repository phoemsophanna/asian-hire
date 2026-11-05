import type { ApiLang } from "./homepage-service";
import type { JobSeekerPageContent } from "./job-seeker-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type EmployerPageContent = JobSeekerPageContent;

export async function fetchEmployerPage(lang: ApiLang): Promise<EmployerPageContent | null> {
  try {
    const response = await fetch(`${API_URL}/public/employer?lang=${lang}`);
    if (!response.ok) return null;

    const payload = await response.json();
    return (payload.data ?? null) as EmployerPageContent | null;
  } catch {
    return null;
  }
}
