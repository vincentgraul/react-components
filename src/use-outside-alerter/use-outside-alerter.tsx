import { useEffect, RefObject, useState } from "react";
import { OutsideAlerter } from "./use-outside-alerter.types";

export const useOutsideAlerter = (ref: RefObject<HTMLElement | null>): OutsideAlerter => {
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
};
