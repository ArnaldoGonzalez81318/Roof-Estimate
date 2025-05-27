import { createSignal } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Home from './routes/home';
import Calculator from './routes/Calculator';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = createSignal('light');
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div class={`app ${theme()}`}>
      <header>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme()} />
      </header>

      <Router>
        <Route path="/" component={Home} />
        <Route path="/calculator" component={Calculator} />
      </Router>
    </div>
  );
}

export default App;