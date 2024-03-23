/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        "montserrat": ['Montserrat', 'sans-serif'],
        "Ourland": "Ourland",
      },
      colors: {
        "blueNormal": "#32466F",
        "darkBlue":"#062856",
        "lightBlue": "#0169a9",
        "yellow": "#FFF96E",
        "orange": "#FFA500",
      },
    },
  },
  plugins: [require("daisyui")],
}