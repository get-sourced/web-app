import {  useState } from "react";

export const useMobileMenuToggle = () => {
	const [open, setOpen] = useState(false);
	const toggleMobileMenu = () => {
		setOpen((prev) => !prev);
	};
	return { toggleMobileMenu, open };
};
