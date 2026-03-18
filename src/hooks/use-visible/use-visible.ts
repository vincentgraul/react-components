import { useEffect, useState, RefObject } from "react";

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
