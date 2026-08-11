'use client';

// src/components/contact/contact.tsx
// Contact Section. Simple contact information block.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { SiteImages } from '@/lib/images';
import { cn } from '@/lib/utils';

export function Contact() {
  const t = useTranslations('contact');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={sectionRef} className={cn("relative w-full bg-background py-24 sm:py-32", isRtl && 'rtl')}>
      {/* ── Background Imagery ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.23] md:opacity-[0.25]"
          style={{ backgroundImage: `url(${SiteImages.collage[3]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <motion.div
          initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(6px)', y: 12 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("max-w-xl mx-auto", isRtl && "direction-rtl")}
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
        </motion.div>
      </div>
    </section>
  );
}
