import { useEffect, useState } from "react";
import { Breakpoints, MatchResolution, Resolution } from "./use-match-resolution.types";
import { useMatchDevice } from "..";

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

/**
 * React hook to detect the resolution (desktop, laptop, tablet, mobile...).
 * @public
 * @param breakpoints - List of breakpoints (used for determine when a resolution is a "desktop", a "laptop" etc.).
 * @param UA - The user agent (used for determine the resolution in case of SSR).
 * @returns An object with three properties:
 * - resolution: object with multiple properties (isDesktop, isLaptop...) used for know the current resolution
 * - breakpoints: the breakpoints passed as parameters
 * - match: function used to detect the current resolution with a custom breakpoint
 */
export const useMatchResolution = (
  breakpoints: Breakpoints = defaultBreakpoints,
  UA: string = "",
): MatchResolution => {
  const isClientSide: boolean = typeof window !== "undefined";
  const { isDesktop, isMobile } = useMatchDevice(UA);

  const match = (query: string): boolean => isClientSide && window.matchMedia(query).matches;

  const compute = (): Resolution => ({
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
  });

  const [resolution, setResolution] = useState<Resolution>(compute());

  useEffect(() => {
    const onResize = () => setResolution(compute());

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setResolution(compute());
  }, [breakpoints]);

  return { resolution, breakpoints, match };
};
