"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaFileUpload,
  FaGraduationCap,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaShareAlt,
  FaTelegramPlane,
  FaUserTie,
} from "react-icons/fa";
import PageBanner from "../PageBanner";
import JobContentTabs from "./job-content";
import { useEffect, useState } from "react";

const job = {
  id: 1,
  title: "Senior Web Developer",
  company: "Asian Hire",
  category: "Information Technology",
  location: "Phnom Penh, Cambodia",
  jobType: "Full-time",
  workplace: "On-site",
  experience: "2+ years",
  salary: "$800 – $1,500 / month",
  deadline: "November 15, 2026",
  startDate: "December 1, 2026",
  postedDate: "October 20, 2026",
  email: "careers@example.com",
  telegram: "https://t.me/your_telegram_username",

  description:
    "We are looking for a passionate Web Developer to join our growing team. You will work with modern technologies to build reliable, responsive, and user-friendly web applications. The ideal candidate enjoys solving problems, learning new technologies, and collaborating with other team members to deliver high-quality digital experiences.",

  responsibilities: [
    "Develop and maintain responsive websites and web applications.",
    "Build reusable components and write clean, maintainable code.",
    "Integrate REST APIs and work with databases.",
    "Collaborate with designers, developers, and project managers.",
    "Identify bugs, optimize performance, and improve application security.",
    "Participate in code reviews and contribute to technical decisions.",
  ],

  requirements: [
    "At least 2 years of experience in web development.",
    "Knowledge of JavaScript, TypeScript, HTML, and CSS.",
    "Experience with React, Next.js, or similar frameworks.",
    "Understanding of REST APIs and Git version control.",
    "Strong problem-solving and communication skills.",
    "A willingness to learn and work collaboratively.",
  ],

  benefits: [
    "Competitive salary based on experience.",
    "Professional development and learning opportunities.",
    "Supportive and collaborative working environment.",
    "Opportunities to work on interesting projects.",
  ],
};

export default function JobDetail() {
  // Replace this with your actual job ID or slug.
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const applyUrl = "mailto:info@camgotech.com";

  const shareUrl = encodeURIComponent(currentUrl);
  const shareTitle = encodeURIComponent(job.title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      style: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      name: "Telegram",
      icon: FaTelegramPlane,
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
      style: "hover:bg-sky-50 hover:text-sky-600",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      style: "hover:bg-blue-50 hover:text-blue-700",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Breadcrumb */}
      <PageBanner title="Job Details" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">

          {/* LEFT: Job information */}
          <div className="min-w-0 space-y-6">

            {/* Job header */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#485ea8]">
                    {job.category}
                  </span>

                  <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    {job.title}
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <FaUserTie className="text-[#485ea8]" />
                    {job.company}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Posted on {job.postedDate}
                  </p>
                </div>
              </div>

              {/* Job summary */}
              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
                <InfoItem
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={job.location}
                />

                <InfoItem
                  icon={<FaBriefcase />}
                  label="Employment type"
                  value={job.jobType}
                />

                <InfoItem
                  icon={<FaMoneyBillWave />}
                  label="Salary"
                  value={job.salary}
                />

                <InfoItem
                  icon={<FaClock />}
                  label="Experience"
                  value={job.experience}
                />

                <InfoItem
                  icon={<FaCalendarAlt />}
                  label="Expected start date"
                  value={job.startDate}
                />

                <InfoItem
                  icon={<FaCalendarAlt />}
                  label="Application deadline"
                  value={job.deadline}
                  highlight
                />
              </div>
            </section>

            <JobContentTabs job={job} />

            {/* How to apply */}
            <ArticleSection title="How to Apply">
              <p>
                Interested candidates are encouraged to submit their
                application online. Please prepare your updated CV and
                any relevant supporting documents before applying.
              </p>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
                <p className="font-bold text-slate-900">
                  Application documents
                </p>

                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Updated CV or resume</li>
                  <li>• Cover letter (recommended)</li>
                  <li>• Portfolio or project links, if applicable</li>
                </ul>

                <a
                  href={applyUrl}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#485ea8] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  target="_blank"
                >
                  Apply for this job
                  <FaArrowRight />
                </a>
              </div>
            </ArticleSection>

            {/* Share */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 font-bold text-slate-900">
                    <FaShareAlt className="text-[#485ea8]" />
                    Share this opportunity
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Help someone discover their next career opportunity.
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

          {/* RIGHT: Application card */}
          <aside className="space-y-5 lg:sticky lg:top-6">

            {/* Apply card */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-[#10264b] p-6 text-white">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                  <FaFileUpload size={20} />
                </span>

                <h2 className="mt-4 text-xl font-bold">
                  Interested in this role?
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-100/80">
                  Take the next step in your career. Submit your
                  application and let the employer know you're interested.
                </p>
              </div>

              <div className="space-y-3 p-5">
                <a
                  href={applyUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#485ea8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  target="_blank"
                >
                  Apply for this Job
                  <FaArrowRight />
                </a>

                <a
                  href={`mailto:${job.email}?subject=${encodeURIComponent(
                    `Application for ${job.title}`,
                  )}&body=${encodeURIComponent(
                    `Hello ${job.company} Recruitment Team,\n\nI am interested in applying for the ${job.title} position.\n\nPlease find my application details attached.\n\nBest regards,`,
                  )}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#485ea8]"
                >
                  <FaEnvelope />
                  Contact via Email
                </a>

                <a
                  href={job.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                >
                  <FaTelegramPlane size={17} />
                  Contact via Telegram
                </a>

                <p className="pt-2 text-center text-xs leading-5 text-slate-400">
                  Please apply before the application deadline.
                </p>
              </div>
            </section>

            {/* Important dates */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Important Dates
              </h2>

              <div className="mt-5 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8]">
                    <FaClock />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">
                      Expected start date
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {job.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <FaCalendarAlt />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">
                      Application deadline
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {job.deadline}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-bold text-slate-900">
                <FaUserTie className="text-[#485ea8]" />
                Need more information?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Contact the recruitment team if you have questions
                about this position or the application process.
              </p>

              <a
                href={`mailto:${job.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#485ea8] hover:underline"
              >
                Email recruitment
                <FaArrowRight size={13} />
              </a>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
      <span
        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
          highlight
            ? "bg-rose-50 text-rose-500"
            : "bg-blue-50 text-[#485ea8]"
        }`}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-5 text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function ArticleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="border-l-[3px] border-[#485ea8] pl-4 text-xl font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}