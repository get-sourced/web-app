import { Karla, JetBrains_Mono, Inter } from "next/font/google";
export const karla_font = Karla({
	variable: "--karla",
	subsets: ["latin", "latin-ext"],
});
export const jetBrains_font = JetBrains_Mono({
	variable: "--jet-brains",
	subsets: [
		"cyrillic",
		"cyrillic-ext",
		"greek",
		"latin",
		"latin-ext",
		"vietnamese",
	],
});
export const inter_font = Inter({
	variable: "--jet-brains",
	subsets: [
		"cyrillic",
		"cyrillic-ext",
		"greek",
		"latin",
		"latin-ext",
		"vietnamese",
	],
});
