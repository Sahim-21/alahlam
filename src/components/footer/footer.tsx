'use client';

// src/components/footer/footer.tsx
// Site footer with branding, quick links, contact info, and copyright.

import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Footer() {
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const tLocation = useTranslations('location');
  const { isRtl } = useLocale();

  const currentYear = new Date().getFullYear();
  const copyrightText = tFooter('legal.copyright', { year: currentYear.toString() });

  return (
    <footer className={cn("w-full border-t border-border bg-background pt-16 pb-8", isRtl && 'rtl')}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <div className={cn("grid gap-12 md:grid-cols-3 lg:grid-cols-4", isRtl && "direction-rtl md:grid-cols-3 lg:grid-cols-4")}>
          
          {/* Brand & Tagline */}
          <div className={cn("flex flex-col gap-6 lg:col-span-2", isRtl && "items-end text-right")}>
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-black uppercase tracking-tighter text-foreground",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}>
                {isRtl ? "خيل الأحلام للتجارة" : "Khail Alahlam Trading"}
              </span>
            </div>
            <p className={cn("max-w-xs text-muted-foreground", isRtl ? "font-arabic-body" : "font-body")}>
              {tFooter('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className={cn("flex flex-col gap-4", isRtl && "items-end text-right")}>
            <h4 className={cn("font-bold", isRtl ? "font-arabic-heading" : "font-heading")}>
              {tFooter('quickLinks')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className={cn("text-sm text-muted-foreground hover:text-accent", isRtl ? "font-arabic-body" : "font-body")}>
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className={cn("text-sm text-muted-foreground hover:text-accent", isRtl ? "font-arabic-body" : "font-body")}>
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/#products" className={cn("text-sm text-muted-foreground hover:text-accent", isRtl ? "font-arabic-body" : "font-body")}>
                  {tNav('products')}
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className={cn("text-sm text-muted-foreground hover:text-accent", isRtl ? "font-arabic-body" : "font-body")}>
                  {tNav('whyUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={cn("flex flex-col gap-4", isRtl && "items-end text-right")}>
            <h4 className={cn("font-bold", isRtl ? "font-arabic-heading" : "font-heading")}>
              {tFooter('contact')}
            </h4>
            <ul className="flex flex-col gap-4">
              <li className={cn("flex items-start gap-3 text-sm text-muted-foreground", isRtl && "flex-row-reverse")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className={cn(isRtl ? "font-arabic-body" : "font-body")}>
                  {tLocation('address.line1')}<br />
                  {tLocation('address.line2')}<br />
                  {tLocation('address.city')}
                </span>
              </li>
              <li className={cn("flex items-center gap-3 text-sm text-muted-foreground", isRtl && "flex-row-reverse")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href={`mailto:${tContact('emailValue')}`} className={cn("hover:text-accent", isRtl ? "font-arabic-body" : "font-body")}>
                  {tContact('emailValue')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={cn(
          "mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row",
          isRtl && "sm:flex-row-reverse"
        )}>
          <p className={cn("text-xs text-muted-foreground", isRtl ? "font-arabic-body text-right" : "font-body")}>
            {copyrightText}
          </p>
        </div>

      </div>
    </footer>
  );
}
