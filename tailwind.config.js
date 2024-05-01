/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "350px",
        xs: "420px",
        notouch: { raw: "(hover: hover)" },
      },
      colors: {
        brand: "var(--color-brand)",
        "brand-purple": "var(--color-brand-purple)",
        "brand-yellow": "var(--color-brand-yellow)",
        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        "primary-300": "var(--color-primary-300)",
        "primary-400": "var(--color-primary-400)",
        "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "surface-100": "var(--color-surface-100)",
        "surface-200": "var(--color-surface-200)",
        "surface-300": "var(--color-surface-300)",
        "surface-400": "var(--color-surface-400)",
        "surface-500": "var(--color-surface-500)",
        "surface-600": "var(--color-surface-600)",
        "mixed-100": "var(--color-surface-mixed-100)",
        "mixed-200": "var(--color-surface-mixed-200)",
        "mixed-300": "var(--color-surface-mixed-300)",
        "mixed-400": "var(--color-surface-mixed-400)",
        "mixed-500": "var(--color-surface-mixed-500)",
        "mixed-600": "var(--color-surface-mixed-600)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        brand: ["var(--font-lora)"],
      },
    },
  },
  plugins: [],
};
