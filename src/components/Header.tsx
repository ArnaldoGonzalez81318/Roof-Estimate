import { A, useLocation } from '@solidjs/router';
import { createSignal } from 'solid-js';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header class="site-header">
      <nav>
        <div class="logo">
          <strong>Roofing KING</strong>
        </div>

        <button
          class="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen())}
        >
          ☰
        </button>

        <div class={`nav-links ${menuOpen() ? 'open' : ''}`}>
          <A href="/" class={isActive('/') ? 'active' : ''}>Home</A>
          <A href="/estimate" class={isActive('/estimate') ? 'active' : ''}>Calculator</A>
          <A href="/about" class={isActive('/about') ? 'active' : ''}>About</A>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}