'use client';

// src/components/why-us/why-us.tsx
// "Why Choose Us" section — 5 trust points in a bold, scannable grid.

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { SiteImages } from '@/lib/images';
import { cn } from '@/lib/utils';

const CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const CARD: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const POINTS = [
  {
    key: 'logistics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    key: 'orders',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    key: 'pricing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    key: 'fulfillment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    key: 'verticals',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
] as const;

export function WhyUs() {
  const t = useTranslations('whyUs');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className={cn('relative w-full bg-card py-24 sm:py-32 border-y border-border', isRtl && 'rtl')}
    >
      {/* ── Background Imagery ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.23] md:opacity-[0.25]"
          style={{ backgroundImage: `url(${SiteImages.collage[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card via-transparent to-card" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={cn('mb-16 flex flex-col gap-3', isRtl ? 'items-end text-right' : 'items-center text-center')}
        >
          <span className={cn(
            'inline-flex rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent',
            isRtl && 'font-arabic-body'
          )}>
            {t('sectionTag')}
          </span>
          <h2 className={cn(
            'text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl',
            isRtl ? 'font-arabic-heading' : 'font-heading'
          )}>
            {t('sectionTitle')}
          </h2>
          <p className={cn('max-w-2xl text-lg text-muted-foreground', isRtl ? 'font-arabic-body' : 'font-body')}>
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Trust-point cards */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {POINTS.map((point, idx) => (
            <motion.div
              key={point.key}
              variants={CARD}
              className={cn(
                'group relative flex flex-col gap-4 rounded-2xl border border-border bg-background p-7',
                'hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300',
                // Last card spans 2 cols on large screens (5 cards in a 3-col grid)
                idx === 4 && 'lg:col-span-1',
                isRtl ? 'items-end text-right' : 'items-start text-left'
              )}
            >
              {/* Number badge */}
              <span className="absolute top-5 right-5 text-5xl font-extrabold text-border/70 leading-none select-none transition-colors group-hover:text-accent/20">
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground z-10">
                {point.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 z-10">
                <h3 className={cn(
                  'text-base font-bold',
                  isRtl ? 'font-arabic-heading' : 'font-heading'
                )}>
                  {t(`points.${point.key}.title`)}
                </h3>
                <p className={cn(
                  'text-sm text-muted-foreground leading-relaxed',
                  isRtl ? 'font-arabic-body' : 'font-body'
                )}>
                  {t(`points.${point.key}.body`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
