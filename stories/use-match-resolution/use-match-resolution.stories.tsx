import { useMatchResolution } from "../../src";

export default {
  title: "useMatchResolution",
  component: useMatchResolution,
};

export const Basic = () => {
  const { resolution } = useMatchResolution();

  return (
    <div>
      <p>Screen resolutions:</p>
      <ul>
        <li>{`isDesktop: ${resolution.isDesktop}`}</li>
        <li>{`isLaptop: ${resolution.isLaptop}`}</li>
        <li>{`isLaptopOrUpper: ${resolution.isLaptopOrUpper}`}</li>
        <li>{`isLaptopOrLower: ${resolution.isLaptopOrLower}`}</li>
        <li>{`isTablet: ${resolution.isTablet}`}</li>
        <li>{`isTabletOrUpper: ${resolution.isTabletOrUpper}`}</li>
        <li>{`isTabletOrLower: ${resolution.isTabletOrLower}`}</li>
        <li>{`isLargeMobile: ${resolution.isLargeMobile}`}</li>
        <li>{`isLargeMobileOrUpper: ${resolution.isLargeMobileOrUpper}`}</li>
        <li>{`isLargeMobileOrLower: ${resolution.isLargeMobileOrLower}`}</li>
        <li>{`isMobile: ${resolution.isMobile}`}</li>
        <li>{`isPortrait: ${resolution.isPortrait}`}</li>
        <li>{`isLandscape: ${resolution.isLandscape}`}</li>
      </ul>
    </div>
  );
};
