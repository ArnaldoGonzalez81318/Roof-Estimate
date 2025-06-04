import { createSignal, onMount } from 'solid-js';
import { useTheme } from '../theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [icon, setIcon] = createSignal('🌙');

  const updateIcon = () => {
    setIcon(theme() === 'dark' ? '☀️' : '🌙');
  };

  onMount(updateIcon);

  return (
    <button
      class="theme-toggle"
      onClick={() => {
        toggleTheme();
        updateIcon();
      }}
      aria-label="Toggle theme"
    >
      {icon()}
    </button>
  );
}