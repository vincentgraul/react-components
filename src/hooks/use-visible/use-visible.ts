import { type RefObject, useEffect, useState } from "react";

export const useVisible = (target: RefObject<HTMLElement>): boolean => {
	const [isVisible, setVisibility] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setVisibility(entry.isIntersecting));

		if (target?.current) {
			observer.observe(target.current);
		}

		return () => {
			if (target?.current) {
				observer.unobserve(target.current);
			}
		};
	}, [target]);

	return isVisible;
};
