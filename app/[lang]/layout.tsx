import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "remixicon/fonts/remixicon.css";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollPositionRestoration from "@/components/ScrollPositionRestoration";
import { Suspense } from "react";
import { URL_LOCALES, isUrlLocale } from "@/util/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Asian Hire | Find Your Next Opportunity",
  description:
    "Discover job opportunities across Australia and Cambodia. Connect with trusted employers and take your career further with Asian Hire.",
  openGraph: {
    siteName: "Asian Hire",
    type: "website",
    images: [{ url: "/images/logo_en.png", alt: "Asian Hire" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/logo_en.png"],
  },
};

export function generateStaticParams() {
  return URL_LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isUrlLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
        <Script src="https://www.googletagmanager.com/gtm.js?id=GTM-5WMV45MM" strategy="afterInteractive" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider urlLocale={lang}>
          <ScrollPositionRestoration />
          <Suspense>
            <Header />
          </Suspense>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
