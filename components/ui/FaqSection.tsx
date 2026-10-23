"use client";
import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaEnvelope } from "react-icons/fa";

const mailTo = `mailto:recruitment@asianhire.com?subject=${encodeURIComponent(
  "Resume Submission - [Your Occupation]",
)}&body=${encodeURIComponent(
  "Dear Asian Hire Recruitment Team,\n\nPlease find my resume attached for your consideration.\n\nMy occupation: [Your Occupation]\nMy name: [Your Name]\nMy contact number: [Your Phone Number]\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]",
)}`;

export default function FaqSection ({faqs, title, description}:any) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return <>
        <section className="bg-[#f7f9fc] px-5 py-10 sm:py-16 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                        Need to know more?
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10264b] sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        {description}
                    </p>

                    <div className="mt-7 rounded-2xl border border-blue-100 bg-white p-5">
                        <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8]">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="font-bold text-[#10264b]">
                                    Still have questions?
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    Contact our recruitment team for further assistance.
                                </p>
                                <a
                                    href={mailTo}
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#485ea8] hover:underline"
                                >
                                    Email our team <FaArrowRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq:any, index:any) => {
                        const isOpen = openFaq === index;
                        const panelId = `job-seeker-faq-${index}`;

                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border bg-white transition ${
                                    isOpen
                                    ? "border-blue-200 shadow-lg shadow-blue-900/[0.04]"
                                    : "border-slate-200/80 hover:border-slate-300"
                                }`}
                            >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpenFaq(isOpen ? null : index)}
                                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                            >
                                <span className="font-bold leading-6 text-[#10264b]">
                                    {faq.question}
                                </span>
                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                                        isOpen
                                        ? "rotate-180 bg-blue-50 text-[#485ea8]"
                                        : "bg-slate-100 text-slate-500"
                                    }`}
                                >
                                    <FaChevronDown className="text-xs" />
                                </span>
                            </button>

                            {isOpen && (
                                <div
                                    id={panelId}
                                    className="px-5 pb-5 sm:px-6 sm:pb-6"
                                >
                                    <div className="border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                                        {faq.answer}
                                    </div>
                                </div>
                            )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    </>;
}