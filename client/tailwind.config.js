/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nexa': ['Nexa', 'sans-serif'],
      },
      fontWeight: {
        'extralight': 200,
        'bold': 700,
      },
    },
  },
  plugins: [],
}

