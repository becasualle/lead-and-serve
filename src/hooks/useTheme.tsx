import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    updateThemeBasedOnState(initialTheme);
  }, []);

  useEffect(() => {
    updateThemeBasedOnState(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggleTheme };
}

function updateThemeBasedOnState(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
}

function getInitialTheme(): Theme {
  if (typeof window !== undefined) {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return prefersDarkMode ? 'dark' : 'light';
  }

  return 'dark';
}

// TODO: Обрабатывать системные настройки https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
