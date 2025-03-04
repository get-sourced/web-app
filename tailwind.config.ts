import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        "300": "300ms",
      },
      fontSize: {
        xs: "0.75rem",
        lg: "1rem ",
        xl: " 1.25rem ",
      },
      opacity: {
        "0": "0",
        "100": "1",
      },
      scale: {
        "80": "0.8",
        "100": "1",
      },
      backgroundColor: {
        Light: "#f3f4f6",
        Dark: "#181818",
        LLightBlue: "#d3e4ff",
        LDarkBlue: "#b0ccfa",
        DLightBlue: "#76a5f0",
        DDarkBlue: "#4569a4",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        success: "#b5f8c5",
        error: "#feb7b8",
        warning: "#fae7c7",
        repoBg: "var( --repo-bg)",
        primary_color: "var(--primary_color)",
        secondary_color: "var(--color-secondary_color)",
        light_grey: "var(--light_grey)",
        lighterBlack: "var(--lighterBlack)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blue_custom: "#2563eb",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
