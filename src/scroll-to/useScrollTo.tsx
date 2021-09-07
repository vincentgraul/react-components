import { RefObject, useEffect } from "react";

export interface ScrollEvents {
  scrollToTop: () => void;
}

export default function useScrollTo(
  ref: RefObject<HTMLElement>,
  watchLocation?: boolean
): ScrollEvents {
  const isClientSide: boolean = typeof window !== "undefined";

  if (!isClientSide) {
    return { scrollToTop: () => null };
  }

  const deps: [RefObject<HTMLElement>, string?] = [ref];

  if (watchLocation) {
    const { pathname } = window.location;
    deps.push(pathname);
  }

  const scrollToTop = (): void => {
    if (ref.current) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  };

  useEffect(() => {
    if (watchLocation) {
      scrollToTop();
    }
  }, deps);

  return { scrollToTop };
}
