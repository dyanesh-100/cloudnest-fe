/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#3F8AEF',
        grey: '#8B9AB1',
        black: '#313133',
        lightGrey: '#DBDCE0',
        paleBlue: '#E9EEF6',
        lightBlue: '#2E80ED'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive'],
        agu: ['Agu Display', 'serif'],
      },
      animation: {
        'dropdown-fade': 'dropdownFade 0.2s ease-out forwards',
        'fade-in': 'fadeIn 0.15s ease-out forwards',
      },
      keyframes: {
        dropdownFade: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(-50%) translateY(0)'
          }
        },
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(-5px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    function({ addUtilities }) {
      addUtilities({
        '.animate-dropdown-fade': {
          animation: 'dropdownFade 0.2s ease-out forwards',
        },
        '.animate-fade-in': {
          animation: 'fadeIn 0.15s ease-out forwards',
        }
      })
    }
  ],
}