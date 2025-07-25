import { useEffect, useState } from "react";

export default function useDebounce(input: string, delay: number) {
  const [str, setStr] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStr(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, delay]);

  return str;
}
