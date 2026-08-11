'use client';

// src/components/ui/animated-divider.tsx
// A slim full-width divider with an animated navy-gold gradient shift.
// The gradient cycles slowly to create a living texture between sections.
// Respects prefers-reduced-motion by falling back to a static gradient.

export function AnimatedDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animated-divider ${className}`}
      aria-hidden="true"
    />
  );
}
