import { SITE_NAME, DEFAULT_SHARE_IMAGE } from "./seo-metadata";
import { absoluteUrl } from "./site-url";

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type JobForSchema = {
  title: string;
  description: string;
  company_name: string | null;
  address: string | null;
  salary: string | null;
  created_at: string | null;
  types: { id: number; title: string }[];
};

export function jobPostingJsonLd(job: JobForSchema, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: stripTags(job.description) || job.title,
    datePosted: job.created_at ?? undefined,
    employmentType: job.types.length ? job.types.map((type) => type.title) : undefined,
    hiringOrganization: job.company_name
      ? { "@type": "Organization", name: job.company_name }
      : undefined,
    jobLocation: job.address
      ? {
          "@type": "Place",
          address: { "@type": "PostalAddress", streetAddress: job.address, addressCountry: "KH" },
        }
      : undefined,
    url,
  };
}

type ArticleForSchema = {
  title: string;
  summary: string;
  date: string | null;
  thumbnail: string | null;
};

export function articleJsonLd(article: ArticleForSchema, url: string) {
  const image = absoluteUrl(article.thumbnail || DEFAULT_SHARE_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: stripTags(article.summary) || article.title,
    image: [image],
    datePublished: article.date ?? undefined,
    dateModified: article.date ?? undefined,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl(DEFAULT_SHARE_IMAGE) },
    },
  };
}
