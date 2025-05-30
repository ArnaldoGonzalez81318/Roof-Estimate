import type { JSX } from 'solid-js/jsx-runtime';
import { ThemeProvider } from './theme';

export default function App(props: { children: JSX.Element }) {
  return (
    <ThemeProvider>
      {props.children}
    </ThemeProvider>
  );
}