import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_URL_LOCALE, LOCALE_COOKIE, isUrlLocale } from "@/util/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isUrlLocale(pathname.split("/")[1])) {
    return NextResponse.next();
  }

  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isUrlLocale(saved) ? saved : DEFAULT_URL_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!_next).*)",
};
