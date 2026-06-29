/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme — clean whites and slate
        light: {
          bg:      '#FFFFFF',
          surface: '#F8FAFC',
          card:    '#FFFFFF',
          border:  '#E2E8F0',
          muted:   '#94A3B8',
          text:    '#0F172A',
          sub:     '#475569',
        },
        // Dark theme — deep obsidian
        dark: {
          bg:      '#030712',
          surface: '#0D1117',
          card:    '#111827',
          border:  '#1F2937',
          muted:   '#6B7280',
          text:    '#F9FAFB',
          sub:     '#9CA3AF',
        },
        // Accent — neon lime (dark mode) / forest green (light mode)
        accent: {
          DEFAULT: '#39FF14',   // neon — dark mode
          light:   '#16A34A',   // forest green — light mode readable
          glow:    'rgba(57,255,20,0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card-light': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover':  '0 4px 16px rgba(0,0,0,0.08)',
        'accent-sm':   '0 0 0 1px rgba(57,255,20,0.3)',
      },
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
        'fade-up':     'fade-up 0.5s ease-out forwards',
      },
      keyframes: {
        'border-spin': {
          from: { '--angle': '0deg' },
          to:   { '--angle': '360deg' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}


