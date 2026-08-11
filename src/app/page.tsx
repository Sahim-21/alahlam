// src/app/page.tsx
// Khail Alahlam Trading — Homepage

import { Hero } from '@/components/hero';
import { WhyUs } from '@/components/why-us';
import { Products } from '@/components/products';
import { Location } from '@/components/location';
import { Enquiry } from '@/components/enquiry';
import { Contact } from '@/components/contact';

export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <Hero />

      {/* ── Products ── */}
      <Products />

      {/* ── Why Us ── */}
      <WhyUs />

      {/* ── Location ── */}
      <Location />

      {/* ── Enquiry ── */}
      <Enquiry />

      {/* ── Contact ── */}
      <Contact />
    </main>
  );
}

