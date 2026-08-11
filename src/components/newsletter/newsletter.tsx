'use client';

// src/components/newsletter/newsletter.tsx
// A compact "Trade Updates" capture band specifically positioned for B2B buyers.
// Reuses the mailto/Gmail-redirect logic from the Enquiry form for lightweight integration.

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';

export function Newsletter() {
  const t = useTranslations('newsletter');
  const { isRtl } = useLocale();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const subject = `Trade Updates Subscription`;
    const body = `Please subscribe me to trade updates for new stock and bulk pricing.\n\nEmail: ${email}`;
    const to = 'khailalahlamtradingzllc@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
    setEmail(''); // Clear input after submission
  };

  return (
    <section className={cn("w-full bg-accent/10 py-12 border-y border-accent/20", isRtl && 'rtl')}>
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <div className={cn(
          "flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12",
          isRtl && "md:flex-row-reverse"
        )}>
          
          {/* Text Area */}
          <div className={cn("flex-1 text-center", isRtl ? "md:text-right" : "md:text-left")}>
            <h2 className={cn(
              "text-2xl font-extrabold tracking-tight text-foreground mb-2",
              isRtl ? "font-arabic-heading" : "font-heading"
            )}>
              {t('heading')}
            </h2>
            <p className={cn(
              "text-base text-muted-foreground",
              isRtl ? "font-arabic-body" : "font-body"
            )}>
              {t('subheading')}
            </p>
          </div>

          {/* Form Area */}
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row gap-3 w-full", isRtl && "sm:flex-row-reverse")}>
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={t('placeholder')}
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent",
                    error ? "border-red-500" : "border-border",
                    isRtl && "text-right font-arabic-body"
                  )}
                />
                {error && (
                  <span className={cn(
                    "absolute -bottom-5 text-[11px] text-red-500",
                    isRtl ? "right-2" : "left-2"
                  )}>
                    {t('errorRequired')}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className={cn(
                  "rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-95",
                  isRtl ? "font-arabic-heading" : "font-heading"
                )}
              >
                {t('button')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
