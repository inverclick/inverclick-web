import type { Config } from "tailwindcss";
const animations = require("@midudev/tailwind-animations");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        "screen-with-header": "calc(100vh - 5rem)",
      },
      colors: {
        primary: {
          DEFAULT: "#8253ff",
          "50": "#f5f2ff",
          "100": "#ebe8ff",
          "200": "#dbd4ff",
          "300": "#c0b1ff",
          "400": "#a085ff",
          "500": "#8253ff",
          "600": "#7330f7",
          "700": "#651ee3",
          "800": "#5419be",
          "900": "#47169c",
          "950": "#2a0b6a",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), animations],
} satisfies Config;

export default config;
