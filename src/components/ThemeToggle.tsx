import { useTheme } from '../theme';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <button class="theme-toggle" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}