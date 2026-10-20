import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          background: "#0b1014",
          surface: "#11171c",
          raised: "#151c21",
          border: "#293239",
          text: "#f5f5f3",
          muted: "#aeb7bf",
        },
      },
      fontFamily: {
        "portfolio-serif": ["Georgia", "Times New Roman", "serif"],
        "portfolio-sans": ["Inter", "sans-serif"],
      },
      borderRadius: { portfolio: "0.625rem" },
      maxWidth: { portfolio: "80rem" },
      spacing: { section: "3rem" },
      sans: ["Inter", "sans-serif"],
      heading: ["Plus Jakarta Sans", "sans-serif"],
    },
  },
  plugins: [typography],
};
