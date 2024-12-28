import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5E50F4",
        secondary: "#B1F9F3",
        error: "#F45050",
        textColor: "#212121",
        blue: {
          50: "#E5EFFD",
          70: "#EDECFE",
          100: "#CBC7FA",
          200: "#B8B2FA",
          300: "#8C82F7",
          400: "#5E50F4",
          500: "#4739DB",
          600: "#362CA8",
          700: "#2C24A8",
          800: "#241D70",
          900: "#1C1757",
        },
        gray: {
          30: "#EEEDF5",
          50: "#E7E6ED",
          100: "#CECDD4",
          200: "#B5B5BA",
          300: "#9C9CA1",
          400: "#838387",
          500: "#686A6E",
          600: "#525254",
          700: "#39393B",
          800: "#202021",
          900: "#070708",
        },
        kakao: "#FEE500",
        flat: "#EFF3FB",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      spacing: {
        header: "48px",
        navbar: "80px",
      },
      height: {
        content: "calc(100dvh - var(--header-height) - var(--navbar-height))",
      },
      zIndex: {
        header: "20",
        navbar: "10",
        bottomSheet: "30",
        modal: "40",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--header-height": theme("spacing.header"),
          "--navbar-height": theme("spacing.navbar"),
          "--content-height": theme("height.content"),
        },
      });
    }),
  ],
};
export default config;
