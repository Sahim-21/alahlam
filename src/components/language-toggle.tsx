// src/components/language-toggle.tsx
// EN | ع language switcher button.
// Reads current locale from LocaleContext, animates between labels,
// and persists the choice via cookie + localStorage.

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from './locale-provider';
import { locales, localeLabels, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  /** Optional extra Tailwind classes for the container */
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5',
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((loc: Locale) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            aria-pressed={isActive}
            aria-label={loc === 'ar' ? 'Switch to Arabic' : 'Switch to English'}
            className={cn(
              'relative rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              // Use Arabic heading font for the Arabic label
              loc === 'ar' ? 'font-arabic-heading' : 'font-heading',
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {/* Animated pill background */}
            {isActive && (
              <motion.span
                layoutId="lang-toggle-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Label with animated swap */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${loc}-${isActive}`}
                className="relative z-10 block"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {localeLabels[loc]}
              </motion.span>
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
