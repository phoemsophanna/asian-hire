import BlogDetail from "@/components/blog/blog-detail";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchNewsDetail } from "@/services/news-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";
import { buildPageMetadata } from "@/util/seo-metadata";

// The folder is named [slug], but blog links carry the numeric news id.
type RouteParams = Promise<{ lang: string; slug: string }>;

const getContent = cache(fetchNewsDetail);

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { lang, slug } = await params;
  const content = await getContent(slug, toApiLang(resolveLang(lang)));
  if (!content) return {};

  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    image: content.thumbnail ?? content.banner,
  });
}

export default function Page({ params }: { params: RouteParams }) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <BlogContent params={params} />
    </Suspense>
  );
}

async function BlogContent({ params }: { params: RouteParams }) {
  const { lang, slug } = await params;
  const lookupLang = toApiLang(resolveLang(lang));
  const article = await getContent(slug, lookupLang);

  if (!article) {
    notFound();
  }

  return <BlogDetail article={article} lang={lookupLang} />;
}
