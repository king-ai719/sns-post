/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C9A96E',
          light: '#E2C89A',
          dark: '#A67C42',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          1: '#111111',
          2: '#1A1A1A',
          3: '#242424',
          border: '#2A2A2A',
        },
      },
    },
  },
  plugins: [],
}