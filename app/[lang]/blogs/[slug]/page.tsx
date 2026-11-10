import BlogDetail from "@/components/blog/blog-detail";
import JsonLd from "@/components/seo/json-ld";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchNewsDetail } from "@/services/news-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, localizePath, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";
import { buildPageMetadata } from "@/util/seo-metadata";
import { absoluteUrl } from "@/util/site-url";
import { articleJsonLd } from "@/util/structured-data";

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
  const urlLocale = resolveLang(lang);
  const content = await getContent(slug, toApiLang(urlLocale));
  if (!content) return { robots: { index: false, follow: false } };

  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    image: content.thumbnail ?? content.banner,
    og_image: content.seo.og_image,
    canonical_url: content.seo.canonical_url,
    robots_index: content.seo.robots_index,
    robots_follow: content.seo.robots_follow,
    path: localizePath(`/blogs/${slug}`, urlLocale),
    lang: urlLocale,
    type: "article",
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
  const urlLocale = resolveLang(lang);
  const lookupLang = toApiLang(urlLocale);
  const article = await getContent(slug, lookupLang);

  if (!article) {
    notFound();
  }

  const pageUrl = absoluteUrl(localizePath(`/blogs/${slug}`, urlLocale));

  return (
    <>
      <JsonLd data={articleJsonLd(article, pageUrl)} />
      <BlogDetail article={article} lang={lookupLang} shareUrl={pageUrl} />
    </>
  );
}

