/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          default: "#02121D",
          dark: "#01080D"
        },
        green: {
          default: "#00FF00"
        },
        yellow: {
          default: "#FFFB00"
        },
        lightblue: {
          default: "#00E6FF"
        }
      }
    },
  },
  plugins: [],
}