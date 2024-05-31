/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Merriweather: "'Merriweather', sans-serif",
        Roboto: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}