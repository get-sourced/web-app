import { useEffect, useRef, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
	ref: RefObject<T | null>,
	callBack: () => void,
	condition: boolean,
) => {
	const func = useRef(callBack);
	useEffect(() => {
		const abort = new AbortController();
		window.document.addEventListener(
			"click",
			(e) => {
				e.stopPropagation();
				const path = e.composedPath();
				if (ref.current && !path.includes(ref.current) && condition) {
					func.current();
				}
			},
			{
				signal: abort.signal,
			},
		);
		return () => abort.abort();
	}, [ref, condition]);
};
