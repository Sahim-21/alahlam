'use client';

// src/components/hero/hero.tsx
// Large hero section for Khail Alahlam Trading.
//
// Layout:
//   • Full-viewport-height section with a layered gradient background
//   • Badge pill (location) → large headline → subtext → two CTAs → 3 stat counters
//   • Staggered fade-up entrance via Framer Motion (each child delayed)
//   • Bilingual: pulls copy from next-intl, respects RTL layout via useLocale
//   • Verticals strip: four icon+label chips for the four trade categories
//   • Parallax scroll overlay using useScroll + useTransform

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import { CountUp } from '@/components/ui/count-up';
import { MagneticButton } from '@/components/ui/magnetic-button';

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const CHIP_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.8, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

// ─── Trade verticals ──────────────────────────────────────────────────────────

const VERTICALS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
        <path d="M5 3L3 5" strokeLinecap="round" />
        <path d="M19 3l2 2" strokeLinecap="round" />
        <path d="M7 17l-2 2" strokeLinecap="round" />
        <path d="M17 17l2 2" strokeLinecap="round" />
      </svg>
    ),
    labelEn: 'Auto Spare Parts',
    labelAr: 'قطع غيار السيارات',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    labelEn: 'General Trading',
    labelAr: 'التجارة العامة',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
    labelEn: 'Energy Drinks',
    labelAr: 'مشروبات الطاقة',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    labelEn: 'Foodstuffs & Beverages',
    labelAr: 'المواد الغذائية والمشروبات',
  },
];

// ─── Stat item (now uses CountUp for number animation) ───────────────────────

