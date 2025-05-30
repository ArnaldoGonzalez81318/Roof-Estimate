import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import { ThemeProvider } from './theme'; // ✅ import ThemeProvider here
import App from './App';
import Home from './routes/index';
import Estimate from './routes/estimate';
import About from './routes/about';
import './App.css';

render(() => (
  <ThemeProvider>
    <Router>
      <App>
        <Route path="/" component={Home} />
        <Route path="/estimate" component={Estimate} />
        <Route path="/about" component={About} />
      </App>
    </Router>
  </ThemeProvider>
), document.getElementById('root')!);