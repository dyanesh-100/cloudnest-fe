/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        lightBlue : '#3F8AEF',
        grey : '#8B9AB1',
        black : '#313133',
        lightGrey : '#DBDCE0',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

