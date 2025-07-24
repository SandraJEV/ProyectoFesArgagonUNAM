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
        whiteBase: '#F6F6F6',
        whiteBaseHover: '#FFFFF',
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          // ✅ Este es tu color principal para btn-primary, alert-primary, etc.
          primary: "#1D5D94", // azulBase
          "primary-focus": "#4188C5", // hover
          "primary-content": "#ffffff", // texto encima del botón

          // (opcional) Puedes agregar más si lo deseas:
          secondary: "#B1D0EB",
          neutral: "#3D4451",
          "base-100": "#ffffff",
        },
      },
    ],
     // esta línea activa el tema personalizado por defecto
  defaultTheme: "mytheme",
  },
};
