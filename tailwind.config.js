/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0066FF',
          hover: '#0052CC',
          light: '#F0F6FF',
          ice: '#F4F8FD',
          navy: '#0A192F',
          dark: '#071326',
          darker: '#040C1A',
          cyan: '#00D2FF',
          accent: '#00B4D8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 25, 47, 0.06), 0 2px 6px -1px rgba(10, 25, 47, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(0, 102, 255, 0.12), 0 8px 12px -4px rgba(10, 25, 47, 0.06)',
        'float': '0 20px 40px -15px rgba(0, 102, 255, 0.25)',
        'glow': '0 0 25px rgba(0, 102, 255, 0.4)'
      }
    },
  },
  plugins: [],
}
