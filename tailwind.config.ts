import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: { DEFAULT: '#652e8c' },
        secondary: { DEFAULT: '#fed26a' },
      },
      fontFamily: {
        cinzel: ['var(--font-cinzelDecorative)'],
      },
    },
  },
  plugins: [],
};
export default config;
