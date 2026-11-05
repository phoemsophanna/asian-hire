"use client";

import { Stagger, StaggerItem } from "@/util/animations";
import Link from "@/components/LocaleLink";
import PageBanner from "../PageBanner";
import { FaArrowRight } from "react-icons/fa";
import type { ServiceListContent } from "@/services/service-list-service";

export default function ServicePage({ content }: { content: ServiceListContent }) {
    return (
        <main className="overflow-hidden bg-white text-slate-900">
            <PageBanner title={"Services"} image={content.banner} />
            <section
                id="our-services"
                className="bg-white px-5 py-10 sm:px-8 md:py-16"
            >
                <Stagger
                    delay={0.2}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {content.items.map((service, index) => {
                        const href = `/services/${service.id}`;
                        const number = String(index + 1).padStart(2, "0");

                        return (
                        <StaggerItem key={service.id} direction="up">
                            <article
                                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.08]"
                            >
                                {/* Image */}
                                <Link
                                    href={href}
                                    aria-label={`Learn more about ${service.title}`}
                                    className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
                                >
                                    {service.thumbnail && (
                                        <img
                                            src={service.thumbnail}
                                            alt={service.title}
                                            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#10264b]/55 via-transparent to-transparent opacity-80" />
                                    <span className="absolute left-4 top-3 text-sm font-bold text-white">{number}</span>
                                </Link>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold leading-[1.2] text-[#10264b] transition-colors group-hover:text-[#485ea8]">
                                        <Link href={href}>{service.title}</Link>
                                    </h3>

                                    {service.summary && (
                                        <p className="mt-2 text-sm line-clamp-2 leading-[1.6] text-slate-600">
                                            {service.summary}
                                        </p>
                                    )}

                                    <Link
                                        href={href}
                                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#485ea8] transition-all hover:gap-3"
                                    >
                                        Read More
                                        <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </article>
                        </StaggerItem>
                        );
                    })}
                </Stagger>
            </section>
        </main>
    );
}
