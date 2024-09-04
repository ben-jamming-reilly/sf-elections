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
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
