import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

export interface Device {
  isMobile: boolean;
  isTablet: boolean;
  isMobileOrTablet: boolean;
  isDesktop: boolean;
}

/**
 * React hook to detect the device (mobile, tablet or desktop) based on the user agent.
 * @public
 * @param UA - The user agent.
 * @returns An object with multiple properties (isMobile, isTablet...) used to detect the device.
 */
export default function useMatchDevice(UA: string): Device {
  const isClientSide: boolean = typeof window !== "undefined";

  const compute = () => {
    const parser = new UAParser.UAParser(UA);
    const { type } = parser.getDevice();

    const device: Device = {
      isMobile: type === "mobile",
      isTablet: type === "tablet",
      isMobileOrTablet: false,
      isDesktop: !type,
    };

    device.isMobileOrTablet = device.isMobile || device.isTablet;

    return device;
  };

  if (!isClientSide) {
    return compute();
  }

  const [device, setDevice] = useState<Device>(compute());

  useEffect(() => {
    setDevice(compute());
  }, [UA]);

  return device;
}
