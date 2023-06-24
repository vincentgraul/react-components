import { useEffect, RefObject, useState } from "react";

export default function useOutsideAlerter(ref: RefObject<HTMLElement>): boolean {
  const [hasClickedOutside, setClickedOutside] = useState<boolean>(false);

  const handleOnClickOutside = (event: MouseEvent) => {
    if (event.target && ref.current) {
      if (!ref.current.contains(event.target as Node)) {
        setClickedOutside(true);
      }
    }
  };

  useEffect(() => {
    if (ref) {
      document.addEventListener("mousedown", (event: MouseEvent) => handleOnClickOutside(event));
    }
    return () => {
      document.removeEventListener("mousedown", (event: MouseEvent) => handleOnClickOutside(event));
    };
  }, [ref]);

  return hasClickedOutside;
}
