/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#39FF14',
        'neon-dim': '#2bcc10',
        dark: {
          bg: '#0a0a0a',
          surface: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow-spin': 'glow-spin 3s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-spin': {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14' },
          '50%': { boxShadow: '0 0 10px #39FF14, 0 0 25px #39FF14, 0 0 50px #39FF14' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}


