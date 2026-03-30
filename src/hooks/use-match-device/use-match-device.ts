import { UAParser } from "ua-parser-js";
import type { Device } from "./use-match-device.types";

export const useMatchDevice = (UA: string): Device => {
	const uap = new UAParser(UA);
	const device = uap.getDevice();

	return {
		isMobile: device.is("mobile"),
		isTablet: device.is("tablet"),
		isMobileOrTablet: device.is("mobile") || device.is("tablet"),
		isDesktop: !device.type,
	};
};
