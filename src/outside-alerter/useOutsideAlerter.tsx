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

  useEffect(() => {
    const handleOnClickOutside = (event: MouseEvent) => {
      if (event.target && ref.current) {
        const value: boolean = !ref.current.contains(event.target as Node);

        if (value !== hasClickedOutside) {
          setClickedOutside(value);
        }
      }
    };

    document.addEventListener("mousedown", handleOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleOnClickOutside);
    };
  }, [ref, hasClickedOutside]);

  return { hasClickedOutside, onReset: handleOnReset };
}
