"use client";

import Link from "@/components/LocaleLink";
import { CalendarDays, Share2, Tag, TrendingUp } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaTelegram } from "react-icons/fa";
import PageBanner from "../PageBanner";
import { Reveal } from "@/util/animations";
import type { ApiLang } from "@/services/homepage-service";
import type { NewsDetailContent } from "@/services/news-service";
import { buildShareLinks } from "@/util/share-links";

const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];
const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";

function toKhmerDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => KHMER_DIGITS[Number(digit)]);
}

function formatDate(value: string | null, lang: ApiLang) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  if (lang === "km") {
    return `ថ្ងៃទី ${toKhmerDigits(date.getUTCDate())} ខែ${KHMER_MONTHS[date.getUTCMonth()]} ឆ្នាំ ${toKhmerDigits(date.getUTCFullYear())}`;
  }
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BlogDetail({
  article,
  lang,
  shareUrl,
}: {
  article: NewsDetailContent;
  lang: ApiLang;
  shareUrl: string;
}) {
  const shareLinkUrls = buildShareLinks(shareUrl, article.title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      color: "hover:bg-blue-50 hover:text-blue-600",
      url: shareLinkUrls.facebook,
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "hover:bg-sky-50 hover:text-sky-600",
      url: shareLinkUrls.telegram,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      color: "hover:bg-blue-50 hover:text-blue-700",
      url: shareLinkUrls.linkedin,
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Page header */}
      <PageBanner title={"Blog Details"} image={article.banner} />

      <div className={`mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 py-8 sm:px-8 lg:gap-10 md:py-16 ${article.related.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_340px]" : ""}`}>
        {/* Main article */}
        <Reveal direction="left">
          <article className="min-w-0 overflow-hidden">
            <div>
              {/* Thumbnail */}
              {article.thumbnail && (
                <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {article.title}
              </h1>

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-slate-100 pb-7 text-sm text-slate-500">
                {article.date && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#485ea8]" />
                    {formatDate(article.date, lang)}
                  </span>
                )}
                {article.tag && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#485ea8]">
                    <Tag size={13} />
                    {article.tag}
                  </span>
                )}
              </div>

              {/* Article introduction */}
              {article.summary && (
                <div className="mt-8">
                  <p className="border-l-[3px] border-[#485ea8] pl-5 text-lg font-medium leading-8 text-slate-600">
                    {article.summary}
                  </p>
                </div>
              )}

              {/* Article body (rich text from the CMS) */}
              {article.description && (
                <div
                  className="mt-8 space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 sm:[&_h2]:text-2xl [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                />
              )}

              {/* Share section */}
              <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Share2 size={18} className="text-[#485ea8]" />
                      Share this article
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Help others discover something useful.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {shareLinks.map((social) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Share on ${social.name}`}
                          title={`Share on ${social.name}`}
                          className={`inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition ${social.color}`}
                        >
                          <Icon size={19} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Right sidebar */}
        {article.related.length > 0 && (
          <Reveal direction="right">
            <aside className="space-y-6 lg:sticky lg:top-6">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Articles
                  </h2>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8]">
                    <TrendingUp size={19} />
                  </span>
                </div>

                <div className="space-y-5">
                  {article.related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blogs/${item.id}`}
                      className="group flex gap-3.5"
                    >
                      {item.thumbnail && (
                        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        {item.tag && (
                          <span className="text-[11px] font-bold uppercase tracking-wide text-[#485ea8]">
                            {item.tag}
                          </span>
                        )}
                        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-[#485ea8]">
                          {item.title}
                        </h3>
                        {item.date && (
                          <span className="mt-2 block text-xs text-slate-400">
                            {formatDate(item.date, lang)}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </Reveal>
        )}
      </div>
    </main>
  );
}
