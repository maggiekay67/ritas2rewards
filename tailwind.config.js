/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rita: {
          black: '#080C0A',
          forest: '#1B3A2A',
          'forest-dark': '#0F2018',
          'forest-mid': '#2D5A40',
          'forest-light': '#3D7A58',
          'forest-muted': '#4A8A68',
          ivory: '#F8F4ED',
          'ivory-dark': '#EAE4D8',
          'ivory-mid': '#D8D0C0',
          'ivory-warm': '#F2EDE4',
          gold: '#C9A84C',
          'gold-light': '#E8C56E',
          'gold-dark': '#9A7E35',
          'gold-pale': '#F5E8C0',
          slate: '#4A5568',
          muted: '#8B8B8B',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)',
        'gold': '0 4px 20px rgba(201,168,76,0.20)',
        'forest': '0 4px 20px rgba(27,58,42,0.25)',
        'float': '0 8px 32px rgba(0,0,0,0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
