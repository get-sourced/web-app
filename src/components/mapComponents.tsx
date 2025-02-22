import type { HtmlHTMLAttributes, ReactNode } from "react";
interface MapComponentProps<T>
	extends Partial<HtmlHTMLAttributes<HTMLSpanElement>> {
	items_to_map: T[];
	method: (item: T, i: number) => ReactNode;
}

function MapComponents<T>({
	items_to_map,
	method,
	className,
}: MapComponentProps<T>) {
	return (
		<span className={className}>
			{items_to_map.map((item, i) => method(item, i))}
		</span>
	);
}

export default MapComponents;
