/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#00FF5E"
        },
        secondary: {
          default: "#222D47",
          dark: "#1C212C"
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