import { createSignal } from 'solid-js';
import { A, Route } from '@solidjs/router';
import Home from './routes/Homepage';
import About from './routes/About';
import Calculator from './routes/Calculator';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = createSignal('light');
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div class={`app ${theme()}`}>
      <header class="site-header">
        <div class="logo-container">
          <img src="/logo.png" alt="Roofing KING logo" class="logo" />
          <span class="brand">Roofing KING Construction, INC.</span>
        </div>
        <nav class="nav-links">
          <A href="/" class="nav-link">Home</A>
          <A href="/about" class="nav-link">About Us</A>
          <A href="/calculator" class="nav-link">Estimate Calculator</A>
          <ThemeToggle onClick={toggleTheme} />
        </nav>
      </header>

      <main class="main-content">
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/calculator" component={Calculator} />
      </main>
    </div>
  );
}

export default App;