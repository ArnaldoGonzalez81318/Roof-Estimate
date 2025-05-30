import { createSignal, createContext, useContext } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

type ThemeContextType = {
  theme: () => string;
  toggleTheme: () => void;
};

// Create the context with correct type
const ThemeContext = createContext<ThemeContextType>();

// Provider component
export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setTheme] = createSignal('light');

  const toggleTheme = () => {
    const newTheme = theme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value= {{ theme, toggleTheme }
}>
  <div class={ theme() === 'dark' ? 'dark' : '' }>
    { props.children }
    </div>
    </ThemeContext.Provider>
  );
}

// Hook to access context
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};