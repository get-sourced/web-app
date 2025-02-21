import type { ReactNode } from "react";
interface MapComponentProps<T> {
	items_to_map: T[];
	method: (item: T) => ReactNode;
}

function MapComponents<T>({ items_to_map, method }: MapComponentProps<T>) {
	return <>{items_to_map.map((item) => method(item))}</>;
}

export default MapComponents;
