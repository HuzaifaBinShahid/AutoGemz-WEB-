import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'small': '425px',
        'xs': '375px',
        'xxs': '320px',
      },
      colors: {
        // Custom colors - base colors
        customRed: "#DC3729",
        customTeal: "#2DD4BF",
        customGray: "#BAC0CA",
        customGreen: "#27C840",
        customDarkRed: "#78160E",
        customDarkGray: "#2E2E2E",
        customRedAlpha66: "rgba(220, 55, 41, 0.65)", // #DC3729A6
        customRedAlpha30: "rgba(220, 55, 41, 0.30)", // #DC37294D
        customGreenAlpha21: "rgba(39, 200, 64, 0.21)", // #27C84036
        info: "#A5A5A5",
      },
      fontFamily: {
        Inter: ['"Inter"', "sans-serif"],
        mulish: ["var(--font-mulish)", "Mulish", "sans-serif"],
        display: ["var(--font-chakra)", "Chakra Petch", "sans-serif"],
        jakarta: ["var(--font-jakarta)", '"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

