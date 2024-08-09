/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#root",
  theme: {
    colors: {
      'primary': '#EBF5FF',
      'btn-color-primary': '#42A5F5',
      'btn-color-secondary': '#90CAF9',
      'bg-color': '#C2E3FF',
      'error-color': '#F44336',
      'white': '#FFFFFF',
      'black': '#000000',
    },
    extend: {
      fontFamily:{
      'montserrat': ['Montserrat'],
    },
    translate: {
        '-full-vh': '-100vh',
      },
    },
  },
  plugins: [],
}

