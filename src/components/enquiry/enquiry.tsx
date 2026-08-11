'use client';

// src/components/enquiry/enquiry.tsx
// Enquiry Form Section.
// Reads initial division from EnquiryContext (if user clicked "Enquire about this" on a product).
// Uses uncontrolled/controlled mix for simplicity, then builds a mailto: URL on submit.

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/locale-provider';
import { useEnquiry, type DivisionKey } from '@/contexts/enquiry-context';
import { cn } from '@/lib/utils';

export function Enquiry() {
  const t = useTranslations('enquiry');
  const { isRtl } = useLocale();
  const { selectedDivision } = useEnquiry();

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [orderType, setOrderType] = useState('wholesale');
  
  // Multiple divisions can be selected
  const [divisions, setDivisions] = useState<Record<string, boolean>>({
    autoSpare: false,
    general: false,
    energy: false,
    foodstuffs: false,
  });

  const [errors, setErrors] = useState({ name: false, email: false, divisions: false });

  // When selectedDivision from context changes (e.g. user clicked a product card), 
  // pre-select that division.
  useEffect(() => {
    if (selectedDivision) {
      setDivisions(prev => ({ ...prev, [selectedDivision]: true }));
    }
  }, [selectedDivision]);

  const toggleDivision = (key: string) => {
    setDivisions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const hasName = name.trim().length > 0;
    const hasEmail = email.trim().length > 0;
    const hasDivision = Object.values(divisions).some(Boolean);

    setErrors({
      name: !hasName,
      email: !hasEmail,
      divisions: !hasDivision,
    });

    if (!hasName || !hasEmail || !hasDivision) return;

    // Build Email Subject and Body
    const selectedDivsText = Object.entries(divisions)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => t(`form.divisionsOptions.${key}`))
      .join(', ');

    const subject = `Trade Enquiry – [${selectedDivsText}]`;

    const body = `
New Trade Enquiry

Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}

Divisions of Interest: ${selectedDivsText}
Order Type: ${t(`form.orderTypeOptions.${orderType}`)}

Requirements / Quantities:
${message || 'No additional details provided.'}
    `.trim();

    // Construct Gmail Compose URL
    const to = 'khailalahlamtradingzllc@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in new tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="enquiry" ref={sectionRef} className={cn("relative w-full bg-muted/30 py-24 sm:py-32", isRtl && 'rtl')}>
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        
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

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-card p-6 shadow-sm border border-border sm:p-10"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Row 1: Name & Company */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.name')} *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('form.namePlaceholder')}
                  className={cn(
                    "rounded-xl border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent",
                    errors.name ? "border-red-500" : "border-border",
                    isRtl && "text-right font-arabic-body"
                  )}
                />
                {errors.name && <span className={cn("text-xs text-red-500", isRtl && "text-right")}>{t('form.errorRequired')}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.company')}</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder={t('form.companyPlaceholder')}
                  className={cn(
                    "rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent",
                    isRtl && "text-right font-arabic-body"
                  )}
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.email')} *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('form.emailPlaceholder')}
                  className={cn(
                    "rounded-xl border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent",
                    errors.email ? "border-red-500" : "border-border",
                    isRtl && "text-right font-arabic-body"
                  )}
                />
                {errors.email && <span className={cn("text-xs text-red-500", isRtl && "text-right")}>{t('form.errorRequired')}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t('form.phonePlaceholder')}
                  className={cn(
                    "rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent",
                    isRtl && "text-right font-arabic-body"
                  )}
                />
              </div>
            </div>

            {/* Row 3: Divisions Multi-select */}
            <div className="flex flex-col gap-3">
              <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.divisions')} *</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {['autoSpare', 'general', 'energy', 'foodstuffs'].map((key) => (
                  <label
                    key={key}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:bg-muted/50",
                      divisions[key] ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-border bg-background",
                      isRtl && "flex-row-reverse text-right"
                    )}
                  >
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={divisions[key]} 
                      onChange={() => toggleDivision(key)} 
                    />
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                      divisions[key] ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground/30 bg-transparent"
                    )}>
                      {divisions[key] && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={cn("text-sm", isRtl ? "font-arabic-body" : "font-body")}>
                      {t(`form.divisionsOptions.${key}`)}
                    </span>
                  </label>
                ))}
              </div>
              {errors.divisions && <span className={cn("text-xs text-red-500", isRtl && "text-right")}>{t('form.errorSelectOne')}</span>}
            </div>

            {/* Row 4: Order Type Radio Group */}
            <div className="flex flex-col gap-3">
              <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.orderType')}</label>
              <div className="flex flex-wrap gap-4">
                {['wholesale', 'retail', 'unsure'].map((type) => (
                  <label key={type} className={cn("flex cursor-pointer items-center gap-2", isRtl && "flex-row-reverse text-right")}>
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                      orderType === type ? "border-accent border-[6px]" : "border-muted-foreground/40"
                    )} />
                    <input
                      type="radio"
                      name="orderType"
                      value={type}
                      checked={orderType === type}
                      onChange={() => setOrderType(type)}
                      className="sr-only"
                    />
                    <span className={cn("text-sm", isRtl ? "font-arabic-body" : "font-body")}>
                      {t(`form.orderTypeOptions.${type}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Row 5: Message */}
            <div className="flex flex-col gap-2">
              <label className={cn("text-sm font-semibold", isRtl && "text-right font-arabic-heading")}>{t('form.message')}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={t('form.messagePlaceholder')}
                rows={5}
                className={cn(
                  "rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent resize-none",
                  isRtl && "text-right font-arabic-body"
                )}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={cn(
                "mt-4 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95",
                isRtl ? "font-arabic-heading" : "font-heading"
              )}
            >
              {t('form.submit')}
            </button>
            
          </form>
        </motion.div>
      </div>
    </section>
  );
}
