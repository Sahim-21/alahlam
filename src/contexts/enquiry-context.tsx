'use client';

// src/contexts/enquiry-context.tsx
// Lightweight React context that stores the pre-selected division for the
// enquiry form. Product cards write here; the enquiry form reads here.
// Persisted in sessionStorage so a page refresh doesn't clear it.

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type DivisionKey = 'autoSpare' | 'general' | 'energy' | 'foodstuffs' | '';

interface EnquiryContextValue {
  selectedDivision: DivisionKey;
  setSelectedDivision: (division: DivisionKey) => void;
}

const EnquiryContext = createContext<EnquiryContextValue>({
  selectedDivision: '',
  setSelectedDivision: () => {},
});

const SESSION_KEY = 'kat_enquiry_division';

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selectedDivision, setSelectedDivisionState] = useState<DivisionKey>('');

  // Rehydrate from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY) as DivisionKey | null;
    if (stored) setSelectedDivisionState(stored);
  }, []);

  const setSelectedDivision = (division: DivisionKey) => {
    setSelectedDivisionState(division);
    sessionStorage.setItem(SESSION_KEY, division);
  };

  return (
    <EnquiryContext.Provider value={{ selectedDivision, setSelectedDivision }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  return useContext(EnquiryContext);
}
