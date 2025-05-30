import { createSignal, createContext, useContext, onMount } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

type ThemeContextType = {
  theme: () => string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>();

export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setTheme] = createSignal('light');

  const toggleTheme = () => {
    const newTheme = theme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  onMount(() => {
    document.body.classList.toggle('dark', theme() === 'dark');
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};