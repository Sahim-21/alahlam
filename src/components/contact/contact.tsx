'use client';

// src/components/contact/contact.tsx
// Contact Section. Simple contact information block.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';

export function Contact() {
  const t = useTranslations('contact');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={sectionRef} className={cn("w-full bg-background py-24 sm:py-32", isRtl && 'rtl')}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-12 flex flex-col gap-4 text-center", isRtl && "items-end text-right")}
        >
          <h2 className={cn("text-3xl font-extrabold tracking-tight sm:text-4xl", isRtl ? "font-arabic-heading" : "font-heading")}>
            {t('sectionTitle')}
          </h2>
          <p className={cn("text-lg text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn("grid gap-6 md:grid-cols-2", isRtl && "direction-rtl md:grid-cols-2")}
        >
          {/* Email Card */}
          <a
            href={`mailto:${t('emailValue')}`}
            className={cn(
              "group flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:border-accent/50 hover:shadow-md",
              isRtl && "items-end text-right"
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <h3 className={cn("mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground", isRtl && "font-arabic-heading")}>
                {t('emailLabel')}
              </h3>
              <p className={cn("text-lg font-medium", isRtl ? "font-arabic-body" : "font-body")}>
                {t('emailValue')}
              </p>
            </div>
          </a>

          {/* Phone / WhatsApp Card */}
          <div
            className={cn(
              "flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm opacity-80",
              isRtl && "items-end text-right"
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <h3 className={cn("mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground", isRtl && "font-arabic-heading")}>
                {t('phoneLabel')}
              </h3>
              <p className={cn("text-lg font-medium text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
                {t('phoneValue')}
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
