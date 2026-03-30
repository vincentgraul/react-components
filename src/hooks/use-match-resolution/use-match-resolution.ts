import { useCallback, useEffect, useState } from "react";
import { useMatchDevice } from "../..";
import type { Breakpoints, MatchResolution, Resolution } from "./use-match-resolution.types";

export const defaultBreakpoints: Breakpoints = {
	desktop: "(min-width: 1281px)",
	laptop: "(min-width: 1025px) and (max-width: 1280px)",
	laptopOrUpper: "(min-width: 1025px)",
	laptopOrLower: "(max-width: 1280px)",
	tablet: "(min-width: 768px) and (max-width: 1024px)",
	tabletOrUpper: "(min-width: 768px)",
	tabletOrLower: "(max-width: 1024px)",
	largeMobile: "(min-width: 481px) and (max-width: 767px)",
	largeMobileOrUpper: "(min-width: 481px)",
	largeMobileOrLower: "(max-width: 767px)",
	mobile: "(min-width: 320px) and (max-width: 480px)",
	portrait: "(orientation: portrait)",
	landscape: "(orientation: landscape)",
};

export const useMatchResolution = (
	breakpoints: Breakpoints = defaultBreakpoints,
	UA: string,
): MatchResolution => {
	const isClientSide = typeof window !== "undefined";
	const { isDesktop, isMobile } = useMatchDevice(UA);

	const match = useCallback(
		(query: string) => isClientSide && window.matchMedia(query).matches,
		[isClientSide],
	);

	const compute = useCallback(
		(): Resolution => ({
			isDesktop: isClientSide ? match(breakpoints.desktop) : isDesktop,
			isLaptop: isClientSide ? match(breakpoints.laptop) : isDesktop,
			isLaptopOrUpper: isClientSide ? match(breakpoints.laptopOrUpper) : isDesktop,
			isLaptopOrLower: isClientSide ? match(breakpoints.laptopOrLower) : false,
			isTablet: isClientSide ? match(breakpoints.tablet) : isMobile,
			isTabletOrUpper: isClientSide ? match(breakpoints.tabletOrUpper) : false,
			isTabletOrLower: isClientSide ? match(breakpoints.tabletOrLower) : isMobile,
			isLargeMobile: isClientSide ? match(breakpoints.largeMobile) : isMobile,
			isLargeMobileOrUpper: isClientSide ? match(breakpoints.largeMobileOrUpper) : false,
			isLargeMobileOrLower: isClientSide ? match(breakpoints.largeMobileOrLower) : isMobile,
			isMobile: isClientSide ? match(breakpoints.mobile) : isMobile,
			isPortrait: isClientSide ? match(breakpoints.portrait) : false,
			isLandscape: isClientSide ? match(breakpoints.landscape) : false,
		}),
		[breakpoints, isClientSide, isDesktop, isMobile, match],
	);

	const [resolution, setResolution] = useState<Resolution>(compute());

	useEffect(() => {
		if (!isClientSide) return;

		const onResize = () => setResolution(compute());
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [isClientSide, compute]);

	return { resolution, breakpoints, match };
};
