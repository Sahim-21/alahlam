'use client';

// src/components/story/story.tsx
// A split-screen video and text band.
// Distinct from the full-bleed hero, this section uses a 50/50 layout
// with a text reveal animation on scroll.

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import { SiteImages } from '@/lib/images';

export function Story() {
  const t = useTranslations('story');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Cursor spotlight — only active over the video half
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(201,149,42,0.15) 0%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background overflow-hidden"
    >
      <div className={cn(
        "flex flex-col lg:flex-row w-full min-h-[60vh]",
        isRtl && "lg:flex-row-reverse"
      )}>
        
        {/* ── Text Side ── */}
        <div className={cn(
          "flex-1 flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24 xl:px-24 bg-card",
          isRtl ? "text-right items-end" : "text-left items-start"
        )}>
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-foreground",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}
            >
              {/* Split heading into lines if needed, or just render it */}
              {t('heading')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "text-lg sm:text-xl text-muted-foreground leading-relaxed",
                isRtl ? "font-arabic-body" : "font-body"
              )}
            >
              {t('body')}
            </motion.p>
          </div>
        </div>

        {/* ── Video Side ── */}
        <div
          className="flex-1 relative min-h-[40vh] lg:min-h-full bg-muted"
          onMouseMove={handleMouseMove}
        >
          {/* Cursor spotlight overlay */}
          <motion.div
            className="spotlight-overlay"
            style={{ background: spotlight }}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={SiteImages.storyPoster}
              className="absolute inset-0 w-full h-full object-cover object-center image-duotone"
            >
              <source src={SiteImages.storyVideo} type="video/mp4" />
            </video>
            {/* Subtle overlay to ensure the video isn't too harsh if it doesn't match theme */}
            <div className="absolute inset-0 bg-background/10 mix-blend-overlay" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
