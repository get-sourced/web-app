import { useEffect, useRef, useState } from "react";

function useIO(option = { rootMargin: "0px", threshold: 1 }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry in entries) {
          if (entries[entry].isIntersecting) {
            setIsIntersecting(true);
          } else {
            setIsIntersecting(false);
          }
        }
      },
      {
        root: null,
        ...option,
      }
    );
    observer.observe(elementRef.current as HTMLElement);
  }, [option]);
  return { isIntersecting, elementRef };
}

export default useIO;
