/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        turmeric: '#FFD700',
        chili: '#CC3333',
        herbal: '#228B22'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};
