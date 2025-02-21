import { useEffect, useState } from "react";

export const useTheme = () => {
	const [dark, setDark] = useState<boolean>(!!localStorage.getItem("dark"));
	const toggle = () => {
		setDark((prev) => !prev);
	};
	useEffect(() => {
		if (dark) {
			window.document.body.setAttribute("data-theme", `${dark}`);
			localStorage.setItem("dark", "true");
		} else {
			window.document.body.removeAttribute("data-theme");
			localStorage.removeItem("dark");
		}
	}, [dark]);

	return { dark, toggle };
};
