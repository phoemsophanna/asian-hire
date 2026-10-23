import Link from "next/link";

export default function PageBanner({title}:any){
    return <>
        <section className="relative isolate overflow-hidden bg-[#101b46]">
            {/* Background image */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=90')",
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101b46]/90 via-[#101b46]/75 to-[#101b46]/50" />

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-32 -z-10 size-96 rounded-full border border-white/10" />
            <div className="absolute -right-10 -top-16 -z-10 size-72 rounded-full border border-white/10" />

            {/* Banner content */}
            <div className="mx-auto flex min-h-[220px] max-w-7xl items-center px-5 py-12 sm:min-h-[280px] sm:px-8 sm:py-40 lg:px-10">
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
                        Home
                    </Link>

                    <span className="text-white/50">/</span>

                    <span className="font-medium text-white">
                        {title}
                    </span>
                </nav>

                {/* Page title */}
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {title}
                </h1>

                {/* Decorative line */}
                <div className="mt-5 h-1 w-16 rounded-full bg-[#485ea8]" />
                </div>
            </div>
        </section>
    </>;
}