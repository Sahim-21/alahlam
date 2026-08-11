'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import { 
  Wrench, Droplet, CircleDashed, 
  Shirt, Package, 
  Warehouse, Tag, 
  Apple, Coffee, Truck,
  MapPin, Scale, DollarSign, Clock, ShieldCheck
} from 'lucide-react';

const TILE_KEYS = [
  // Trust Points
  { key: 'logistics', type: 'trust', icon: MapPin },
  { key: 'orders', type: 'trust', icon: Scale },
  { key: 'pricing', type: 'trust', icon: DollarSign },
  { key: 'fulfillment', type: 'trust', icon: Clock },
  { key: 'verticals', type: 'trust', icon: ShieldCheck },
  
  // Auto Spare Parts
  { key: 'autoParts', type: 'product', icon: Wrench },
  { key: 'autoFilters', type: 'product', icon: Droplet },
  { key: 'autoTyres', type: 'product', icon: CircleDashed },
  
  // General Trading
  { key: 'genApparel', type: 'product', icon: Shirt },
  { key: 'genMerchandise', type: 'product', icon: Package },
  
  // Energy Drinks
  { key: 'energyWholesale', type: 'product', icon: Warehouse },
  { key: 'energyPrivate', type: 'product', icon: Tag },
  
  // Foodstuffs
  { key: 'foodPackaged', type: 'product', icon: Apple },
  { key: 'foodBeverages', type: 'product', icon: Coffee },
  { key: 'foodBulk', type: 'product', icon: Truck },
];

export function Capabilities() {
  const t = useTranslations('capabilities');
  const { isRtl } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section 
      id="capabilities" 
      ref={sectionRef} 
      className={cn('w-full bg-background py-24 sm:py-32', isRtl && 'rtl')}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={cn('mb-16 flex flex-col gap-3', isRtl ? 'items-end text-right' : 'items-center text-center')}
        >
          <span className={cn(
            'inline-flex rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent',
            isRtl && 'font-arabic-body'
          )}>
            Capabilities
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

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.04 }
            }
          }}
        >
          {TILE_KEYS.map((tile) => (
            <motion.div
              key={tile.key}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 10 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 transition-all hover:shadow-md",
                tile.type === 'trust' 
                  ? "border-accent/30 bg-accent/5 hover:border-accent hover:bg-accent/10" 
                  : "border-border bg-card hover:border-accent/50",
                isRtl && "text-right"
              )}
            >
              <div className={cn(
                "mb-4 inline-flex rounded-lg p-2.5",
                tile.type === 'trust' ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground group-hover:text-accent group-hover:bg-accent/10",
                isRtl && "float-right"
              )}>
                <tile.icon className="h-5 w-5" />
              </div>
              <div className={cn("clear-both", isRtl && "text-right")}>
                <h3 className={cn("text-sm font-bold mb-1", isRtl ? "font-arabic-heading" : "font-heading")}>
                  {t(`items.${tile.key}.title`)}
                </h3>
                <p className={cn("text-xs text-muted-foreground leading-relaxed", isRtl ? "font-arabic-body" : "font-body")}>
                  {t(`items.${tile.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
