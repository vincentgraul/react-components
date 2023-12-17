export interface BreadcrumbElementType {
  label: string;
  url: string;
}

export interface BreadcrumbType {
  url?: URL;
  mapping?: {
    url: string;
    label: string;
  }[];
}
