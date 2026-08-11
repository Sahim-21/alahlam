'use client';

// src/components/location/location.tsx
// Location and Map section.
// Embeds a Google Maps iframe for the Compass Building, Al Hulaila Industrial Zone, RAK.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';

export function Location() {
  const t = useTranslations('location');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const mapQuery = "Compass Building, Al Hulaila Industrial Zone, Ras Al Khaimah";
  const iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <section id="location" ref={sectionRef} className={cn("w-full bg-background py-24 sm:py-32", isRtl && 'rtl')}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Header */}
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn("grid gap-8 lg:grid-cols-3 lg:gap-12", isRtl && "direction-rtl lg:grid-cols-3")}
        >
          {/* Info Card */}
          <div className={cn(
            "flex flex-col justify-center gap-6 rounded-3xl bg-card p-8 border border-border shadow-sm",
            isRtl && "items-end text-right"
          )}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className={cn("text-sm font-semibold text-accent uppercase tracking-wider", isRtl && "font-arabic-heading")}>
                {t('address.label')}
              </h3>
              <p className={cn("text-lg font-medium", isRtl ? "font-arabic-body" : "font-body")}>
                {t('address.line1')}<br />
                {t('address.line2')}<br />
                {t('address.city')}, {t('address.country')}
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isRtl && "flex-row-reverse font-arabic-heading"
              )}
            >
              {t('getDirections')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn("h-4 w-4", isRtl && "rotate-180")}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Map iframe */}
          <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm h-[400px] lg:h-[500px]">
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps location of Khail Alahlam Trading"
              className="grayscale-[30%] contrast-[110%] dark:invert-[90%] dark:hue-rotate-180"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
