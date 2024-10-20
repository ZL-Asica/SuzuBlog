'use client';

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    // Function to apply the dark class based on system preference
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };

    // Initial check for user system theme
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    applyTheme(systemPrefersDark);

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => applyTheme(e.matches));

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', (e) => applyTheme(e.matches));
    };
  }, []);

  return null;
}
