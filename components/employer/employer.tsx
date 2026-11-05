"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
import type { EmployerPageContent } from "@/services/employer-service";
import {
  createTranslator,
  fetchTranslations,
  type TranslationApiLang,
} from "@/services/translation-service";
import {
  FaArrowRight,
  FaBriefcase,
  FaCheckCircle,
  FaChevronDown,
  FaEnvelope,
  FaGlobeAsia,
  FaHeadset,
  FaRegClock,
  FaRegFileAlt,
  FaRegHandshake,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";
import PageBanner from "../PageBanner";
import ServiceSection from "../ui/ServiceSection";
import FaqSection from "../ui/FaqSection";
import { Reveal } from "@/util/animations";

const mailTo = `mailto:recruitment@asianhire.com?subject=${encodeURIComponent(
  "Resume Submission - [Your Occupation]",
)}&body=${encodeURIComponent(
  "Dear Asian Hire Recruitment Team,\n\nPlease find my resume attached for your consideration.\n\nMy occupation: [Your Occupation]\nMy name: [Your Name]\nMy contact number: [Your Phone Number]\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]",
)}`;

export default function EmployersPage({
  content,
  lang = "eng",
}: {
  content: EmployerPageContent | null;
  lang?: TranslationApiLang;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    fetchTranslations(lang).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [lang]);

  const t = createTranslator(translations);

  const serviceItems = (content?.services.items ?? []).map((item, index) => ({
    id: item.id,
    number: String(index + 1).padStart(2, "0"),
    title: item.title,
    description: item.description,
    image: item.image ?? "",
    alt: item.title,
    href: `/services/${item.id}`,
  }));
  const faqItems = content?.faq.items ?? [];
  const processSteps = content?.process.items.some((step) => step.summary.trim())
    ? content.process.items.filter((step) => step.summary.trim())
    : null;

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <PageBanner title="Employers" image={content?.banner} />
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div className="relative z-10 order-2 md:order-1">
                <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-[#485ea8] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#485ea8]" />
                  {content?.hero.subtitle || "Your career. Your future."}
                </div>

                <h1 className="max-w-2xl text-2xl md:text-4xl font-extrabold leading-[1.15] tracking-tight text-[#10264b]">
                  {content?.hero.title || "Australian Recruitment Services: Access Vetted, Skilled Workforce"}
                </h1>

                <blockquote className="mt-4 relative after:absolute after:left-0 after:top-0 after:w-[4px] after:rounded-full after:h-full after:bg-[#485ea8] pl-5 text-xl font-semibold leading-relaxed text-[#485ea8]">
                  {content?.hero.quote || "Overcoming critical workforce shortages in Australia by sourcing dedicated talent directly from Cambodia."}
                </blockquote>

                {content?.hero.description ? (
                  <div
                    className="job-rich-text"
                    dangerouslySetInnerHTML={{ __html: content.hero.description }}
                  />
                ) : (
                <>
                <p className="mt-3 md:mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  In today’s competitive market, securing reliable, qualified, and motivated personnel is one of the greatest operational challenges for Australian businesses. Asian Hire offers a streamlined, end-to-end international recruitment pipeline designed to connect your enterprise with skilled, vetted Cambodian professionals ready for long-term visa sponsorship.
                </p>

                <p className="mt-2 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Operating from our legal entity in Phnom Penh, Cambodia, we actively manage the ground-level legwork. We source talent, thoroughly screen work histories, and verify technical capabilities across multiple industries—including specialised trades, agriculture, technology, and healthcare. Partnering with us means gaining access to a highly dependable workforce while ensuring full compliance with both Cambodian labour regulations and Australian immigration frameworks, including Subclass 482​ or 494 sponsorships.
                </p>
                </>
                )}
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="relative mx-auto order-1 md:order-2 w-full max-w-xl lg:max-w-none">
                <div className="absolute -right-5 -top-5 h-36 w-36 rounded-full bg-blue-200/50 blur-3xl" />
                <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-sky-200/50 blur-3xl" />

                <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-2 shadow-2xl shadow-slate-300/50">
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-[22px]">
                    <Image
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
                      alt="Professionals collaborating in a modern workplace"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10264b]/80 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="up">
            <div className="mt-8 col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-sm p-6 text-center order-3">
              <h2 className="text-xl font-bold text-[#10264b]">
                {content?.process.title || "Why Partner With Asian Hire?"}
              </h2>

              {processSteps ? (
                <ul className="mt-6 grid grid-cols-1 text-start md:grid-cols-3 gap-3">
                  {processSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                        <FaCheckCircle aria-hidden="true" />
                      </span>
                      <div dangerouslySetInnerHTML={{ __html: step.summary }} className="text-sm leading-6 text-slate-600" />
                    </li>
                  ))}
                </ul>
              ) : (
              <ul className="mt-6 grid grid-cols-1 text-start md:grid-cols-3 gap-3">
                <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                    <FaCheckCircle aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-slate-600">
                    <strong className="font-semibold text-[#10264b]">Rigorous Vetting.</strong>{" "}
                    We perform thorough background checks, reference verifications, and technical evaluations before presenting any candidate.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                    <FaCheckCircle aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-slate-600">
                    <strong className="font-semibold text-[#10264b]">End-to-End Compliance.</strong>{" "}
                    We coordinate with local ministries in Cambodia and registered legal experts in Australia to ensure smooth international processing.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                    <FaCheckCircle aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-slate-600">
                    <strong className="font-semibold text-[#10264b]">Industry Focus.</strong>{" "}
                    We specialize in sectors with severe domestic shortages, delivering workers who are committed to long-term operational success.
                  </span>
                </li>
              </ul>
              )}

              <Link
                href={content?.process.link || "mailto:info@camgotech.com"}
                target="_blank"
                className="mt-8 inline-flex w-fit text-sm md:text-base items-center gap-2 font-bold text-[#485ea8] transition hover:gap-3"
              >
                {content?.process.label || "Partner With Us / Request a Consultation"} <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dedicated Recruiters */}
      <section className="bg-[#f7f9fc] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-stretch">
          <Reveal direction="left">
            <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-[#f7f9fc]/80 p-7 sm:p-10 lg:p-12">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                {content?.support.subtitle || "Support at every step"}
              </span>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#10264b] sm:text-4xl">
                {content?.support.title || "Experienced Applicant Bank"}
              </h2>

              {content?.support.description ? (
                <div
                  className="job-rich-text mt-3 md:mt-5 leading-8 text-slate-600"
                  dangerouslySetInnerHTML={{ __html: content.support.description }}
                />
              ) : (
              <>
              <p className="mt-3 md:mt-5 leading-8 text-slate-600">
                Finding the right job is about more than matching a resume to a
                vacancy. Our recruitment team helps you understand opportunities,
                highlight your strengths, and navigate the application process
                with greater confidence.
              </p>

              <div className="mt-7 space-y-5">
                {[
                  {
                    title: "Understand your goals",
                    text: "We consider your experience, skills, and the type of role you are looking for.",
                  },
                  {
                    title: "Find suitable opportunities",
                    text: "Explore vacancies aligned with your background and career direction.",
                  },
                  {
                    title: "Move forward with confidence",
                    text: "Get clear guidance on applications and the next recruitment steps.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#485ea8]">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#10264b]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </>
              )}

              <Link
                href="/jobs"
                className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-[#485ea8] transition hover:gap-3"
              >
                {t("Find your next role")} <FaArrowRight />
              </Link>
            </div>
          </Reveal>

          {/* Blue industries panel with online background image */}
          <Reveal direction="right">
            <div className="relative isolate overflow-hidden rounded-3xl bg-[#485ea8] p-4 text-white sm:p-6 lg:p-7">
              <img
                src={
                  content?.opportunities.background ??
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
                }
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#485ea8]/95 via-[#1555b7]/90 to-[#0d2857]/95" />

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 backdrop-blur-md">
                <FaGlobeAsia />
                {content?.opportunities.subtitle || "Opportunities across Australia"}
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {content?.opportunities.title || "Dedicated Recruiters"}
              </h2>

              {content?.opportunities.description ? (
                <div
                  className="job-rich-text mt-4 max-w-lg leading-7 text-blue-100"
                  dangerouslySetInnerHTML={{ __html: content.opportunities.description }}
                />
              ) : (
              <>
              <p className="mt-4 max-w-lg leading-7 text-blue-100">
                Our recruiters, with an average of 20+ years in the staffing industry, excel at evaluating talent and managing client relationships. Our low turnover allows us to deliver exceptional continuity and service quality.
              </p>
              <p className="mt-4 max-w-lg leading-7 text-blue-100">
                Over the past 11 years, our executive headhunters have helped job seekers find their desired careers and provided outplacement services across Australia.
              </p>
              <p className="mt-4 max-w-lg leading-7 text-blue-100">
                Success and client focus are core to our culture, and clients value the expertise our recruiters provide.
              </p>
              <p className="mt-4 max-w-lg leading-7 text-blue-100">
                Industries We Served: Agriculture, Meat, Aged or Disabled Care, Healthcare, Childcare, Construction, Mining, Hospitality, Education, Automotive Mechanic, Social Work, etc.
              </p>
              </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {serviceItems.length > 0 && (
        <ServiceSection
          services={serviceItems}
          title={content?.services.title || undefined}
          description={content?.services.summary || undefined}
          t={t}
        />
      )}

      {/* FAQs */}
      {faqItems.length > 0 && (
        <FaqSection faqs={faqItems} subtitle={content?.faq.subtitle} title={content?.faq.title || "FAQs for Job Employers"} description={content?.faq.summary || "Find answers to common questions about applying for jobs, preparing your resume, and working with our recruitment team."} />
      )}

      {content?.cta.title || content?.cta.label ? (
        <section className="bg-white px-5 py-10 sm:px-8 sm:py-16">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#485ea8] px-6 py-12 text-center text-white shadow-2xl shadow-blue-900/10 sm:px-12 sm:py-16">
            <div className="relative mx-auto max-w-3xl">
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {content.cta.title}
              </h2>

              {content.cta.summary && (
                <div
                  className="job-rich-text mx-auto mt-4 max-w-2xl leading-7 text-blue-100 sm:text-lg"
                  dangerouslySetInnerHTML={{ __html: content.cta.summary }}
                />
              )}

              <div className="mt-8">
                <a
                  href={content.cta.link || mailTo}
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#485ea8] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  {content.cta.label || "Submit Your Resume"}
                  <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}