import { useEffect, useState, RefObject } from "react";

/**
 * React hook to know if an element is visible.
 * @public
 * @param target - The target where you want to identify its visibility.
 * @returns The visibility of the target.
 */
export const useVisible = (target: RefObject<HTMLElement>): boolean => {
  const [isVisible, setVisibility] = useState<boolean>(false);

  const handleObserver = (entry: IntersectionObserverEntry) => {
    setVisibility(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => handleObserver(entry));

    if (target && target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target && target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target]);

  return isVisible;
};
