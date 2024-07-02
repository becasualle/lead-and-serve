'use client';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <main>
      <p>{theme} </p>
      <button onClick={toggleTheme}>Toggle</button>
    </main>
  );
}
