/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        brand: "var(--color-brand)",
        "brand-purple": "var(--color-brand-purple)",
        "brand-yellow": "var(--color-brand-yellow)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
