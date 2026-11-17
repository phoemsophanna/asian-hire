"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/components/LanguageProvider";
import { createTranslator } from "@/services/translation-service";

export default function PageBanner({title, image}:{title:any; image?: string | null}){
    const { translations } = useLanguage();
    const t = createTranslator(translations);

    return <>
        <section className="relative isolate aspect-[1920/700] overflow-hidden bg-[#101b46]">
            {/* Background image; loaded directly (already WebP from the API) so the server image optimizer adds no delay */}
            <Image
                src={image || "/images/slider/slider.jpg"}
                alt="Banner"
                fill
                sizes="100vw"
                className="object-cover"
                preload
                fetchPriority="high"
                unoptimized
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#101b46]/60 via-[#101b46]/45 to-[#101b46]/30" />

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-32 z-0 size-96 rounded-full border border-white/10" />
            <div className="absolute -right-10 -top-16 z-0 size-72 rounded-full border border-white/10" />

            {/* Banner content */}
            <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl items-center px-5 py-12 sm:px-8 sm:py-40 lg:px-10">
                <div>
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-4 flex items-center gap-2 text-sm text-blue-100"
                >
                    <Link
                        href="/"
                        className="transition hover:text-white"
                    >
                        {t("Home")}
                    </Link>

                    <span className="text-white/50">/</span>

                    <span className="font-medium text-white">
                        {t(title)}
                    </span>
                </nav>

                {/* Page title */}
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {t(title)}
                </h1>

                {/* Decorative line */}
                <div className="mt-5 h-1 w-16 rounded-full bg-[#485ea8]" />
                </div>
            </div>
        </section>
    </>;
}