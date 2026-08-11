// src/app/layout.tsx
// Root layout for Khail Alahlam Trading.
// Wires together: Google Fonts (4 typefaces), next-themes, next-intl,
// RTL/LTR direction switching, and the locale context provider.

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { EnquiryProvider } from "@/contexts/enquiry-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { isRTL, localeLang, type Locale } from "@/i18n/config";
import "./globals.css";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Khail Alahlam Trading | UAE B2B Trading Company",
    template: "%s | Khail Alahlam Trading",
  },
  description:
    "Khail Alahlam Trading — a trusted UAE-based B2B trading company specialising in commodities, industrial goods, and consumer products across the GCC and beyond.",
  keywords: ["UAE trading", "B2B", "commodities", "Dubai", "GCC", "import export"],
  authors: [{ name: "Khail Alahlam Trading" }],
  metadataBase: new URL("https://khailalahlam.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Khail Alahlam Trading",
  },
};

// ─── Layout ──────────────────────────────────────────────────────────────────

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Locale is resolved server-side from the NEXT_LOCALE cookie via request.ts
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();

  const dir = isRTL(locale) ? "rtl" : "ltr";
  const lang = localeLang[locale];

  return (
    <html
      lang={lang}
      dir={dir}
      // Font CSS variables + antialiasing
      className={`${fontVariables} h-full`}
      // Suppress hydration mismatch from next-themes injecting class
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* ── next-themes: class-based dark mode ── */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* ── next-intl: SSR-safe message provider ── */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* ── Locale context: gives components setLocale() access ── */}
            <LocaleProvider locale={locale}>
              <EnquiryProvider>
                {/* ── Sticky Navbar ── */}
                <Navbar />
                
                {/* ── Route Transitions & Reduced Motion Provider ── */}
                <PageTransition>
                  {children}
                </PageTransition>
                
                {/* ── Site Footer ── */}
                <Footer />
              </EnquiryProvider>
            </LocaleProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
