import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import PageBanner from "../PageBanner";

const services = [
  {
    slug: "ielts-preparation",
    title: "IELTS Preparation Course",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Student studying and preparing for an English language exam",
    excerpt:
      "Improve your English language skills with structured IELTS preparation, practice exercises, and guidance to help you prepare for the exam.",
    sections: [
      {
        heading: "Prepare with a clear plan",
        paragraphs: [
          "Preparing for IELTS takes practice across different English language skills. A structured approach can help you understand the test, build confidence, and make steady progress toward your goals.",
          "Our IELTS preparation course offers practice exercises and guidance to support you as you prepare for the exam.",
        ],
      },
      {
        heading: "Focus on the four test skills",
        paragraphs: [
          "IELTS assesses listening, reading, writing, and speaking. Regular practice in each area helps you become familiar with the question types and identify the skills you may want to strengthen.",
        ],
      },
      {
        heading: "Take your next step",
        paragraphs: [
          "Everyone starts from a different place. Get in touch with our team to learn more about the preparation support available and find out whether the course is right for you.",
        ],
      },
    ],
  },
] as const;

type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

const recentServices = [
  {
    title: "IELTS Preparation Course",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=240&q=80",
    href: "/services/ielts-preparation",
  },
  {
    title: "Career Opportunities",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=240&q=80",
    href: "/jobs",
  },
  {
    title: "Resume Assistance",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=240&q=80",
    href: "/job-seeker",
  },
  {
    title: "Recruitment Support",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=240&q=80",
    href: "/job-seeker",
  },
];

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <PageBanner title={service.title} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 py-8 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <article className="min-w-0 overflow-hidden">
          <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          <h1 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {service.title}
          </h1>

          <div className="mt-6 border-b border-slate-100 pb-7">
            <p className="border-l-[3px] border-[#485ea8] pl-5 text-lg font-medium leading-8 text-slate-600">
              {service.excerpt}
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-9 rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">
              Ready to learn more?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contact our team to discuss IELTS preparation and the support
              available to you.
            </p>
            <Link
              href="/job-seeker"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#485ea8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d55bd]"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Recent Services
              </h2>
            </div>

            <div className="space-y-5">
              {recentServices.map((recentService) => (
                <Link
                    key={recentService.title}
                    href={recentService.href}
                    className="group flex items-center gap-3.5"
                >
                {/* Thumbnail */}
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        src={recentService.image}
                        alt={recentService.title}
                        fill
                        sizes="76px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800 transition-colors duration-300 group-hover:text-[#485ea8]">
                        {recentService.title}
                    </h3>

                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors duration-300 group-hover:text-[#485ea8]">
                        Learn More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path
                                d="M4 10h12m-5-5 5 5-5 5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
