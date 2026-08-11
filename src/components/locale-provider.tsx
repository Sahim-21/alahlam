// src/components/locale-provider.tsx
// Client-side wrapper that exposes the active locale and a switcher function
// via React context. Works alongside NextIntlClientProvider (in layout.tsx)
// to give any component read/write access to locale state.

'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  type Locale,
  locales,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  isRTL,
} from '@/i18n/config';

// ─── Context ─────────────────────────────────────────────────────────────────

interface LocaleContextValue {
  locale: Locale;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface LocaleProviderProps {
  locale: Locale;
  children: React.ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const router = useRouter();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (!(locales as readonly string[]).includes(newLocale)) return;

      // 1. Persist in localStorage for client-side access
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      } catch {
        // localStorage may not be available in all environments
      }

      // 2. Write cookie so SSR picks it up on next request
      document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // 3. Re-run server components to re-render with the new locale
      router.refresh();
    },
    [router]
  );

  return (
    <LocaleContext.Provider value={{ locale, isRtl: isRTL(locale), setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a <LocaleProvider>');
  }
  return ctx;
}
