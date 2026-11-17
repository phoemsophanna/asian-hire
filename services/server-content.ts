import { requestApiData } from "@/services/cached-api";
import {
  normalizeHomepage,
  type ApiLang,
  type HomepageData,
} from "@/services/homepage-service";
import type { AboutPageContent } from "@/services/about-service";
import type { ContactPageContent } from "@/services/contact-service";
import type { EmployerPageContent } from "@/services/employer-service";
import type { IndustryPageContent } from "@/services/industry-service";
import type { JobSeekerPageContent } from "@/services/job-seeker-service";
import type { JobPageContent, PublicJobDetail } from "@/services/job-service";
import type { GeneralSettings, MenuRow } from "@/services/site-service";
import type { NewsDetailContent, NewsPageContent } from "@/services/news-service";
import type { PrivacyPolicyPageContent } from "@/services/privacy-policy-service";
import type { ServiceDetailContent } from "@/services/service-detail-service";
import type { ServiceListContent } from "@/services/service-list-service";
import type { TermsConditionsPageContent } from "@/services/terms-conditions-service";

// Server-only, cached counterparts of the browser fetchers in this folder.
// Each returns null when the API cannot be reached so pages can render their fallback.
async function load<T>(path: string, transform?: (data: T) => T): Promise<T | null> {
  try {
    const data = await requestApiData<T>(path);
    return transform ? transform(data) : data;
  } catch (error) {
    console.error(`Unable to load ${path} from the API`, error);
    return null;
  }
}

export const getHomepage = (lang: ApiLang) =>
  load<HomepageData>(`/homepage?lang=${lang}`, normalizeHomepage);

export const getTranslations = async (lang: ApiLang) =>
  (await load<Record<string, string>>(`/translations?lang=${lang}`)) ?? {};

export const getGeneralSettings = (lang: ApiLang) =>
  load<GeneralSettings>(`/public/general?lang=${lang}`);

export const getActiveMenus = () => load<MenuRow[]>(`/menus/active`);

export const getJobPageContent = (lang: ApiLang) =>
  load<JobPageContent>(`/public/job-page?lang=${lang}`);

export const getIndustryPage = (lang: ApiLang) =>
  load<IndustryPageContent>(`/public/industries?lang=${lang}`);

export const getAboutPage = (lang: ApiLang) =>
  load<AboutPageContent>(`/public/about?lang=${lang}`);

export const getContactPage = (lang: ApiLang) =>
  load<ContactPageContent>(`/public/contact?lang=${lang}`);

export const getEmployerPage = (lang: ApiLang) =>
  load<EmployerPageContent>(`/public/employer?lang=${lang}`);

export const getJobSeekerPage = (lang: ApiLang) =>
  load<JobSeekerPageContent>(`/public/job-seeker?lang=${lang}`);

export const getPrivacyPolicyPage = (lang: ApiLang) =>
  load<PrivacyPolicyPageContent>(`/public/privacy-policy?lang=${lang}`);

export const getTermsConditionsPage = (lang: ApiLang) =>
  load<TermsConditionsPageContent>(`/public/terms-and-conditions?lang=${lang}`);

export const getServiceList = (lang: ApiLang) =>
  load<ServiceListContent>(`/public/services?lang=${lang}`);

export const getServiceDetail = (id: string, lang: ApiLang) =>
  load<ServiceDetailContent>(`/public/services/${encodeURIComponent(id)}?lang=${lang}`);

export const getNewsPage = (lang: ApiLang) =>
  load<NewsPageContent>(`/public/news?lang=${lang}`);

export const getNewsDetail = (id: string, lang: ApiLang) =>
  load<NewsDetailContent>(`/public/news/${encodeURIComponent(id)}?lang=${lang}`);

export const getPublicJob = (id: string, lang: ApiLang) =>
  load<PublicJobDetail>(`/public/jobs/${encodeURIComponent(id)}?lang=${lang}`);
