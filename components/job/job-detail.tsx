"use client";

import Link from "@/components/LocaleLink";
import {
  FaArrowRight,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaFileUpload,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaShareAlt,
  FaTelegramPlane,
  FaUserTie,
} from "react-icons/fa";
import PageBanner from "../PageBanner";
import JobContentTabs from "./job-content";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/util/animations";
import { useLanguage } from "../LanguageProvider";
import { fetchJobPageContent, fetchPublicJob, type JobPageContent, type PublicJobDetail } from "@/services/job-service";
import { createTranslator, fetchTranslations } from "@/services/translation-service";
import { buildShareLinks } from "@/util/share-links";

function telegramHref(value: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://t.me/${value.replace(/^@/, "")}`;
}

export default function JobDetail({ jobId, shareUrl }: { jobId: string; shareUrl: string }) {
  const { locale } = useLanguage();
  const [job, setJob] = useState<PublicJobDetail | null>(null);
  const [pageContent, setPageContent] = useState<JobPageContent | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [visit, setVisit] = useState(0);
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;

    fetchTranslations(locale).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    // Runs on every visit, so the page remounts and its entrance animations play again.
    setVisit((value) => value + 1);

    Promise.all([fetchPublicJob(jobId, locale), fetchJobPageContent(locale)]).then(([jobResult, pageResult]) => {
      if (!active) return;
      setJob(jobResult);
      setPageContent(pageResult);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [jobId, locale]);

  if (loading && !job) {
    return <main className="min-h-[60vh] bg-white" aria-busy="true" />;
  }

  if (!job) {
    return (
      <main className="overflow-hidden bg-white text-slate-900">
        <PageBanner title={t("Job Details")} image={pageContent?.thumbnail} />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">{t("Job not found")}</h1>
          <p className="mt-3 text-slate-500">{t("This job may have been removed or is no longer available.")}</p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#485ea8] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {t("Browse Jobs")}
          </Link>
        </div>
      </main>
    );
  }

  const jobTypes = job.types.map((type) => type.title).join(", ");
  const shareLinkUrls = buildShareLinks(shareUrl, job.title);
  const applyHref = job.link || (job.email ? `mailto:${job.email}` : null);
  const telegramLink = telegramHref(job.telegram);
  const needInfoPhone = pageContent?.need_info.phone ?? "";
  const needInfoEmail = pageContent?.need_info.email ?? "";

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: shareLinkUrls.facebook,
      style: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      name: "Telegram",
      icon: FaTelegramPlane,
      href: shareLinkUrls.telegram,
      style: "hover:bg-sky-50 hover:text-sky-600",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: shareLinkUrls.linkedin,
      style: "hover:bg-blue-50 hover:text-blue-700",
    },
  ];

  return (
    <main key={visit} className="overflow-hidden bg-white text-slate-900">
      <PageBanner title={t("Job Details")} image={pageContent?.thumbnail} />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">

          {/* LEFT: Job information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="min-w-0 space-y-6">

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {job.title}
                </h1>

                <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
                  {job.industry && (
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#485ea8]">
                      {job.industry.title}
                    </span>
                  )}
                  {job.company_name && (
                    <span className="inline-flex items-center gap-2">
                      <FaUserTie className="text-[#485ea8]" />
                      {job.company_name}
                    </span>
                  )}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
                  {
                    job.address ? (
                      <InfoItem icon={<FaMapMarkerAlt />} label={t("Location")} value={job.address} />
                    ) : null
                  }
                  {
                    jobTypes.length ? (
                      <InfoItem icon={<FaBriefcase />} label={t("Employment type")} value={jobTypes || "-"} />
                    ) : null
                  }
                  {
                    job.salary ? (
                      <InfoItem icon={<FaMoneyBillWave />} label={t("Salary")} value={job.salary} />
                    ) : null
                  }
                  {
                    job.experience ? (
                      <InfoItem icon={<FaClock />} label={t("Experience")} value={job.experience} />
                    ) : null
                  }
                </div>
              </section>

              <JobContentTabs
                description={job.description}
                taskInclude={job.task_include}
                occupations={job.occupations}
                other={job.other}
                t={t}
              />

              {pageContent && (pageContent.apply.summary || pageContent.apply.items.length > 0) && (
                <ArticleSection title={pageContent.apply.title || "How to Apply"}>
                  {pageContent.apply.summary && <p>{pageContent.apply.summary}</p>}

                  {pageContent.apply.items.length > 0 && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
                      {pageContent.apply.list_label && (
                        <p className="font-bold text-slate-900">{pageContent.apply.list_label}</p>
                      )}
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {pageContent.apply.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pageContent.apply.button_link && (
                    <a
                      href={pageContent.apply.button_link}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#485ea8] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pageContent.apply.button_label || "Apply for this job"}
                      <FaArrowRight />
                    </a>
                  )}
                </ArticleSection>
              )}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-900">
                      <FaShareAlt className="text-[#485ea8]" />
                      {t("Share this opportunity")}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {t("Help someone discover their next career opportunity.")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {shareLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Share on ${item.name}`}
                          title={item.name}
                          className={`flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition ${item.style}`}
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </motion.div>

          {/* RIGHT: Application and contact */}
          <Reveal direction="right">
            <aside className="space-y-5 lg:sticky lg:top-6">
              {
                telegramLink || job.email || applyHref ? (
                  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="bg-[#10264b] p-6 text-white">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        <FaFileUpload size={20} />
                      </span>

                      <h2 className="mt-4 text-xl font-bold">
                        {pageContent?.contact.title || "Interested in this role?"}
                      </h2>

                      {pageContent?.contact.summary && (
                        <p className="mt-2 text-sm leading-6 text-blue-100/80">{pageContent.contact.summary}</p>
                      )}
                    </div>

                    <div className="space-y-3 p-5">
                      {applyHref && (
                        <a
                          href={applyHref}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#485ea8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("Apply for this Job")}
                          <FaArrowRight />
                        </a>
                      )}

                      {job.email && (
                        <a
                          href={`mailto:${job.email}?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#485ea8]"
                        >
                          <FaEnvelope />
                          {t("Contact via Email")}
                        </a>
                      )}

                      {telegramLink && (
                        <a
                          href={telegramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                        >
                          <FaTelegramPlane size={17} />
                          {t("Contact via Telegram")}
                        </a>
                      )}
                    </div>
                  </section>
                ) : ""
              }

              {(pageContent?.need_info.title || needInfoPhone || needInfoEmail) && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-bold text-slate-900">
                    <FaUserTie className="text-[#485ea8]" size={20} />
                    {pageContent?.need_info.title || t("Need more information?")}
                  </h2>

                  {pageContent?.need_info.summary && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">{pageContent.need_info.summary}</p>
                  )}

                  <div className="mt-5 space-y-4">
                    {needInfoPhone && (
                      <a
                        href={`tel:${needInfoPhone.replace(/[^+\d]/g, "")}`}
                        className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition-colors hover:bg-[#485ea8]/5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#485ea8]/10 text-[#485ea8]">
                          <FaPhone size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-500">{t("Call our team")}</p>
                          <p className="mt-1 break-words text-sm font-semibold text-slate-800 transition-colors group-hover:text-[#485ea8]">
                            {needInfoPhone}
                          </p>
                        </div>
                      </a>
                    )}

                    {needInfoEmail && (
                      <a
                        href={`mailto:${needInfoEmail}`}
                        className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition-colors hover:bg-[#485ea8]/5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#485ea8]/10 text-[#485ea8]">
                          <FaEnvelope size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-500">{t("Email us")}</p>
                          <p className="mt-1 break-all text-sm font-semibold text-slate-800 transition-colors group-hover:text-[#485ea8]">
                            {needInfoEmail}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                </section>
              )}
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#485ea8]">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-5 text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="border-l-[3px] border-[#485ea8] pl-4 text-xl font-bold text-slate-900">{title}</h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">{children}</div>
    </section>
  );
}
