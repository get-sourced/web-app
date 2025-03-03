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
    <div className={className}>
      {items_to_map.map((item) => {
        return method(item);
      })}
    </div>
  );
}

export default MapComponents;
