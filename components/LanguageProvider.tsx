"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { ContactPageContent } from "@/services/contact-service";
import type { GeneralSettings, MenuRow } from "@/services/site-service";
import { rememberScrollForLocaleSwitch } from "@/components/ScrollPositionRestoration";
import {
  LOCALE_COOKIE,
  localizePath,
  stripUrlLocale,
  toLocaleCode,
  toUrlLocale,
  type LocaleCode,
  type UrlLocale,
} from "@/util/i18n";

export type SiteData = {
  translations: Record<string, string>;
  general: GeneralSettings | null;
  menus: MenuRow[] | null;
  contact: ContactPageContent | null;
};

type LanguageContextValue = SiteData & {
  locale: LocaleCode;
  urlLocale: UrlLocale;
  setLocale: (locale: LocaleCode) => void;
  localizeHref: (href: string) => string;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Site-wide data (translations, logos, menus, contact) is loaded once on the server
// by the layout, so shared components render complete on the first paint.
export function LanguageProvider({
  children,
  urlLocale,
  siteData,
}: {
  children: ReactNode;
  urlLocale: UrlLocale;
  siteData: SiteData;
}) {
  const locale = toLocaleCode(urlLocale);
  const router = useRouter();
  const { translations, general, menus, contact } = siteData;

  const setLocale = useCallback(
    (next: LocaleCode) => {
      const nextUrlLocale = toUrlLocale(next);
      document.cookie = `${LOCALE_COOKIE}=${nextUrlLocale}; path=/; max-age=31536000; samesite=lax`;
      rememberScrollForLocaleSwitch();
      const pathname = window.location.pathname;
      const target = localizePath(stripUrlLocale(pathname), nextUrlLocale);
      router.push(`${target}${window.location.search}${window.location.hash}`);
    },
    [router],
  );

  const localizeHref = useCallback(
    (href: string) => localizePath(href, urlLocale),
    [urlLocale],
  );

  const t = useCallback((key: string) => translations[key] ?? key, [translations]);

  const value = useMemo(
    () => ({ locale, urlLocale, setLocale, localizeHref, t, translations, general, menus, contact }),
    [locale, urlLocale, setLocale, localizeHref, t, translations, general, menus, contact],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
