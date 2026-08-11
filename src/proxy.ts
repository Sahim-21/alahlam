// src/proxy.ts  (Next.js 16 — replaces the old middleware.ts convention)
// Reads the NEXT_LOCALE cookie and injects the locale into a custom header
// so server components can read it during SSR. Falls back to 'en'.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALE_COOKIE, locales, defaultLocale } from './i18n/config';

export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  // Forward the resolved locale as a header so layout.tsx can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-locale', locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
