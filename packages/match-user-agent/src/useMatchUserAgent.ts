import { useEffect, useState } from "react";
import UAParserJS from "ua-parser-js";

export interface UserAgent {
  isMobile: boolean;
  isDesktop: boolean;
}

export interface Regex {
  mobile: RegExp;
}

export const defaultRegex = { mobile: /iOS|Android/i };

export default function useMatchUserAgent(UA: string, regex: Regex = defaultRegex): UserAgent {
  const isClientSide: boolean = typeof window !== "undefined";

  const compute = (OS: IUAParser.IOS) => ({
    isMobile: OS && OS.name ? regex.mobile.test(OS.name) : false,
    isDesktop: OS && OS.name ? !regex.mobile.test(OS.name) : false,
  });

  const getOS = () => {
    const parser = new UAParserJS.UAParser(UA);
    return parser.getOS();
  };

  if (!isClientSide) {
    return compute(getOS());
  }

  const [userAgent, setUserAgent] = useState<UserAgent>(compute(getOS()));

  useEffect(() => {
    setUserAgent(compute(getOS()));
  }, [UA]);

  return userAgent;
}
