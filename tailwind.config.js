/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#07070a',
        surface: '#10101a',
        border: '#1e1e2e',
        lime: '#c5ff2e',
        'lime-dim': 'rgba(197,255,46,0.12)',
        cinered: '#ff3b2e',
        white: '#f2ede4',
        muted: '#5a5a6e',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee-left': 'marqueeLeft 28s linear infinite',
        'marquee-right': 'marqueeRight 22s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-lime': 'pulseLime 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseLime: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197,255,46,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(197,255,46,0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
