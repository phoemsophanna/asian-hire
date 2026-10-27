import { Stagger, StaggerItem } from "@/util/animations";
import PageBanner from "../PageBanner";
import ServiceSection from "../ui/ServiceSection";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

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
    href: "/services/ielts-preparation",
  },
  {
    number: "03",
    title: "Resume Assistance",
    description:
      "Present your experience, qualifications, and professional strengths with a clear, well-organised resume.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=85",
    alt: "Professional documents prepared on a desk",
    href: "/services/ielts-preparation",
  },
  {
    number: "04",
    title: "Recruitment Support",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/services/ielts-preparation",
  },
  {
    number: "05",
    title: "Sponsor Liaison and Coordination",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/services/ielts-preparation",
  },
  {
    number: "06",
    title: "482 Visa Application Support",
    description:
      "Get guidance throughout your job search and application process from our recruitment team.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85",
    alt: "Professionals discussing recruitment and career opportunities",
    href: "/services/ielts-preparation",
  },
];

export default function ServicePage () {
    return (
        <main className="overflow-hidden bg-white text-slate-900">
            <PageBanner title={"Services"} />
            <section
                id="our-services"
                className="bg-white px-5 py-10 sm:px-8 md:py-16"
            >
                <Stagger
                    delay={0.2}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service:any) => (
                        <StaggerItem key={service.number} direction="up">
                            <article
                                key={service.number}
                                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.08]"
                            >
                                {/* Image */}
                                <Link
                                    href={service.href}
                                    aria-label={`Learn more about ${service.title}`}
                                    className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.alt}
                                        fill
                                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#10264b]/55 via-transparent to-transparent opacity-80" />
                                </Link>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold leading-[1.2] text-[#10264b] transition-colors group-hover:text-[#485ea8]">
                                        <Link href={service.href}>{service.title}</Link>
                                    </h3>

                                    <p className="mt-2 text-sm line-clamp-2 leading-[1.6] text-slate-600">
                                        {service.description}
                                    </p>

                                    <Link
                                        href={service.href}
                                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#485ea8] transition-all hover:gap-3"
                                    >
                                        Read More
                                        <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </main>
    );
}