/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./*.html", "./js/**/*.js", "./css/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        pixelify: ["Pixelify Sans", "sans-serif"],
      },
      colors: {
        primaryWhite: "#FFFDF8",
      },
    },
  },
  plugins: [],
};
