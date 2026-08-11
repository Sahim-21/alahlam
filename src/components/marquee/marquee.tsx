'use client';

import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

const KEYWORDS_EN = [
  "Auto Spare Parts", "General Trading", "Energy Drinks Wholesale", 
  "Foodstuffs & Beverages", "RAK Free Zone", "Bulk & Retail Orders", 
  "GCC & International Logistics", "Direct Sourcing", "Fast Fulfillment", 
  "Trusted Local Partner"
];

const KEYWORDS_AR = [
  "قطع غيار السيارات", "التجارة العامة", "بيع مشروبات الطاقة بالجملة",
  "المواد الغذائية والمشروبات", "المنطقة الحرة برأس الخيمة", "طلبات الجملة والتجزئة",
  "لوجستيات دول الخليج ودولية", "توريد مباشر", "تنفيذ سريع",
  "شريك محلي موثوق"
];

export function Marquee() {
  const { isRtl } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const keywords = isRtl ? KEYWORDS_AR : KEYWORDS_EN;
  
  // Duplicate 3 times for a seamless loop
  const duplicatedKeywords = [...keywords, ...keywords, ...keywords];

  // In RTL, we want to animate x from 0% to +33.33% instead of 0% to -33.33% to flip the direction
  const xStart = '0%';
  const xEnd = isRtl ? '33.333333%' : '-33.333333%';

  return (
    <section className="w-full overflow-hidden bg-accent/5 py-8 border-y border-border flex items-center">
      <div 
        className={cn("w-full relative flex items-center group", isRtl && "rtl")}
      >
        <motion.div
          className="flex w-max gap-4 px-4"
          animate={prefersReducedMotion ? {} : { x: [xStart, xEnd] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          whileHover={prefersReducedMotion ? {} : { animationPlayState: 'paused' }} // For standard CSS keyframes
          style={{ animationPlayState: "running" } as any} // Fallback if we were using CSS
        >
          {duplicatedKeywords.map((keyword, idx) => (
            <div
              key={idx}
              className={cn(
                "whitespace-nowrap rounded-full border border-border/60 bg-background px-6 py-2.5 text-sm font-medium shadow-sm transition-colors hover:border-accent hover:text-accent",
                isRtl ? 'font-arabic-body' : 'font-body'
              )}
            >
              {keyword}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
