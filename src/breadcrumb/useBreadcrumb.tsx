import { useEffect, useState } from "react";
import { BreadcrumbType, BreadcrumbElementType } from "./breadcrumb.types";

export default function useBreadcrumb({
  url = new URL(location.href),
  mapping,
}: BreadcrumbType): BreadcrumbElementType[] {
  const [elements, setElements] = useState<BreadcrumbElementType[]>([]);

  const prepareElements = (paths: string[]) => {
    let previousPath: string = "";
    paths.shift();

    return paths.map((path: string) => {
      let label: string = path;
      const url = `${previousPath}/${path}`;
      previousPath = url;

      if (mapping) {
        const value = mapping.find((value) => value.url === path);
        label = value ? value.label : path;
      }

      return { label, url };
    });
  };

  useEffect(() => {
    const paths: string[] = url.pathname.split("/");

    setElements(prepareElements(paths));
  }, []);

  return elements;
}
