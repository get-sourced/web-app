import { jetBrains_font } from "@/assets/fonts";
import React from "react";

function Footer() {
	return (
		<footer
			suppressHydrationWarning
			className={`text-secondary_color   p-5 border-t-[1px] border-zinc-500  ${jetBrains_font.className}`}
		>
			©{new Date().getFullYear()} Get Sourced
		</footer>
	);
}

export default Footer;
