/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azulBase: '#1D5D94',
        azulBaseHover: '#4188C5',
        background: '#B1D0EB',
      },
    },
  },
  plugins: [],
}
