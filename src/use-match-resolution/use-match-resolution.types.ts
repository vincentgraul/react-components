export type Breakpoints = {
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
};

export type Resolution = {
  isDesktop: boolean;
  isLaptop: boolean;
  isLaptopOrUpper: boolean;
  isLaptopOrLower: boolean;
  isTablet: boolean;
  isTabletOrUpper: boolean;
  isTabletOrLower: boolean;
  isLargeMobile: boolean;
  isLargeMobileOrUpper: boolean;
  isLargeMobileOrLower: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
};

export type MatchResolution = {
  resolution: Resolution;
  breakpoints: Breakpoints;
  match: (query: string) => boolean;
};
