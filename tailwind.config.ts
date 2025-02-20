import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_color: "#171717",
        secondary_color: "#262626",
        light_grey: "#a3a3a3",
      },
      fontSize: {
        base: "14px",
      },
    },
  },
  plugins: [],
} satisfies Config;
