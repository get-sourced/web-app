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
				primary_color: "var(--primary_color)",
				secondary_color: "var(--color-secondary_color)",
				light_grey: "var(--light_grey)",
			},
			fontSize: {
				base: "14px",
			},
		},
	},
	plugins: [],
} satisfies Config;
