/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-ribbon-1',
    'bg-ribbon-2',
    'bg-ribbon-3',
    'bg-ribbon-4',
    'bg-ribbon-5',
    'text-ribbon-1',
    'text-ribbon-2',
    'text-ribbon-3',
    'text-ribbon-4',
    'text-ribbon-5',
    'border-ribbon-1',
    'border-ribbon-2',
    'border-ribbon-3',
    'border-ribbon-4',
    'border-ribbon-5',
    'bg-role-eng',
    'bg-role-client',
    'bg-role-oem',
    'bg-role-logistics',
    'bg-role-sys',
    'bg-role-store',
    'bg-theme-breakdown',
    'bg-theme-parts',
    'bg-theme-directive',
    'bg-theme-action',
    'border-theme-breakdown',
    'border-theme-parts',
    'border-theme-directive',
    'border-theme-action',
  ],
  theme: {
    extend: {
      colors: {
        'ribbon-1': '#0f2537', // Dark Navy
        'ribbon-2': '#f59e0b', // Amber Orange
        'ribbon-3': '#0b84a5', // Steel Teal
        'ribbon-4': '#00a8cc', // Vibrant Cyan
        'ribbon-5': '#10b981', // Emerald Green
        'theme-breakdown': '#0066cc',
        'theme-parts': '#0b84a5',
        'theme-directive': '#f59e0b',
        'theme-action': '#10b981',
        'stage-bg': '#f8fafc',
        'border-light': '#e2e8f0',
        'border-dark': '#cbd5e1',
        'navy-800': '#0a192f',
        'navy-900': '#0f2537',
        'role-eng': '#6b46c1',
        'role-client': '#2b6cb0',
        'role-oem': '#4c51bf',
        'role-logistics': '#b7791f',
        'role-sys': '#e11d48',
        'role-store': '#475569',
      },
      fontFamily: {
        poppins: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 35px -10px rgba(15, 23, 42, 0.15)',
        modal: '0 30px 60px -12px rgba(15, 23, 42, 0.35)',
        'primary-btn': '0 4px 12px rgba(0, 168, 204, 0.3)',
        'primary-btn-hover': '0 6px 18px rgba(0, 168, 204, 0.45)',
        'pill-active': '0 4px 12px rgba(0, 102, 204, 0.25)',
      },
      keyframes: {
        slideInRight: {
          '0%': { opacity: '0', transform: 'translate3d(35px, 0, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translate3d(-35px, 0, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        pulseNode: {
          '0%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        moveArrowVertical: {
          '0%, 100%': { transform: 'translateY(0) rotate(90deg)' },
          '50%': { transform: 'translateY(5px) rotate(90deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-node': 'pulseNode 1.5s infinite alternate',
        'move-arrow-vertical': 'moveArrowVertical 1.8s infinite ease-in-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
