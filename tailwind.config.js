/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: "#f0f0f0",
        neutralHover: "#dedede",
        neutralDark: "#1c1c1c",
        neutralHoverDark: "#2a2a2a",
        Light: "#fff",
        Dark: "#121212",
        primary: "#448aff",
        primaryTransparent: "#ecf3ff",
        primaryDark: "#ffd740",
        primaryDarkTransparent: "#1e1c14",
      },
    },
  },
  plugins: [],
};
