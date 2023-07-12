const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
      serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
    },
    // fontSize: {
    //   "1xl": [
    //     "1.25rem",
    //     {
    //       lineHeight: "1.75rem",
    //       letterSpacing: "0em",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "2xl": [
    //     "1.5rem",
    //     {
    //       lineHeight: "2rem",
    //       letterSpacing: "-0.01em",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "3xl": [
    //     "1.875rem",
    //     {
    //       lineHeight: "2.25rem",
    //       letterSpacing: "-0.02em",
    //       fontWeight: "700",
    //     },
    //   ],
    //   btn: [
    //     "1rem",
    //     {
    //       lineHeight: "1.25rem",
    //       letterSpacing: "0em",
    //       fontWeight: "500",
    //     },
    //   ],
    // },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
