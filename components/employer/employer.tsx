"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

const services = [
  {
    number: "01",
    title: "IELTS Preparation Course",
    description:
      "Improve your English language skills with structured IELTS preparation, practice exercises, and guidance to help you prepare for the exam.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=85",
    alt: "Student studying and preparing for an English language exam",
    href: "/services/ielts-preparation",
  },
  {
    number: "02",
    title: "Career Opportunities",
    description:
      "Explore job opportunities that match your skills, qualifications, and professional goals.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals collaborating in a modern workplace",
    href: "/jobs",
  },
  {
    number: "03",
    title: "Resume Assistance",
    description:
      "Present your experience, qualifications, and professional strengths with a clear, well-organised resume.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=85",
    alt: "Professional documents prepared on a desk",
    href: "/job-seeker",
  },
  {
    number: "04",
    title: "Recruitment Support",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/job-seeker",
  },
  {
    number: "05",
    title: "Sponsor Liaison and Coordination",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/job-seeker",
  },
  {
    number: "06",
    title: "482 Visa Application Support",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/job-seeker",
  },
];

const industries = [
  "Construction & Engineering",
  "Healthcare & Aged Care",
  "Hospitality & Tourism",
  "Manufacturing",
  "Transport & Logistics",
  "Information Technology",
  "Administration & Office Support",
  "Agriculture & Skilled Trades",
];

const faqs = [
  {
    question: "How do I apply for a job through Asian Hire?",
    answer:
      "Explore our available job opportunities, select a role that matches your experience, and follow the application instructions on the job listing. You can also send your resume to our recruitment team.",
  },
  {
    question: "What should I include in my resume?",
    answer:
      "Include your contact details, professional summary, employment history, relevant skills, qualifications, and references where appropriate. Keep your information accurate and up to date.",
  },
  {
    question: "Can I submit my resume if there are no suitable jobs?",
    answer:
      "Yes. Send your resume to our recruitment team with your occupation in the email subject line. We can review your details when considering suitable opportunities.",
  },
  {
    question: "Do I need Australian work rights to apply?",
    answer:
      "Work-rights requirements vary by role and employer. Review each job advertisement carefully and make sure you meet the relevant eligibility requirements before applying.",
  },
  {
    question: "How will I know if my application is successful?",
    answer:
      "If your experience matches a vacancy, our recruitment team may contact you to discuss your application and possible next steps. Response times can vary depending on the role.",
  },
];

const mailTo = `mailto:recruitment@asianhire.com?subject=${encodeURIComponent(
  "Resume Submission - [Your Occupation]",
)}&body=${encodeURIComponent(
  "Dear Asian Hire Recruitment Team,\n\nPlease find my resume attached for your consideration.\n\nMy occupation: [Your Occupation]\nMy name: [Your Name]\nMy contact number: [Your Phone Number]\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]",
)}`;

export default function EmployersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <PageBanner title="Employers" />
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-12 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10 order-2 md:order-1">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-[#485ea8] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#485ea8]" />
              Your career. Your future.
            </div>

            <h1 className="max-w-2xl text-2xl md:text-4xl font-extrabold leading-[1.15] tracking-tight text-[#10264b]">
              Australian Recruitment Services: Access Vetted, Skilled Workforce
            </h1>

            <p className="mt-3 md:mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Your next career opportunity starts here. Connect with our
              recruitment team, explore opportunities across key industries,
              and take the next step toward your professional future in
              Australia.
            </p>

            <p className="mt-1 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Your next career opportunity starts here. Connect with our
              recruitment team, explore opportunities across key industries,
              and take the next step toward your professional future in
              Australia.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#485ea8] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#485ea8]/20 transition hover:-translate-y-0.5 hover:bg-[#1955c5]"
              >
                Explore Job Opportunities
                <FaArrowRight />
              </Link>
            </div>
          </div>

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
        </div>
      </section>

      {/* Dedicated Recruiters */}
      <section className="bg-[#f7f9fc] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center rounded-3xl border border-slate-100 bg-[#f7f9fc]/80 p-7 sm:p-10 lg:p-12">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
              Support at every step
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#10264b] sm:text-4xl">
              Dedicated Recruiters, Focused on Your Future
            </h2>

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

            <Link
              href="/jobs"
              className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-[#485ea8] transition hover:gap-3"
            >
              Find your next role <FaArrowRight />
            </Link>
          </div>

          {/* Blue industries panel with online background image */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-[#485ea8] p-7 text-white sm:p-10 lg:p-12">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 -z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#485ea8]/95 via-[#1555b7]/90 to-[#0d2857]/95" />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 backdrop-blur-md">
              <FaGlobeAsia />
              Opportunities across Australia
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Industries We Serve
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-blue-100">
              Explore career opportunities across a range of industries and
              discover where your skills can make a difference.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="group flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.10] p-4 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/[0.17]"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-200" />
                  <span className="text-sm font-medium leading-6 text-white">
                    {industry}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-7 text-xs leading-5 text-blue-100/90">
              Available roles and industry coverage depend on current vacancies.
            </p>
          </div>
        </div>
      </section>

      <ServiceSection services={services} />

      {/* FAQs */}
      <FaqSection faqs={faqs} title="FAQs for Job Employers" description="Find answers to common questions about applying for jobs,
                    preparing your resume, and working with our recruitment team." />

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
              Don’t See a Role That Fits?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100 sm:text-lg">
              Send us your resume with your occupation in the email subject
              line. We would be happy to consider your profile for relevant
              future opportunities.
            </p>

            <div className="mt-8">
              <a
                href={mailTo}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#485ea8] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Submit Your Resume
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}