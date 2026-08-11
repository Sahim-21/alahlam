// src/components/theme-provider.tsx
// Thin wrapper around next-themes ThemeProvider.
// Uses "class" attribute strategy so Tailwind v4's @custom-variant dark works.

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
