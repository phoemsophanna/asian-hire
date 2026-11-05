"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
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
import type { JobSeekerPageContent } from "@/services/job-seeker-service";
import {
  createTranslator,
  fetchTranslations,
  type TranslationApiLang,
} from "@/services/translation-service";

const mailTo = `mailto:recruitment@asianhire.com?subject=${encodeURIComponent(
  "Resume Submission - [Your Occupation]",
)}&body=${encodeURIComponent(
  "Dear Asian Hire Recruitment Team,\n\nPlease find my resume attached for your consideration.\n\nMy occupation: [Your Occupation]\nMy name: [Your Name]\nMy contact number: [Your Phone Number]\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]",
)}`;

export default function JobSeeker({
  content,
  lang = "eng",
}: {
  content: JobSeekerPageContent | null;
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

  const serviceItems = content?.services.items.length
    ? content.services.items.map((item, index) => ({
        id: item.id,
        number: String(index + 1).padStart(2, "0"),
        title: item.title,
        description: item.description,
        image: item.image ?? content?.services.items[0].image,
        alt: item.title,
        href: `/services/${item.id}`,
      }))
    : content?.services.items ?? [];
  const faqItems = content?.faq.items.length ? content.faq.items : [];
  const processSteps = content?.process.items.some((step) => step.summary.trim())
    ? content.process.items.filter((step) => step.summary.trim())
    : null;

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <PageBanner title="Job Seekers" image={content?.banner} />
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
                  {content?.hero.title || "Build Your Future: Skilled Job Opportunities in Australia"}
                </h1>

                <blockquote className="mt-4 relative after:absolute after:left-0 after:top-0 after:w-[4px] after:rounded-full after:h-full after:bg-[#485ea8] pl-5 text-xl font-semibold leading-relaxed text-[#485ea8]">
                  {content?.hero.quote || "Connecting qualified Cambodian professionals with trusted Australian sponsors under the Subclass 482​ and 494 visa program."}{" "}
                </blockquote>

                {content?.hero.description ? (
                  <div
                    className="job-rich-text"
                    dangerouslySetInnerHTML={{ __html: content.hero.description }}
                  />
                ) : (
                  <>
                    <p className="mt-3 md:mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                      Are you a skilled Cambodian professional or tradesperson looking to advance your career on an international stage? Asian Hire is your licensed pathway to employment in Australia. We specialise in matching local talent with verified Australian employers who are ready to sponsor qualified workers.
                    </p>

                    <p className="mt-2 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                      Navigating overseas employment requires precision. Our dedicated team in Phnom Penh guides you through every milestone of the journey—from aligning your profile with official ANZSCO occupational standards to prepping your documentation for formal skills assessments and English proficiency requirements (IELTS/PTE). We do not just find you a job; we ensure your transition is safe, transparent, and fully legally compliant.
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
                {content?.process.title || "Our 3-Step Process (Bullet Points)"}
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
                      <div dangerouslySetInnerHTML={{__html: step.summary }} className="text-sm leading-6 text-slate-600" />
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
                    <strong className="font-semibold text-[#10264b]">Profile Evaluation:</strong>{" "}
                     Submit your CV and certifications. Our team assesses your eligibility against Australian visa requirements.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                    <FaCheckCircle aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-slate-600">
                    <strong className="font-semibold text-[#10264b]">Employer Matching:</strong>{" "}
                     We present your profile to verified Australian businesses facing critical skills shortages.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#485ea8]">
                    <FaCheckCircle aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-slate-600">
                    <strong className="font-semibold text-[#10264b]">Migration Support:</strong>{" "}
                    Once selected, we assist you and our legal partners in compiling documentation for a seamless Subclass 482 or 494 visa application.
                  </span>
                </li>
              </ul>
              )}

              <Link
                href={content?.process.link || "mailto:info@camgotech.com"}
                target="_blank"
                className="mt-8 inline-flex w-fit text-sm md:text-base items-center gap-2 font-bold text-[#485ea8] transition hover:gap-3"
              >
                {content?.process.label || "Contact Us today"} <FaArrowRight />
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

              <h2 className="mt-3 md:mt-4 text-2xl font-extrabold tracking-tight text-[#10264b] sm:text-4xl">
                {content?.support.title || "Dedicated Recruiters, Focused on Your Future"}
              </h2>

              {content?.support.description ? (
                <div
                  className="job-rich-text mt-3 md:mt-5 leading-8 text-slate-600"
                  dangerouslySetInnerHTML={{ __html: content.support.description }}
                />
              ) : (
                <p className="mt-3 md:mt-5 leading-8 text-slate-600">
                  Finding the right job is about more than matching a resume to a
                  vacancy. Our recruitment team helps you understand opportunities,
                  highlight your strengths, and navigate the application process
                  with greater confidence.
                </p>
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
                {content?.opportunities.title || "Industries We Serve"}
              </h2>

              {content?.opportunities.description ? (
                <div
                  className="job-rich-text mt-4 max-w-lg leading-7 text-blue-100"
                  dangerouslySetInnerHTML={{ __html: content.opportunities.description }}
                />
              ) : (
                <p className="mt-4 max-w-lg leading-7 text-blue-100">
                  Explore career opportunities across a range of industries and
                  discover where your skills can make a difference.
                </p>
              )}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {(content?.opportunities.items.length ? content.opportunities.items : []).map(
                  (industry) => (
                    <div
                      key={industry}
                      className="group flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.10] p-4 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/[0.17]"
                    >
                      <FaCheckCircle className="mt-1 shrink-0 text-blue-200" />
                      <span className="text-sm font-medium leading-6 text-white">
                        {industry}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <p className="mt-7 text-xs leading-5 text-blue-100/90">
                {t("Available roles and industry")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      
      {
        serviceItems && serviceItems.length > 0 && (
          <ServiceSection
            services={serviceItems}
            title={content?.services.title}
            description={content?.services.summary}
            t={t}
          />
        )
      }
      
      {/* FAQs */}
      {
        faqItems && faqItems.length > 0 && (
          <FaqSection
            faqs={faqItems}
            subtitle={content?.faq.subtitle}
            title={content?.faq.title || "FAQs for Job Seekers"}
            description={content?.faq.summary || "Find answers to common questions about applying for jobs, preparing your resume, and working with our recruitment team."}
          />
        )
      }

      {/* Resume CTA */}
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#485ea8] px-6 py-12 text-center text-white shadow-2xl shadow-blue-900/10 sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[45px] border-white/[0.06]" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border-[45px] border-white/[0.06]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl">
              <FaRegFileAlt />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {content?.cta.title || "Don’t See a Role That Fits?"}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100 sm:text-lg">
              {content?.cta.summary ||
                "Send us your resume with your occupation in the email subject line. We would be happy to consider your profile for relevant future opportunities."}
            </p>
            
            <div className="mt-8">
              <a
                href={content?.cta.link || mailTo}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#485ea8] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {content?.cta.label || "Submit Your Resume"}
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}