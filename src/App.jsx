import { createSignal } from 'solid-js';
import Estimator from './components/Estimator';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = createSignal('light');

  const toggleTheme = () => {
    setTheme(theme() === 'light' ? 'dark' : 'light');
  };

  return (
    <div class={`app ${theme()}`}>
      <header>
        <h1>Florida Roof Cost Estimator</h1>
        <p>Estimate the cost of your new roof based on type and size.</p>
        <p>Note: This is a simple estimator and does not include labor or other costs.</p>
        <p>For a more accurate estimate, please consult a professional.</p>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme()} />
      </header>
      <Estimator />
    </div>
  );
}

export default App;