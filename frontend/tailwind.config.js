/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          100: '#fef3c7',
          200: '#fde68a',
          500: '#f59e0b',
          700: '#b45309',
          800: '#92400e',
        },
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}