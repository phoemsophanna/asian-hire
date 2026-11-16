"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { createTranslator, fetchTranslations } from "@/services/translation-service";


export default function PageBanner({title, image}:{title:any; image?: string | null}){
    const pathname = usePathname();
    const lang = pathname.startsWith("/km") ? "km" : "eng";
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const t = createTranslator(translations);

    useEffect(() => {
        let active = true;

        fetchTranslations(lang).then((data) => {
            if (active) setTranslations(data);
        });

        return () => {
            active = false;
        };
    }, [lang]);

    return <>
        <section className="relative isolate overflow-hidden bg-[#101b46]">
            {/* Background image */}
            <Image
                src={image || "/images/slider/slider.jpg"}
                alt="Banner"
                width={0}
                height={0}
                sizes="100vw"
                className="block h-auto w-full"
                priority
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