import useMatchDevice, { Device } from "./useMatchDevice";

export default {
  title: "useMatchDevice",
  component: useMatchDevice,
};

export const Basic = () => {
  const device: Device = useMatchDevice(navigator.userAgent);

  return (
    <div>
      <p>Device informations (based on user agent):</p>
      <ul>
        <li>{`isMobile: ${device.isMobile}`}</li>
        <li>{`isTablet: ${device.isTablet}`}</li>
        <li>{`isMobileOrTablet: ${device.isMobileOrTablet}`}</li>
        <li>{`isDesktop: ${device.isDesktop}`}</li>
      </ul>
    </div>
  );
};
