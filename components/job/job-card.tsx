import { Bookmark, Clock3, MapPin, Wallet } from "lucide-react";
import Link from "next/link";

export default function JobCard ({job}:any) {
    return (
        <article
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_35px_rgba(25,63,128,0.08)] sm:p-6"
            key={job.title}
        >
            <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                        <h3 className="font-semibold tracking-[-0.02em] text-[#172b4d] group-hover:text-[#485ea8]">
                            <Link href={`/jobs/${job.code}`}>{job.title}</Link>
                        </h3>
                        </div>
                        <div
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5"
                        aria-label={`Job ID: ${job.code ?? "342311"}`}
                        >
                        <span className="text-xs font-medium text-slate-400">
                            ID
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-wide text-slate-700">
                            {job.code ?? "342311"}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#485ea8]">
                    {job.type}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Private
                </span>
                {job.category === "Urgent" && (
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                        Urgent
                    </span>
                )}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="size-3.5 text-slate-400" />
                    {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Wallet aria-hidden="true" className="size-3.5 text-slate-400" />
                    {job.salary}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 w-full md:w-auto">
                    <Clock3 aria-hidden="true" className="size-3.5 text-slate-400" />
                    {job.posted}
                </span>
            </div>
        </article>
    );
}