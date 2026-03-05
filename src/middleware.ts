import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // /ko or /ko/... → redirect to / or /... (canonical URL)
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${defaultLocale}`, '') || '/';
    return NextResponse.redirect(url);
  }

  // Non-default locale (/en, /ja, etc.) → pass through
  const hasLocale = locales.some(
    (l) => l !== defaultLocale && (pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  );
  if (hasLocale) return NextResponse.next();

  // No locale prefix → rewrite to /ko/... (URL stays clean)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|.*\\..*).*)"],
};
