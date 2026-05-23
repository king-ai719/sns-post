/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF6B9D',
          light: '#FF9BBD',
          dark: '#E85A8A',
        },
        surface: {
          DEFAULT: '#F9FAFB',
          1: '#FFFFFF',
          2: '#F3F4F6',
          3: '#E5E7EB',
          border: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
}