import Link from "next/link";
import SectionHeading from "./SectionHeader";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function ServiceSection ({ services }:any) {
    
    return <>
        {/* Our Services */}
        <section
            id="our-services"
            className="bg-white px-5 py-10 sm:px-8 md:py-16"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <SectionHeading
                    description="From language preparation to career guidance, discover the support you need to take your next step with confidence."
                    title="Our Services"
                />

                {/* Image Service Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
                    {services.map((service:any) => (
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
                                    Learn More
                                    <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    </>;
}