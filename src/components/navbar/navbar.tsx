'use client';

// src/components/navbar/navbar.tsx
// Sticky, responsive, bilingual navbar for Khail Alahlam Trading.
//
// Features:
//  • Framer Motion entrance animation on load (slides down from above)
//  • Backdrop-blur + border materialises on scroll (Framer Motion animate)
//  • Desktop nav links with animated underline hover
//  • Mobile hamburger → full-screen slide-down drawer with staggered links
//  • Company wordmark: EN leads in LTR, AR leads in RTL — both always visible
//  • Language toggle (EN | ع) + dark/light ThemeToggle on the trailing side
//  • All links use next-intl translations, anchor-scroll except /about

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useLocale } from '@/components/locale-provider';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

// ─── Nav link data ────────────────────────────────────────────────────────────

type NavItem = {
  key: string;        // translation key within "nav" namespace
  href: string;       // full href (anchor or route)
  isAnchor: boolean;  // true → smooth-scroll on homepage, false → Next.js route
};

const NAV_ITEMS: NavItem[] = [
  { key: 'home',     href: '#home',     isAnchor: true  },
  { key: 'about',    href: '/about',    isAnchor: false },
  { key: 'products', href: '#products', isAnchor: true  },
  { key: 'whyUs',    href: '#why-us',   isAnchor: true  },
  { key: 'location', href: '#location', isAnchor: true  },
  { key: 'contact',  href: '#contact',  isAnchor: true  },
];

// ─── Wordmark ─────────────────────────────────────────────────────────────────

function Wordmark({ isRtl }: { isRtl: boolean }) {
  const englishLine = (
    <span className="block font-heading text-base font-800 leading-tight tracking-tight text-foreground">
      Khail Alahlam Trading
    </span>
  );
  const arabicLine = (
    <span className="block font-arabic-heading text-[0.7rem] font-600 leading-tight tracking-wide text-muted-foreground">
      خيل الأحلام للتجارة
    </span>
  );

  return (
    <div className={cn('flex flex-col', isRtl ? 'items-end text-end' : 'items-start text-start')}>
      {/* Leading line swaps based on direction */}
      {isRtl ? (
        <>
          <span className="block font-arabic-heading text-base font-800 leading-tight tracking-wide text-foreground">
            خيل الأحلام للتجارة
          </span>
          <span className="block font-heading text-[0.7rem] font-600 leading-tight tracking-tight text-muted-foreground">
            Khail Alahlam Trading
          </span>
        </>
      ) : (
        <>
          {englishLine}
          {arabicLine}
        </>
      )}
    </div>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function DesktopNavLink({
  item,
  label,
  isActive,
  onClick,
}: {
  item: NavItem;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'relative py-1 text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
      {/* Animated underline */}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}
    </Link>
  );
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        animate={isOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        style={{ originX: 0.5 }}
      />
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        animate={isOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  navItems,
  labels,
  activeKey,
  isRtl,
  onLinkClick,
}: {
  isOpen: boolean;
  navItems: NavItem[];
  labels: Record<string, string>;
  activeKey: string;
  isRtl: boolean;
  onLinkClick: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-drawer"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className={cn('flex flex-col px-6 py-4 gap-1', isRtl && 'items-end')}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: isRtl ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.25, ease: 'easeOut' }}
              >
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeKey === item.key
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isRtl ? 'text-end font-arabic-body' : 'font-body'
                  )}
                >
                  {labels[item.key]}
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + navItems.length * 0.05, duration: 0.25 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <Link
                href="#enquiry"
                onClick={onLinkClick}
                className={cn(
                  'block w-full rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground',
                  'transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isRtl && 'font-arabic-heading'
                )}
              >
                {labels.getQuote}
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const t = useTranslations('nav');
  const { locale, isRtl } = useLocale();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState('home');

  const { scrollY } = useScroll();

  // Compute backdrop colour based on resolved theme (avoids Framer 'transparent' warning)
  const navbarBgScrolled =
    resolvedTheme === 'dark'
      ? 'rgba(10,15,28,0.90)'
      : 'rgba(247,248,250,0.90)';

  // Materialise backdrop on scroll
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 16);
  });

  // Close drawer on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Close drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  // Smooth-scroll for anchor links
  const handleAnchorClick = (href: string) => {
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  // Build labels map
  const labels: Record<string, string> = {
    home:     t('home'),
    about:    t('about'),
    products: t('products'),
    whyUs:    t('whyUs'),
    location: t('location'),
    contact:  t('contact'),
    getQuote: t('getQuote'),
  };

  // Controls
  const controls = (
    <div className={cn('flex items-center gap-2', isRtl && 'flex-row-reverse')}>
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );

  return (
    <>
      {/* Entrance animation wrapper — slides the whole bar down on load */}
      <motion.header
        id="navbar"
        role="banner"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 w-full',
          // Transition background materialisation with CSS (Framer handles the rest)
          'transition-[background-color,border-color,box-shadow] duration-300'
        )}
      >
        {/* Animated backdrop layer */}
        <motion.div
          className="absolute inset-0 -z-10 border-b"
          initial={{
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            backdropFilter: 'blur(0px) saturate(1)',
          }}
          animate={
            scrolled
              ? {
                  backgroundColor: navbarBgScrolled,
                  borderColor: 'rgba(221,226,238,1)',
                  backdropFilter: 'blur(16px) saturate(1.6)',
                }
              : {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'rgba(0,0,0,0)',
                  backdropFilter: 'blur(0px) saturate(1)',
                }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* ── Inner bar ── */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* ── Logo / Wordmark ── */}
          <Link
            href="/"
            aria-label="Khail Alahlam Trading — Home"
            className="flex-shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Wordmark isRtl={isRtl} />
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            aria-label="Primary navigation"
            className={cn(
              'hidden md:flex items-center gap-6',
              isRtl && 'flex-row-reverse'
            )}
          >
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink
                key={item.key}
                item={item}
                label={labels[item.key]}
                isActive={activeKey === item.key}
                onClick={
                  item.isAnchor
                    ? () => {
                        handleAnchorClick(item.href);
                        setActiveKey(item.key);
                      }
                    : () => setActiveKey(item.key)
                }
              />
            ))}
          </nav>

          {/* ── Right-side controls + CTA ── */}
          <div className={cn('flex items-center gap-3', isRtl && 'flex-row-reverse')}>
            {/* Desktop controls */}
            <div className="hidden md:flex">{controls}</div>

            {/* Desktop CTA */}
            <Link
              href="#enquiry"
              onClick={() => handleAnchorClick('#enquiry')}
              className={cn(
                'hidden md:inline-flex items-center rounded-full bg-accent px-5 py-2',
                'text-sm font-semibold text-accent-foreground transition-all duration-200',
                'hover:opacity-90 hover:shadow-lg hover:shadow-accent/25',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isRtl && 'font-arabic-heading'
              )}
            >
              {t('getQuote')}
            </Link>

            {/* Mobile: controls + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {controls}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full',
                  'border border-border bg-muted text-muted-foreground',
                  'transition-colors hover:bg-secondary hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                <HamburgerIcon isOpen={mobileOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div id="mobile-nav">
          <MobileDrawer
            isOpen={mobileOpen}
            navItems={NAV_ITEMS}
            labels={labels}
            activeKey={activeKey}
            isRtl={isRtl}
            onLinkClick={() => setMobileOpen(false)}
          />
        </div>
      </motion.header>

      {/* Spacer so page content doesn't hide behind the fixed bar */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
