"use client";

import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Send,
  Clock,
  MessageCircle,
  MapPinned,
  PhoneCall,
} from "lucide-react";
import { useEffect, useState } from "react";
import PageBanner from "../PageBanner";
import { Reveal } from "@/util/animations";
import { FaHeadset } from "react-icons/fa";
import type { ContactPageContent } from "@/services/contact-service";
import { createTranslator, fetchTranslations } from "@/services/translation-service";

const MAIN_COLOR = "#485ea8";

export default function ContactUs({
  content,
  lang,
}: {
  content: ContactPageContent;
  lang: "en" | "km";
}) {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;
    fetchTranslations(lang === "km" ? "km" : "eng").then((data) => {
      if (active) setTranslations(data);
    });
    return () => {
      active = false;
    };
  }, [lang]);

  const { consultation, contact } = content;
  const mapQuery = encodeURIComponent(contact.address);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      form.subject || "Website inquiry"
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    window.location.href = `mailto:info@ibaby.care?subject=${subject}&body=${body}`;
  };

  return (
    <>
        <PageBanner title="Contact Us" image={content.banner} />
        <section id="contact" className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* Contact details and form */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] overflow-hidden">
                {/* Contact information */}
                <Reveal direction="left">
                    {consultation.title || consultation.description ? (
                    <div className="mb-4 rounded-3xl border border-[#485ea8]/15 bg-gradient-to-br from-[#485ea8]/[0.07] via-white to-white px-4 py-3 sm:px-6 sm:py-4">
                        <div className="mx-auto text-start">
                            {consultation.title && (
                            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                                {consultation.title}
                            </h2>
                            )}
                            {consultation.description && (
                            <div
                                className="mx-auto mt-2 max-w-3xl space-y-1 text-sm leading-5 text-slate-600 sm:text-[15px] sm:leading-6 [&_p]:mb-3 [&_p:last-child]:mb-0"
                                dangerouslySetInnerHTML={{ __html: consultation.description }}
                            />
                            )}
                        </div>
                    </div>
                    ) : null}
                    
                    {consultation.image && (
                    <div className="group relative mx-auto w-full">
                        {/* Image container */}
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-50 to-indigo-50 shadow-md shadow-[#485ea8]/10">
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-white">
                            <img
                                src={consultation.image}
                                alt={consultation.title || "Asian Hire recruitment support team"}
                                loading="lazy"
                                className="h-auto w-full object-cover h-[100px] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />

                            {/* Bottom gradient */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#485ea8]/10 to-transparent" />
                            </div>
                        </div>
                    </div>
                    )}
                </Reveal>

                {/* Contact form */}
                <Reveal direction="right">
                    <div className="relative overflow-hidden rounded-3xl bg-[#485ea8] p-6 text-white shadow-xl shadow-[#485ea8]/15 sm:p-8 lg:p-9">
                        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />

                        <div className="relative">
                        {(contact.title || contact.summary) && (
                        <div className="mb-8">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                            <MessageCircle size={23} />
                            </div>

                            {contact.title && (
                            <h3 className="text-2xl font-bold sm:text-3xl">
                            {contact.title}
                            </h3>
                            )}

                            {contact.summary && (
                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/75">
                            {contact.summary}
                            </p>
                            )}
                        </div>
                        )}

                        <div className="space-y-3">
                            {/* Address */}
                            {contact.address && (
                            <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:border-white/25 hover:bg-white/[0.13]"
                            >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <MapPin size={21} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                    {t("Our address")}
                                </p>

                                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white">
                                {contact.address}
                                </p>

                                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90">
                                {t("Get directions")}
                                <ArrowUpRight size={13} />
                                </span>
                            </div>
                            </a>
                            )}

                            {/* Phone */}
                            {contact.phones.length > 0 && (
                            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <Phone size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                {t("Phone number")}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold">
                                {contact.phones.map((phone, index) => (
                                <span key={phone} className="contents">
                                    {index > 0 && <span className="text-white/40">|</span>}
                                    <a
                                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                        className="hover:text-white/75"
                                    >
                                        {phone}
                                    </a>
                                </span>
                                ))}
                                </div>

                                <p className="mt-2 text-xs text-white/65">
                                {t("Call us for assistance")}
                                </p>
                            </div>
                            </div>
                            )}

                            {/* Email */}
                            {contact.emails.map((email) => (
                            <a
                            key={email}
                            href={`mailto:${email}`}
                            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:border-white/25 hover:bg-white/[0.13]"
                            >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <Mail size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                {t("Email address")}
                                </p>

                                <p className="mt-2 break-all text-sm font-semibold">
                                {email}
                                </p>

                                <p className="mt-2 text-xs text-white/65">
                                {t("Send us your questions anytime")}
                                </p>
                            </div>
                            </a>
                            ))}
                        </div>


                        <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                            <Clock size={17} className="shrink-0 text-white/75" />
                            <p className="text-xs leading-5 text-white/75">
                            {t("We're happy to assist with your inquiries.")}
                            </p>
                        </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Google Maps */}
            {contact.map_embed && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:mt-10 sm:p-3">
            <Reveal direction="zoom">
                <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#485ea8]/[0.08] text-[#485ea8]">
                        <MapPinned size={22} />
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900">
                        {t("Find us on the map")}
                        </h3>
                        {contact.address && (
                        <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-500">
                        {contact.address}
                        </p>
                        )}
                    </div>
                    </div>

                    {contact.address && (
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#485ea8] transition hover:border-[#485ea8]/30 hover:bg-[#485ea8]/[0.04]"
                    >
                        {t("Open Google Maps")}
                        <ArrowUpRight size={16} />
                    </a>
                    )}
                </div>
                <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <iframe
                    title={contact.title || "Office location map"}
                    src={contact.map_embed}
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="block w-full"
                    />
                </div>
            </Reveal>
            </div>
            )}
        </div>
        </section>
    </>
  );
}