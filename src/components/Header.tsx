import { A } from '@solidjs/router';

import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <nav class="flex justify-between items-center p-4 bg-white dark:bg-gray-900 text-black dark:text-white shadow">
      <h1 class="text-xl font-bold">Roofing KING Construction</h1>
      <div class="space-x-4">
        <A href="/">Home</A>
        <A href="/estimate">Calculator</A>
        <A href="/about">About</A>
        <ThemeToggle />
      </div>
    </nav>
  );
}