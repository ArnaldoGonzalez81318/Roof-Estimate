import { useTheme } from '../theme';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <button class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}