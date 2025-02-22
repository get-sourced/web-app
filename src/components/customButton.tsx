import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

function CustomLinkButton({ children, className, ...props }: AnchorProps) {
	return (
		<Link
			className={`${className} p-2 bg-secondary_color text-primary_color w-fit px-5   border-secondary_color relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-secondary_color after:-z-10 hover:after:scale-150 hover:after:opacity-0 after:transition-all font-bold duration-700 delay-100`}
			{...props}
		>
			{children}
		</Link>
	);
}

export default CustomLinkButton;
