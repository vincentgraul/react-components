export type BreadcrumbElementType = {
  label: string;
  url: string;
};

export type BreadcrumbType = {
  url?: URL;
  mapping?: {
    url: string;
    label: string;
  }[];
};
