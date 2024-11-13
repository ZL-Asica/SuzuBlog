'use client';

import { useEffect } from 'react';

function ThemeProvider() {
  useEffect(() => {
    // Function to apply the dark class based on system preference
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };

    // Initial check for user system theme
    const systemPrefersDark = globalThis.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    applyTheme(systemPrefersDark);

    // Listen for changes in system theme
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const themeChangeListener = (event: MediaQueryListEvent) =>
      applyTheme(event.matches);
    mediaQuery.addEventListener('change', themeChangeListener);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', themeChangeListener);
    };
  }, []);

  return null;
}

export default ThemeProvider;
