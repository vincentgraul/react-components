import { type RefObject, useEffect, useState } from "react";
import type { OutsideAlerter } from "./use-outside-alerter.types";

export const useOutsideAlerter = (ref: RefObject<HTMLElement | null>): OutsideAlerter => {
	const [hasClickedOutside, setClickedOutside] = useState<boolean>(false);

	const handleOnReset = () => {
		setClickedOutside(false);
	};

	useEffect(() => {
		const handleOnClickOutside = (event: MouseEvent) => {
			if (event.target && ref.current) {
				const value = !ref.current.contains(event.target as Node);
				setClickedOutside(value);
			}
		};

		document.addEventListener("mousedown", handleOnClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleOnClickOutside);
		};
	}, [ref]);

	return { hasClickedOutside, onReset: handleOnReset };
};
