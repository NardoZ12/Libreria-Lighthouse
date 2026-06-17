import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          '50': '#e8edf5',
          '100': '#c5d0e6',
          '200': '#9fb0d4',
          '300': '#7890c2',
          '400': '#5a78b5',
          '600': '#2e5098',
          '700': '#1f3d84',
          '800': '#162b6b',
          '900': '#0c1f3f',
          DEFAULT: '#0C1F3F',
        },
        gold: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed7aa',
          '300': '#fdba74',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          '700': '#c2410c',
          '900': '#7c2d12',
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE0',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
