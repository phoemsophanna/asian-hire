import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { DEFAULT_SHARE_IMAGE, buildPageMetadata } from "@/util/seo-metadata";
import type { ApiLang } from "@/services/homepage-service";
import { getHomepage, getIndustryPage } from "@/services/server-content";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import HomePage from "@/components/home/home-page";

const HOME_TITLE = "Asian Hire | Find Your Next Opportunity";
const HOME_DESCRIPTION =
  "Discover job opportunities across Australia and Cambodia. Connect with trusted employers and take your career further with Asian Hire.";

const getHomeContent = cache(async (lang: ApiLang) => {
  const [data, industries] = await Promise.all([
    getHomepage(lang),
    getIndustryPage(lang),
  ]);

  return { data, industries };
});

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

// Static OG/SEO values so shared links never depend on the API.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const urlLocale = resolveLang((await params).lang);

  return buildPageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: DEFAULT_SHARE_IMAGE,
    path: `/${urlLocale}`,
    lang: urlLocale === "km" ? "km" : "en",
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent params={params} />
    </Suspense>
  );
}

async function HomeContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toApiLang(resolveLang((await params).lang));
  const initial = await getHomeContent(lang);

  return <HomePage lang={lang} initialContent={initial} />;
}
