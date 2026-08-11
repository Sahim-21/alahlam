'use client';

// src/components/products/products.tsx
// 4-card product/category grid for the 4 divisions.
// Features: Hover-lift + subtle background image zoom.
// Pre-selects the division in EnquiryContext and smooth scrolls to #enquiry.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { useEnquiry, type DivisionKey } from '@/contexts/enquiry-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const DIVISIONS: { key: DivisionKey; image: string; icon: React.ReactNode }[] = [
  {
    key: 'autoSpare',
    image: '/auto-spare-parts-bg.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
        <path d="M5 3L3 5" strokeLinecap="round" />
        <path d="M19 3l2 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'general',
    image: '/general-trading-bg.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    key: 'energy',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=2070&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'foodstuffs',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

export function Products() {
  const t = useTranslations('products');
  const { isRtl } = useLocale();
  const { setSelectedDivision } = useEnquiry();
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleEnquire = (key: DivisionKey) => {
    setSelectedDivision(key);
    // Ensure we are on the homepage before scrolling
    if (window.location.pathname !== '/') {
      router.push('/#enquiry');
    } else {
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className={cn(
        "relative w-full bg-background py-24 sm:py-32",
        isRtl && 'rtl'
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={cn("flex flex-col gap-4 mb-16", isRtl ? "items-end text-right" : "items-center text-center")}
        >
          <span className={cn(
            "inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase border border-accent/20",
            isRtl && "font-arabic-body"
          )}>
            {t('sectionTitle')}
          </span>
          <h2 className={cn(
            "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
            isRtl ? "font-arabic-heading" : "font-heading"
          )}>
            {t('sectionTitle')}
          </h2>
          <p className={cn(
            "max-w-2xl text-lg text-muted-foreground",
            isRtl ? "font-arabic-body" : "font-body"
          )}>
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", isRtl && "direction-rtl")}>
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container with Zoom on Hover */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${div.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Icon */}
                <div className={cn(
                  "absolute bottom-4 flex h-12 w-12 items-center justify-center rounded-xl bg-card text-accent shadow-md",
                  isRtl ? "right-6" : "left-6"
                )}>
                  {div.icon}
                </div>
              </div>

              {/* Content */}
              <div className={cn("flex flex-1 flex-col p-6 pt-2", isRtl && "items-end text-right")}>
                <h3 className={cn(
                  "mb-3 text-xl font-bold",
                  isRtl ? "font-arabic-heading" : "font-heading"
                )}>
                  {t(`divisions.${div.key}.title`)}
                </h3>
                <p className={cn(
                  "mb-6 flex-1 text-sm text-muted-foreground leading-relaxed",
                  isRtl ? "font-arabic-body" : "font-body"
                )}>
                  {t(`divisions.${div.key}.description`)}
                </p>
                
                <button
                  onClick={() => handleEnquire(div.key)}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isRtl && "flex-row-reverse font-arabic-heading"
                  )}
                >
                  {t('enquireCta')}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
