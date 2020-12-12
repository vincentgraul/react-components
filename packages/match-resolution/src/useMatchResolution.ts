import { useEffect, useState } from "react";
import useMatchUserAgent from "@react-components/match-user-agent";

export interface Breakpoints {
  desktop: string;
  laptop: string;
  laptopOrUpper: string;
  laptopOrLower: string;
  tablet: string;
  tabletOrUpper: string;
  tabletOrLower: string;
  largeMobile: string;
  largeMobileOrUpper: string;
  largeMobileOrLower: string;
  mobile: string;
  portrait: string;
  landscape: string;
}

export interface Resolution {
  isDesktop: () => boolean;
  isLaptop: () => boolean;
  isLaptopOrUpper: () => boolean;
  isLaptopOrLower: () => boolean;
  isTablet: () => boolean;
  isTabletOrUpper: () => boolean;
  isTabletOrLower: () => boolean;
  isLargeMobile: () => boolean;
  isLargeMobileOrUpper: () => boolean;
  isLargeMobileOrLower: () => boolean;
  isMobile: () => boolean;
  isPortrait: () => boolean;
  isLandscape: () => boolean;
}

export interface MatchResolution {
  resolution: Resolution;
  breakpoints: Breakpoints;
  match: (query: string) => boolean;
}

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

export default function useMatchResolution(
  breakpoints: Breakpoints = defaultBreakpoints,
  UA: string = ""
): MatchResolution {
  const isClientSide: boolean = typeof window !== "undefined";
  const { isDesktop, isMobile } = useMatchUserAgent(UA);

  const match = (query: string): boolean =>
    isClientSide && window.matchMedia(query).matches;

  const compute = (): Resolution => ({
    isDesktop: () => (isClientSide ? match(breakpoints.desktop) : isDesktop),
    isLaptop: () => (isClientSide ? match(breakpoints.laptop) : isDesktop),
    isLaptopOrUpper: () =>
      isClientSide ? match(breakpoints.laptopOrUpper) : isDesktop,
    isLaptopOrLower: () =>
      isClientSide ? match(breakpoints.laptopOrLower) : false,
    isTablet: () => (isClientSide ? match(breakpoints.tablet) : isMobile),
    isTabletOrUpper: () =>
      isClientSide ? match(breakpoints.tabletOrUpper) : false,
    isTabletOrLower: () =>
      isClientSide ? match(breakpoints.tabletOrLower) : isMobile,
    isLargeMobile: () =>
      isClientSide ? match(breakpoints.largeMobile) : isMobile,
    isLargeMobileOrUpper: () =>
      isClientSide ? match(breakpoints.largeMobileOrUpper) : false,
    isLargeMobileOrLower: () =>
      isClientSide ? match(breakpoints.largeMobileOrLower) : isMobile,
    isMobile: () => (isClientSide ? match(breakpoints.mobile) : isMobile),
    isPortrait: () => (isClientSide ? match(breakpoints.portrait) : false),
    isLandscape: () => (isClientSide ? match(breakpoints.landscape) : false),
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
}
