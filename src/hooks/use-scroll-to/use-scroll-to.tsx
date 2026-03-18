import { RefObject } from "react";
import { ScrollEvents } from "./use-scroll-to.types";

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
