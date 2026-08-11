// src/app/page.tsx
// Khail Alahlam Trading — Homepage

import { Hero } from '@/components/hero';
import { Products } from '@/components/products';
import { Marquee } from '@/components/marquee';
import { WhyUs } from '@/components/why-us';
import { Capabilities } from '@/components/capabilities';
import { Story } from '@/components/story';
import { Newsletter } from '@/components/newsletter';
import { Location } from '@/components/location';
import { Enquiry } from '@/components/enquiry';
import { Contact } from '@/components/contact';
import { AnimatedDivider } from '@/components/ui/animated-divider';

export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <Hero />

      {/* ── Products & Divisions ── */}
      <Products />
      
      {/* ── Marquee ── */}
      <Marquee />
      <AnimatedDivider />

      {/* ── Why Choose Us ── */}
      <WhyUs />
      <AnimatedDivider />

      {/* ── Capabilities Grid ── */}
      <Capabilities />
      <AnimatedDivider />

      {/* ── Split-screen Story Video Band ── */}
      <Story />

      {/* ── Newsletter / Trade Updates ── */}
      <Newsletter />
      <AnimatedDivider />

      {/* ── Location ── */}
      <Location />
      <AnimatedDivider />

      {/* ── Enquiry ── */}
      <Enquiry />
      <AnimatedDivider />

      {/* ── Contact ── */}
      <Contact />
    </main>
  );
}

