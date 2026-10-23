"use client";

import { useState } from "react";
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
import PageBanner from "../PageBanner";
import { Reveal } from "@/util/animations";

const MAIN_COLOR = "#485ea8";

const ADDRESS =
  "Borey Piphup Thmey Chamkar Doung, No. 53B, St. 7, Sangkat Prey Sa, Khan Dangkao, Phnom Penh, Cambodia 120504";

const MAP_QUERY = encodeURIComponent(ADDRESS);

export default function ContactUs() {
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
        <PageBanner title="Contact Us" />
        <section id="contact" className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal direction="zoom">
                <div className="mb-8 rounded-3xl border border-[#485ea8]/15 bg-gradient-to-br from-[#485ea8]/[0.07] via-white to-white px-4 py-3 sm:px-6 sm:py-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                            Need a consultation?
                        </h2>
                        <div className="mx-auto mt-2 max-w-3xl space-y-1 text-sm leading-5 text-slate-600 sm:text-[15px] sm:leading-6">
                            <p>
                                Start your Australian visa application journey with a consultation from one of our experienced career and visa counsellors.
                            </p>
                            <p>
                                Call us to arrange a face-to-face, Skype, or teleconference consultation. We provide culturally sensitive and confidential support.
                            </p>
                            <p>
                                Our team is happy to help you access Australian job opportunities with top Australian employers looking to hire.
                            </p>
                            <p>
                                Want to keep up to date with Australian jobs and immigration changes? Like and follow us on Facebook.
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
            {/* Contact details and form */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                {/* Contact information */}
                <Reveal direction="left">
                    <div className="relative overflow-hidden rounded-3xl bg-[#485ea8] p-6 text-white shadow-xl shadow-[#485ea8]/15 sm:p-8 lg:p-9">
                        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />

                        <div className="relative">
                        <div className="mb-8">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                            <MessageCircle size={23} />
                            </div>

                            <h3 className="text-2xl font-bold sm:text-3xl">
                            Contact information
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-white/75">
                            We&apos;d love to hear from you. Get in touch with our team.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* Address */}
                            <a
                            href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:border-white/25 hover:bg-white/[0.13]"
                            >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <MapPin size={21} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                Our address
                                </p>

                                <p className="mt-2 text-sm leading-6 text-white">
                                {ADDRESS}
                                </p>

                                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90">
                                Get directions
                                <ArrowUpRight size={13} />
                                </span>
                            </div>
                            </a>

                            {/* Phone */}
                            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <Phone size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                Phone number
                                </p>

                                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold">
                                <a
                                    href="tel:+85517824919"
                                    className="hover:text-white/75"
                                >
                                    017 824 919
                                </a>

                                <span className="text-white/40">|</span>

                                <a
                                    href="tel:+85598391456"
                                    className="hover:text-white/75"
                                >
                                    098 391 456
                                </a>
                                </div>

                                <p className="mt-2 text-xs text-white/65">
                                Call us for assistance
                                </p>
                            </div>
                            </div>

                            {/* Email */}
                            <a
                            href="mailto:info@ibaby.care"
                            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:border-white/25 hover:bg-white/[0.13]"
                            >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <Mail size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                                Email address
                                </p>

                                <p className="mt-2 break-all text-sm font-semibold">
                                info@asianhire.com.kh
                                </p>

                                <p className="mt-2 text-xs text-white/65">
                                Send us your questions anytime
                                </p>
                            </div>
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                            <Clock size={17} className="shrink-0 text-white/75" />
                            <p className="text-xs leading-5 text-white/75">
                            We&apos;re happy to assist with your inquiries.
                            </p>
                        </div>
                        </div>
                    </div>
                </Reveal>

                {/* Contact form */}
                <Reveal direction="right">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-9">
                        <div className="mb-7">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                Let&apos;s start a{" "} conversation.
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                                Have a question or need assistance? Our team is here to help.
                                Contact us using your preferred method or send us a message below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                            <label
                                htmlFor="contact-name"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Your name <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="contact-name"
                                type="text"
                                autoComplete="name"
                                required
                                value={form.name}
                                onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                                }
                                placeholder="Enter your name"
                                className="w-full rounded-xl border border-slate-200 bg-[#f9fafb] px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#485ea8] focus:bg-white focus:ring-4 focus:ring-[#485ea8]/10"
                            />
                            </div>

                            <div>
                            <label
                                htmlFor="contact-email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email address <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="contact-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={form.email}
                                onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                                }
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-slate-200 bg-[#f9fafb] px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#485ea8] focus:bg-white focus:ring-4 focus:ring-[#485ea8]/10"
                            />
                            </div>
                        </div>

                        <div>
                            <label
                            htmlFor="contact-subject"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                            Subject
                            </label>

                            <input
                            id="contact-subject"
                            type="text"
                            value={form.subject}
                            onChange={(e) =>
                                setForm({ ...form, subject: e.target.value })
                            }
                            placeholder="How can we help you?"
                            className="w-full rounded-xl border border-slate-200 bg-[#f9fafb] px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#485ea8] focus:bg-white focus:ring-4 focus:ring-[#485ea8]/10"
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="contact-message"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                            Your message <span className="text-red-500">*</span>
                            </label>

                            <textarea
                            id="contact-message"
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                            placeholder="Tell us how we can help..."
                            className="w-full resize-y rounded-xl border border-slate-200 bg-[#f9fafb] px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#485ea8] focus:bg-white focus:ring-4 focus:ring-[#485ea8]/10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#485ea8] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#485ea8]/20 transition hover:-translate-y-0.5 hover:bg-[#073da5] focus:outline-none focus:ring-4 focus:ring-[#485ea8]/20 sm:w-auto"
                        >
                            Send message
                            <Send
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                            />
                        </button>

                        <p className="text-xs leading-5 text-slate-400">
                            Your email application will open with your message prepared.
                        </p>
                        </form>
                    </div>
                </Reveal>
            </div>

            {/* Google Maps */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:mt-10 sm:p-3">
            <Reveal direction="zoom">
                <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#485ea8]/[0.08] text-[#485ea8]">
                        <MapPinned size={22} />
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900">
                        Find us on the map
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                        {ADDRESS}
                        </p>
                    </div>
                    </div>

                    <a
                        href={`https://maps.app.goo.gl/Z3C7wDMuNRnVfwbe8`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#485ea8] transition hover:border-[#485ea8]/30 hover:bg-[#485ea8]/[0.04]"
                    >
                        Open Google Maps
                        <ArrowUpRight size={16} />
                    </a>
                </div>
                <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <iframe
                    title="iBaby office location in Phnom Penh, Cambodia"
                    src={`https://maps.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7819.119885426901!2d104.878883!3d11.511634!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDMwJzQxLjkiTiAxMDTCsDUyJzQ0LjAiRQ!5e0!3m2!1sen!2sus!4v1792641203122!5m2!1sen!2sus`}
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
        </div>
        </section>
    </>
  );
}