import { useEffect, useState } from "react";

interface Breakpoints {
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
}

interface Resolution {
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
}

export interface MatchResolution {
  resolution: Resolution;
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
  mobile: "(min-width: 320px) and (max-width: 480px)"
};

export default function useMatchResolution(
  breakpoints: Breakpoints = defaultBreakpoints
): MatchResolution {
  const compute = (): Resolution => ({
    isDesktop: () => match(breakpoints.desktop),
    isLaptop: () => match(breakpoints.laptop),
    isLaptopOrUpper: () => match(breakpoints.laptopOrUpper),
    isLaptopOrLower: () => match(breakpoints.laptopOrLower),
    isTablet: () => match(breakpoints.tablet),
    isTabletOrUpper: () => match(breakpoints.tabletOrUpper),
    isTabletOrLower: () => match(breakpoints.tabletOrLower),
    isLargeMobile: () => match(breakpoints.largeMobile),
    isLargeMobileOrUpper: () => match(breakpoints.largeMobileOrUpper),
    isLargeMobileOrLower: () => match(breakpoints.largeMobileOrLower),
    isMobile: () => match(breakpoints.mobile)
  });

  const [resolution, setResolution] = useState<Resolution>(compute());
  const match = (query: string): boolean => window.matchMedia(query).matches;

  useEffect(() => {
    setResolution(compute());
  }, [breakpoints]);

  return { resolution, match };
}
