/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        black2: '#0A0A0A',
        black3: '#111111',
        gray1:'#535556',
        gray2:'#C2C1BE',
        gray3: '#141713',
        green:'#3ECF8E',
        red:'#C0392B',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // 'Inter' as the primary font with fallback to sans-serif
        poppins: ['Poppins', 'sans-serif'], // 'Poppins' as the primary font with fallback to sans-serif
      },
    },
  },
  plugins: [],
}

