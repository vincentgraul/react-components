import { RefObject } from "react";

export interface ScrollEvents {
  scrollToTop: () => void;
}

/**
 * React hook to scroll to an element.
 * @public
 * @param target - The target where we want to scroll.
 * @returns An object which contains:
 * - scrollToTop: function used to scroll to the top of the element
 */
export default function useScrollTo(target: RefObject<HTMLElement>): ScrollEvents {
  const isClientSide: boolean = typeof window !== "undefined";

  if (!isClientSide) {
    return { scrollToTop: () => null };
  }

  const scrollToTop = (): void => {
    if (target.current) {
      window.scrollTo(0, target.current.offsetTop);
    }
  };

  return { scrollToTop };
}
