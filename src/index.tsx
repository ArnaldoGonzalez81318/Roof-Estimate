import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import { ThemeProvider } from './theme';
import Home from './routes/index';
import Estimate from './routes/estimate';
import About from './routes/about';
import './App.css';
import './index.css';

render(() => (
  <ThemeProvider>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/estimate" component={Estimate} />
      <Route path="/about" component={About} />
    </Router>
  </ThemeProvider>
), document.getElementById('root')!);