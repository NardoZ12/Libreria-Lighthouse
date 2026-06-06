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
          '50': '#fdf8ee',
          '100': '#faefd3',
          '200': '#f5db9e',
          '300': '#f0c668',
          '400': '#e8ac3a',
          '500': '#c8923a',
          '600': '#a97626',
          '700': '#8a5d1e',
          '900': '#4d3012',
          DEFAULT: '#C8923A',
          light: '#E8AC3A',
          dark: '#A97626',
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
