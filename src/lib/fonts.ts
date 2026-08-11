// src/lib/fonts.ts
// All Google Fonts for Khail Alahlam Trading.
// ─────────────────────────────────────────────
// Latin stack: Manrope (headings) + Inter (body)
// Arabic stack: Cairo (headings) + Noto Kufi Arabic (body)
//
// Fonts are loaded server-side via next/font/google for zero layout shift.
// The CSS variable names are consumed in globals.css via @theme inline.

import {
  Manrope,
  Inter,
  Cairo,
  Noto_Kufi_Arabic,
} from 'next/font/google';

// ── Latin Heading: Manrope ──────────────────────────────────────────────────
export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

// ── Latin Body: Inter ───────────────────────────────────────────────────────
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// ── Arabic Heading: Cairo ───────────────────────────────────────────────────
export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-arabic-heading',
  display: 'swap',
});

// ── Arabic Body: Noto Kufi Arabic ───────────────────────────────────────────
export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-arabic-body',
  display: 'swap',
});

/**
 * Returns a string of all font className variables to be spread onto <html>.
 * Usage: <html className={fontVariables}>
 */
export const fontVariables = [
  manrope.variable,
  inter.variable,
  cairo.variable,
  notoKufiArabic.variable,
].join(' ');
