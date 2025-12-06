/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        matflix: {
          red: '#ef4444',
          dark: '#0a0a0a',
          card: '#18181b',
        },
      },
      boxShadow: {
        glow: '0 20px 60px rgba(239, 68, 68, 0.25)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 20px 60px rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
