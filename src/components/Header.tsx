import { A, useLocation } from '@solidjs/router';
import { createSignal } from 'solid-js';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header class="site-header">
      <nav class="nav-container">
        <div class="left-section">
          <button
            class="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen())}
          >
            ☰
          </button>

          <div class="logo">
            <A href="/" onClick={() => setMenuOpen(false)}>
              <img src="/vite.svg" alt="Logo" class="logo-img" />
            </A>
          </div>
        </div>

        <div class="right-section">
          <div class={`nav-links ${menuOpen() ? 'open' : ''}`}>
            <A href="/" class={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</A>
            <A href="/estimate" class={isActive('/estimate') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Calculator</A>
            <A href="/about" class={isActive('/about') ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</A>
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}