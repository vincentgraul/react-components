import { useEffect, useState, RefObject } from "react";

export default function useVisible(
  ref: RefObject<HTMLElement>
): boolean {
  const [isVisible, setVisibility] = useState<boolean>(false);

  const handleObserver = (entry: IntersectionObserverEntry) => {
    const rect: DOMRectReadOnly = entry.boundingClientRect;
    const element: Element | undefined = document
      .elementsFromPoint(rect.x, rect.y)
      .find((element: Element) => element.className === entry.target.className);

    alert(entry.isIntersecting);
    setVisibility(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      handleObserver(entry)
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}
