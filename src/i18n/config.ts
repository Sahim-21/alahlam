// src/i18n/config.ts
// Central locale configuration for Khail Alahlam Trading

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** The cookie name used to persist the active locale */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** The localStorage key used to persist the user's locale preference */
export const LOCALE_STORAGE_KEY = 'preferred_locale';

/** Locales that are RTL */
export const RTL_LOCALES: Locale[] = ['ar'];

/** Returns true when the given locale is RTL */
export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Human-readable locale labels used in the language toggle */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ar: 'ع',
};

/** Full locale names for <html lang=""> attribute */
export const localeLang: Record<Locale, string> = {
  en: 'en',
  ar: 'ar',
};
