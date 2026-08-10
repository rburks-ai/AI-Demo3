import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#211F1C',
        charcoal2: '#2B2823',
        plaster: '#E7E3D8',
        paper: '#F6F3EC',
        brass: '#B08D57',
        brassLight: '#CBAA79',
        moss: '#57634A',
        ink: '#1A1815',
        rust: '#8C5A3C',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-work-sans)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      letterSpacing: {
        tag: '0.14em',
      },
      maxWidth: {
        content: '1400px',
      },
    },
  },
  plugins: [],
};
export default config;
