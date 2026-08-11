'use client';

// src/components/products/products.tsx
// Products section — 4 trading divisions presented as bold, visual cards.
// Each card has an icon, title, description, and a sub-category list.

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { useEnquiry } from '@/contexts/enquiry-context';
import { SiteImages } from '@/lib/images';
import { cn } from '@/lib/utils';

const CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const CARD: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ── Division metadata ─────────────────────────────────────────────────────────
const DIVISIONS = [
  {
    key: 'autoSpare',
    contextKey: 'autoSpare',
    subCategories: ['Engine Parts', 'Filters & Lubricants', 'Tyres & Accessories'],
    accentClass: 'from-blue-900/60 to-blue-700/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    key: 'general',
    contextKey: 'general',
    subCategories: ['Apparel & Textiles', 'General Merchandise', 'Bulk Wholesale'],
    accentClass: 'from-amber-900/60 to-amber-700/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
      </svg>
    ),
  },
  {
    key: 'energy',
    contextKey: 'energy',
    subCategories: ['Wholesale Pallets', 'Private Label', 'GCC Distribution'],
    accentClass: 'from-yellow-900/60 to-yellow-600/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    key: 'foodstuffs',
    contextKey: 'foodstuffs',
    subCategories: ['Packaged Foods', 'Beverages', 'Bulk Supply'],
    accentClass: 'from-green-900/60 to-green-700/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
] as const;

export function Products() {
  const t = useTranslations('products');
  const { isRtl } = useLocale();
  const { setSelectedDivision } = useEnquiry();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleEnquire = (key: string) => {
    setSelectedDivision(key as any);
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className={cn('relative w-full bg-background py-24 sm:py-32', isRtl && 'rtl')}
    >
      {/* ── Background Imagery ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.23] md:opacity-[0.25]"
          style={{ backgroundImage: `url(${SiteImages.collage[2]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
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

        {/* Division Cards */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DIVISIONS.map((div) => (
            <motion.div
              key={div.key}
              variants={CARD}
              onClick={() => handleEnquire(div.contextKey)}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card cursor-pointer',
                'shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                isRtl ? 'items-end text-right' : 'items-start text-left'
              )}
            >
              {/* Gradient accent top bar */}
              <div className={cn('h-1.5 w-full bg-gradient-to-r', div.accentClass.replace('/60', '').replace('/30', ''))} />

              {/* Content */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  {div.icon}
                </div>

                {/* Title */}
                <h3 className={cn(
                  'text-lg font-bold leading-snug',
                  isRtl ? 'font-arabic-heading' : 'font-heading'
                )}>
                  {t(`divisions.${div.key}.title`)}
                </h3>

                {/* Description */}
                <p className={cn(
                  'text-sm text-muted-foreground leading-relaxed flex-1',
                  isRtl ? 'font-arabic-body' : 'font-body'
                )}>
                  {t(`divisions.${div.key}.description`)}
                </p>

                {/* Sub-category tags */}
                <div className={cn('flex flex-wrap gap-2', isRtl && 'justify-end')}>
                  {div.subCategories.map((sub) => (
                    <span
                      key={sub}
                      className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA footer */}
              <div className={cn(
                'flex items-center gap-2 border-t border-border px-6 py-4 text-sm font-semibold text-accent',
                'transition-colors group-hover:text-accent/80',
                isRtl ? 'flex-row-reverse font-arabic-heading' : 'font-heading'
              )}>
                {t('enquireCta')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className={cn('h-4 w-4 transition-transform group-hover:translate-x-0.5', isRtl && 'rotate-180')}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
