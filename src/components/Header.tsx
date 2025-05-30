import { A, useLocation } from '@solidjs/router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();

  return (
    <header class="site-header">
      <nav>
        <div><strong>Roofing KING</strong></div>
        <div>
          <A href="/" class={location.pathname === '/' ? 'active' : ''}>Home</A>
          <A href="/estimate" class={location.pathname === '/estimate' ? 'active' : ''}>Calculator</A>
          <A href="/about" class={location.pathname === '/about' ? 'active' : ''}>About</A>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}