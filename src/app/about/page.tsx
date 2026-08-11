'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations('about');
  const { isRtl } = useLocale();

  return (
    <main className={cn("flex flex-1 flex-col pb-24", isRtl && 'rtl')}>
      {/* Header section (replaces hero on this page) */}
      <section className="bg-background pt-32 pb-16 border-b border-border">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className={cn("flex flex-col gap-4", isRtl ? "items-end text-right" : "items-start text-left")}>
            <h1 className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl",
              isRtl ? "font-arabic-heading" : "font-heading"
            )}>
              {t('sectionTitle')}
            </h1>
            <p className={cn(
              "max-w-2xl text-lg text-muted-foreground",
              isRtl ? "font-arabic-body" : "font-body"
            )}>
              {t('sectionSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          
          <div className={cn("flex flex-col gap-16", isRtl && "text-right")}>
            {/* Overview */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className={cn("text-lg leading-relaxed", isRtl ? "font-arabic-body" : "font-body")}>
                {t('body')}
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-2xl bg-muted/50 p-8 border border-border">
              <h2 className={cn(
                "mb-4 text-2xl font-bold text-accent",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}>
                {t('mission.title')}
              </h2>
              <p className={cn("text-lg leading-relaxed", isRtl ? "font-arabic-body" : "font-body")}>
                {t('mission.description')}
              </p>
            </div>

            {/* Divisions */}
            <div>
              <h2 className={cn(
                "mb-4 text-3xl font-bold",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}>
                {t('divisionsHeading')}
              </h2>
              <p className={cn("mb-8 text-lg text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
                {t('divisionsIntro')}
              </p>
              
              <ul className="grid gap-6 sm:grid-cols-2">
                {[
                  { key: 'autoSpare', label: isRtl ? 'قطع غيار السيارات' : 'Auto Spare Parts' },
                  { key: 'generalTrading', label: isRtl ? 'التجارة العامة' : 'General Trading' },
                  { key: 'energyDrinks', label: isRtl ? 'مشروبات الطاقة' : 'Energy Drinks' },
                  { key: 'foodstuffs', label: isRtl ? 'المواد الغذائية والمشروبات' : 'Foodstuffs & Beverages' }
                ].map(div => (
                  <li key={div.key} className={cn("flex flex-col gap-2 rounded-xl border border-border p-5", isRtl && "items-end text-right")}>
                    <h3 className={cn("font-bold", isRtl ? "font-arabic-heading" : "font-heading")}>{div.label}</h3>
                    <p className={cn("text-sm text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
                      {/* @ts-ignore - Dynamic key access */}
                      {t(div.key)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* RAK Advantage */}
            <div>
              <h2 className={cn(
                "mb-4 text-3xl font-bold",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}>
                {t('rakHeading')}
              </h2>
              <p className={cn("mb-6 text-lg text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
                {t('rakBody')}
              </p>
              <ul className={cn(
                "list-inside list-disc space-y-3 text-lg",
                isRtl ? "font-arabic-body" : "font-body",
                isRtl && "list-none pr-0 space-y-4" // Remove default disc in RTL and use custom if needed
              )}>
                {[1, 2, 3, 4, 5].map(i => (
                  <li key={i} className={cn(isRtl && "flex items-start gap-3 flex-row-reverse")}>
                    {isRtl && <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent inline-block shrink-0" />}
                    {/* @ts-ignore */}
                    <span>{t(`rakPoint${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust / CTA */}
            <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl bg-[#0A0F1C] px-6 py-12 text-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F2044] to-[#0A0F1C] opacity-50 z-0" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />
              <h2 className={cn(
                "text-3xl font-bold text-white relative z-10",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}>
                {t('trustHeading')}
              </h2>
              <p className={cn(
                "max-w-2xl text-lg text-white/70 relative z-10",
                isRtl ? "font-arabic-body leading-loose" : "font-body"
              )}>
                {t('trustBody')}
              </p>
              <Link
                href="/#enquiry"
                className={cn(
                  "relative z-10 mt-4 rounded-full bg-accent px-8 py-4 text-sm font-bold text-accent-foreground transition-transform hover:scale-105",
                  isRtl ? "font-arabic-heading" : "font-heading"
                )}
              >
                {t('enquireCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
