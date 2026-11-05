"use client";

import Link from "@/components/LocaleLink";
import SectionHeading from "./SectionHeader";
import { FaArrowRight } from "react-icons/fa";
import { Reveal, Stagger, StaggerItem } from "@/util/animations";

type ServiceItem = {
    id: number;
    number: string | number;
    href: string;
    image: string;
    alt: string;
    title: string;
    description: string;
};

type ServiceSectionProps = {
    services: ServiceItem[];
    title?: string | null;
    description?: string | null;
};

export default function ServiceSection ({ services, title, description, t = (key: string) => key }: any) {
    return <>
        {/* Our Services */}
        <section
            id="our-services"
            className="bg-white px-5 py-10 sm:px-8 md:py-16"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <Reveal direction="up">
                    <SectionHeading
                        description={description || "From language preparation to career guidance, discover the support you need to take your next step with confidence."}
                        title={title || "Our Services"}
                    />
                </Reveal>

                {/* Image Service Cards */}
                <Stagger 
                    delay={0.2}
                    className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
                >
                    {services.map((service:any) => (
                        <StaggerItem key={service.number} direction="up">
                            <article
                                key={service.number}
                                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.08]"
                            >
                                {/* Image */}
                                <Link
                                    href={`/services/${service.id}`}
                                    aria-label={`Learn more about ${service.title}`}
                                    className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
                                >
                                    <img
                                        src={service.image}
                                        alt={service.alt}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                                        {t("Read More")}
                                        <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
                <div className="mt-3 text-center">
                    <Link
                        href="/services"
                        className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-[#485ea8] transition hover:gap-3"
                    >
                        {t("View More")} <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    </>;
}