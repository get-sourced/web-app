import type { HtmlHTMLAttributes, ReactNode } from "react";
interface MapComponentProps<T>
	extends Partial<HtmlHTMLAttributes<HTMLSpanElement>> {
	items_to_map: T[];
	method: (item: T) => ReactNode;
}

function MapComponents<T>({
	items_to_map,
	method,
	className,
}: MapComponentProps<T>) {
	return (
		<ul className={className}>
			{items_to_map.map((item) => {
				const index = `${Math.random() * 10000000}}`;
				return (
					<li className="w-fit h-fit" key={index}>
						{method(item)}
					</li>
				);
			})}
		</ul>
	);
}

export default MapComponents;
