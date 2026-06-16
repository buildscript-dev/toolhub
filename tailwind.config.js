/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f17',
        panel: '#121826',
        edge: '#1f2937',
        brand: { DEFAULT: '#5b8cff', dark: '#3b6fe0' },
        accent: '#19d4a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
