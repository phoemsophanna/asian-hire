"use client";

import { Bookmark, Clock3, MapPin, Wallet } from "lucide-react";
import Link from "@/components/LocaleLink";

const TYPE_COLOR_CLASSES = [
    "bg-blue-50 text-[#485ea8]",
    "bg-emerald-50 text-emerald-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-violet-50 text-violet-700",
    "bg-cyan-50 text-cyan-700",
    "bg-orange-50 text-orange-700",
    "bg-pink-50 text-pink-700",
];

const KNOWN_TYPE_COLORS: Record<string, string> = {
    "full-time": "bg-emerald-50 text-emerald-700",
    "part-time": "bg-cyan-50 text-cyan-700",
    "private": "bg-violet-50 text-violet-700",
    "urgent": "bg-rose-50 text-rose-700",
    "contract": "bg-amber-50 text-amber-700",
    "internship": "bg-pink-50 text-pink-700",
};

function getTypeColorClasses(title: string): string {
    const key = title.trim().toLowerCase();
    if (KNOWN_TYPE_COLORS[key]) return KNOWN_TYPE_COLORS[key];
    // Stable fallback so the same unknown type always gets the same color.
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    return TYPE_COLOR_CLASSES[hash % TYPE_COLOR_CLASSES.length];
}

export default function JobCard ({job}:any) {
    return (
        <Link href={job.link ? job.link : `/jobs/${job.id}`} target={job.link ? "_blank" : "_self"}>
            <article
                className="group rounded-2xl border border-slate-200 bg-white py-4 px-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_35px_rgba(25,63,128,0.08)] sm:px-5 sm:py-4"
                key={job.id}
            >
                
                <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                            <h3 className="font-semibold tracking-[-0.02em] text-[#172b4d] group-hover:text-[#485ea8]">
                                {job.title}
                            </h3>
                            </div>
                            <div
                                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5"
                                aria-label={`Job ID: ${job.code ?? "342311"}`}
                            >
                                <span className="text-xs font-semibold tracking-wide text-slate-700">
                                    {job.code ?? "342311"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mt-2 ${job.address || job.salary ? "" : "mb-1.5"} flex flex-wrap gap-2`}>
                    {
                        job.types.map((type: any) => (
                            <span key={type.id} className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeColorClasses(type.title_eng ?? "")}`}>
                                {type.title ?? type.title_eng}
                            </span>
                        ))
                    }
                </div>
                {
                    job.address || job.salary ? (
                        <div className="mt-4 flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                            {
                                job.address ? (
                                    <span className="inline-flex items-center gap-1 md:gap-1.5">
                                        <MapPin aria-hidden="true" className="size-3.5 text-slate-400" />
                                        {job.address}
                                    </span>
                                ) : ""
                            }
                            {
                                job.salary ? (
                                    <span className="ml-auto inline-flex items-center gap-1 md:gap-1.5">
                                        <Wallet aria-hidden="true" className="size-3.5 text-slate-400" />
                                        {job.salary}
                                    </span>
                                ) : ""
                            }
                        </div>
                    ) : ""
                }
            </article>
        </Link>
    );
}