import { useEffect, RefObject, useState } from "react";

interface OutsideAlerter {
  hasClickedOutside: boolean;
  onReset: () => void;
}

export default function useOutsideAlerter(ref: RefObject<HTMLElement>): OutsideAlerter {
  const [hasClickedOutside, setClickedOutside] = useState<boolean>(false);

  const handleOnReset = () => {
    setClickedOutside(false);
  };

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

  return { hasClickedOutside, onReset: handleOnReset };
}
