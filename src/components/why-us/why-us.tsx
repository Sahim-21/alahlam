'use client';

// src/components/why-us/why-us.tsx
// "Why Trade with Khail Alahlam?" trust section.
//
// Layout: 2-over-3 asymmetric feature card grid (UI/UX Pro Max recommendation)
//   Row 1: 2 wider cards — strongest USPs (logistics reach + order flexibility)
//   Row 2: 3 equal cards — supporting trust signals (verticals, pricing, fulfillment)
//
// Animation: whileInView stagger — row 1 cards first, row 2 fans out after
// Each card: large icon, bold title, description text, subtle accent line on hover
// Section background: deep navy (contrasts with the white homepage sections)

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';

// ─── Animation variants ───────────────────────────────────────────────────────

const SECTION_HEADER: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CARD: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.11,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS = {
  logistics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  verticals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  fulfillment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
} as const;

type FeatureKey = keyof typeof ICONS;

// ─── Card component ───────────────────────────────────────────────────────────

function FeatureCard({
  featureKey,
  title,
  description,
  index,
  isFeatured,
  isRtl,
  inView,
}: {
  featureKey: FeatureKey;
  title: string;
  description: string;
  index: number;
  isFeatured: boolean;
  isRtl: boolean;
  inView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={CARD}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={cn(
        // Base card styles
        'group relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 sm:p-8',
        // Border + glass effect
        'border border-white/10 bg-white/5 backdrop-blur-sm',
        // Hover lift
        'transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/30',
        // Featured card gets a touch more padding
        isFeatured && 'sm:p-10'
      )}
    >
      {/* Gold accent top-border on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-accent to-accent/0 transition-transform duration-500 group-hover:scale-x-100" />

      {/* Subtle radial glow behind icon on hover */}
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

      {/* Icon container */}
      <div
        className={cn(
          'relative flex h-14 w-14 items-center justify-center rounded-xl',
          'bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent/25'
        )}
      >
        {ICONS[featureKey]}
      </div>

      {/* Text */}
      <div className={cn('flex flex-col gap-2.5', isRtl && 'items-end text-right')}>
        <h3
          className={cn(
            'font-heading text-lg font-700 leading-snug text-white',
            isFeatured && 'text-xl',
            isRtl && 'font-arabic-heading'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed text-white/65',
            isFeatured && 'text-base',
            isRtl && 'font-arabic-body leading-loose'
          )}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  isRtl,
  inView,
}: {
  title: string;
  subtitle: string;
  isRtl: boolean;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={SECTION_HEADER}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={cn(
        'flex flex-col gap-3',
        isRtl ? 'items-end text-right' : 'items-center text-center'
      )}
    >
      {/* Label chip */}
      <span
        className={cn(
          'inline-flex items-center rounded-full border border-accent/30 bg-accent/10',
          'px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent',
          isRtl && 'font-arabic-body'
        )}
      >
        {isRtl ? 'لماذا نحن' : 'Why Choose Us'}
      </span>

      <h2
        className={cn(
          'max-w-xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl',
          isRtl && 'font-arabic-heading leading-snug'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'max-w-lg text-base text-white/60',
          isRtl && 'font-arabic-body leading-loose'
        )}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const TOP_FEATURES: FeatureKey[] = ['logistics', 'orders'];
const BOTTOM_FEATURES: FeatureKey[] = ['verticals', 'pricing', 'fulfillment'];

export function WhyUs() {
  const t = useTranslations('whyUs');
  const { isRtl } = useLocale();

  // Trigger animations when the section enters the viewport
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0F1C] py-24 sm:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* ── Background decoration ── */}
      <div aria-hidden="true">
        {/* Top-left gold radial */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #C9952A 0%, transparent 65%)' }}
        />
        {/* Bottom-right blue radial */}
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4A7CC4 0%, transparent 65%)' }}
        />
        {/* Faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* ── Header ── */}
        <SectionHeader
          title={t('sectionTitle')}
          subtitle={t('sectionSubtitle')}
          isRtl={isRtl}
          inView={inView}
        />

        {/* ── Card grid ── */}
        <div className="mt-14 flex flex-col gap-4 sm:gap-5">

          {/* Row 1: 2 featured cards — wider, more prominent */}
          <div
            className={cn(
              'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5',
              isRtl && 'direction-rtl'
            )}
          >
            {TOP_FEATURES.map((key, i) => (
              <FeatureCard
                key={key}
                featureKey={key}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                index={i}
                isFeatured
                isRtl={isRtl}
                inView={inView}
              />
            ))}
          </div>

          {/* Row 2: 3 supporting cards — stagger starts after row 1 */}
          <div
            className={cn(
              'grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5',
              isRtl && 'direction-rtl'
            )}
          >
            {BOTTOM_FEATURES.map((key, i) => (
              <FeatureCard
                key={key}
                featureKey={key}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                // Row 2 starts after row 1's delay budget (2 × 0.11s = 0.22s offset)
                index={TOP_FEATURES.length + i}
                isFeatured={false}
                isRtl={isRtl}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