function StatItem({
  numericValue,
  suffix,
  label,
  isRtl,
}: {
  numericValue: number;
  suffix: string;
  label: string;
  isRtl: boolean;
}) {
  return (
    <div className={cn('flex flex-col', isRtl ? 'items-end' : 'items-start')}>
      <CountUp
        to={numericValue}
        suffix={suffix}
        duration={1800}
        className="font-heading text-3xl font-extrabold text-accent tabular-nums sm:text-4xl"
      />
      <span className="mt-0.5 text-sm font-medium text-foreground/60">{label}</span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const t = useTranslations('hero');
  const { isRtl, locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax on the background gradient
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor spotlight — tracks pointer position within the hero only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(201,149,42,0.12) 0%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden',
        isRtl && 'rtl'
      )}
      aria-label="Hero"
    >
      {/* Cursor spotlight layer */}
      <motion.div
        className="spotlight-overlay"
        style={{ background: spotlight }}
        aria-hidden="true"
      />
      {/* ── Layered gradient background ─────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        {/* Base: Background Video & Fallbacks */}
        <video 
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay to ensure text readability on the left and match theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2044]/95 via-[#0D1A38]/75 to-transparent" />

        {/* Gold accent radial — top-right */}
        <div
          className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #C9952A 0%, transparent 70%)',
          }}
        />

        {/* Secondary glow — bottom-left */}
        <div
          className="absolute -bottom-40 -left-24 h-[500px] w-[500px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, #4A7CC4 0%, transparent 70%)',
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Bottom fade to page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl px-5 py-28 sm:px-8 sm:py-36 lg:px-10"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          animate="show"
          className={cn(
            'flex flex-col gap-6',
            isRtl ? 'items-end text-right' : 'items-start text-left'
          )}
        >
          {/* ── Credibility Chip (Trails the main stagger) ── */}
          <motion.div variants={CHIP_ITEM}>
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/20',
                'bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest',
                'text-white/80 backdrop-blur-sm',
                isRtl ? 'font-arabic-body flex-row-reverse' : 'uppercase'
              )}
            >
              {/* Star/Credibility icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 shrink-0 text-accent"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {locale === 'en' ? '4 Trading Divisions · RAK Free Zone' : '٤ أقسام تجارية · منطقة رأس الخيمة الحرة'}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            variants={ITEM}
            className={cn(
              'max-w-3xl font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white',
              'sm:text-5xl lg:text-6xl',
              isRtl && 'font-arabic-heading text-right leading-[1.3]'
            )}
          >
            {/* Gold highlight on key phrase */}
            {locale === 'en' ? (
              <>
                Your Trusted{' '}
                <span className="text-gradient-gold">Trading Partner</span>
                {' '}Across the UAE {'&'} Beyond
              </>
            ) : (
              <>
                <span className="text-gradient-gold">شريككم التجاري الموثوق</span>
                {' '}داخل الإمارات وخارجها
              </>
            )}
          </motion.h1>

          {/* ── Subheading ── */}
          <motion.p
            variants={ITEM}
            className={cn(
              'max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg',
              isRtl && 'font-arabic-body text-right leading-loose'
            )}
          >
            {t('subheading')}
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={ITEM}
            className={cn(
              'flex flex-wrap gap-4 pt-2',
              isRtl ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Primary CTA — gold, wrapped in MagneticButton */}
            <MagneticButton strength={12}>
              <button
                onClick={() => handleScroll('enquiry')}
                className={cn(
                  'group relative inline-flex items-center gap-2 overflow-hidden rounded-full',
                  'bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground',
                  'shadow-lg shadow-accent/30 transition-all duration-300',
                  'hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.03]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                  isRtl && 'font-arabic-heading flex-row-reverse'
                )}
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative">{t('cta.primary')}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn('relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5', isRtl && 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0')}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </MagneticButton>

            {/* Secondary CTA — ghost */}
            <button
              onClick={() => handleScroll('capabilities')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/30',
                'px-8 py-3.5 text-sm font-semibold text-white/90',
                'backdrop-blur-sm transition-all duration-300',
                'hover:border-white/60 hover:bg-white/10 hover:text-white hover:scale-[1.03]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                isRtl && 'font-arabic-heading flex-row-reverse'
              )}
            >
              {t('cta.secondary')}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn('h-4 w-4', isRtl && 'rotate-180')}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* ── Trade verticals strip ── */}
          <motion.div
            variants={ITEM}
            className={cn(
              'mt-4 flex flex-wrap gap-3',
              isRtl ? 'flex-row-reverse justify-end' : 'justify-start'
            )}
          >
            {VERTICALS.map((v) => (
              <span
                key={v.labelEn}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl border border-white/10',
                  'bg-white/5 px-3.5 py-2 text-xs font-medium text-white/75',
                  'backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white/95',
                  isRtl && 'flex-row-reverse font-arabic-body'
                )}
              >
                <span className="text-accent">{v.icon}</span>
                {isRtl ? v.labelAr : v.labelEn}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Stats row ────────────────────────────────────────────────────── */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          animate="show"
          className={cn(
            'mt-16 flex flex-wrap gap-x-10 gap-y-6',
            isRtl ? 'flex-row-reverse justify-end' : 'justify-start'
          )}
        >
          {/* Divider line */}
          <motion.div
            variants={FADE_IN}
            className="w-full border-t border-white/10"
          />

          <motion.div variants={ITEM}>
            <StatItem
              numericValue={20}
              suffix="+"
              label={t('stats.yearsLabel')}
              isRtl={isRtl}
            />
          </motion.div>

          {/* Separator */}
          <div className="hidden h-12 self-center border-l border-white/15 sm:block" />

          <motion.div variants={ITEM}>
            <StatItem
              numericValue={40}
              suffix="+"
              label={t('stats.countriesLabel')}
              isRtl={isRtl}
            />
          </motion.div>

          <div className="hidden h-12 self-center border-l border-white/15 sm:block" />

          <motion.div variants={ITEM}>
            <StatItem
              numericValue={10000}
              suffix="+"
              label={t('stats.productsLabel')}
              isRtl={isRtl}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">
            Scroll
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-4 w-4 text-white/30"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
