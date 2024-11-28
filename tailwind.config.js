/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors : {
        green: '#2E7D32',
        lightGrey: '#E0E0E0',
        darkGrey: '#757575'
      }
    },
  },
  plugins: [],
}