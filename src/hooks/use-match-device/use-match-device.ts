import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { Device } from "./use-match-device.types";

export const useMatchDevice = (UA: string): Device => {
  const isClientSide: boolean = typeof window !== "undefined";

  const compute = () => {
    const parser = new UAParser(UA);
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
};
