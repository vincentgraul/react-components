import { RefObject } from "react";
import { ScrollEvents } from "./use-scroll-to.types";

/**
 * React hook to scroll to an element.
 * @public
 * @param target - The target where we want to scroll.
 * @returns An object which contains:
 * - scrollToTop: function used to scroll to the top of the element
 */
export const useScrollTo = (target: RefObject<HTMLElement>): ScrollEvents => {
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
};
