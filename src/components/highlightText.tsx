import { jetBrains_font } from "@/assets/fonts";
import type { HTMLAttributes, ReactNode } from "react";
interface HighlightTextProp
	extends Partial<Pick<HTMLAttributes<HTMLSpanElement>, "className">> {
	children: ReactNode;
}
function HightLightText({ children, className }: HighlightTextProp) {
	return (
		<span
			className={`${jetBrains_font.className} font-bold text-orange-700 ${className}`}
		>
			{children}
		</span>
	);
}

export default HightLightText;
