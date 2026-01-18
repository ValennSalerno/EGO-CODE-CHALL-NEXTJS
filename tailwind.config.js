/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D0021B",
          dark: "#191919",
          black: "#000000"
        }
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"]
      }
    }
  },
  plugins: []
};
