import { useEffect, useState } from "react";

function useDebounce(value_to_delay: string, DELAY = 1000) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value_to_delay);
    }, DELAY);
    return () => {
      clearTimeout(timer);
    };
  }, [DELAY, value_to_delay]);
  return value;
}

export default useDebounce;
