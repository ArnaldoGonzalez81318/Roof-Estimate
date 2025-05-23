function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button onClick={toggleTheme} class="theme-toggle">
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

export default ThemeToggle;