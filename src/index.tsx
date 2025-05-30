import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import App from './App';
import './index.css';

import Home from './routes/index';
import Estimate from './routes/estimate';
import About from './routes/about';

render(() => (
  <Router>
    <App>
      <Route path="/" component={Home} />
      <Route path="/estimate" component={Estimate} />
      <Route path="/about" component={About} />
    </App>
  </Router>
), document.getElementById('root')!);