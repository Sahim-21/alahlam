'use client';

// src/components/ui/count-up.tsx
// Animates a number from 0 to a target value when scrolled into view.
// Respects prefers-reduced-motion by skipping animation and showing final value immediately.

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  /** The numeric target to count to */
  to: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Optional suffix, e.g. "+" or "%" */
  suffix?: string;
  /** Optional prefix, e.g. "$" */
  prefix?: string;
  className?: string;
}

export function CountUp({ to, duration = 1800, suffix = '', prefix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    // Respect reduced-motion preference — skip animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(to);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();
    
    // Ease-out cubic
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOut(progress) * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
