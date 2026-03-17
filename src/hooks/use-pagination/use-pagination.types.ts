export type PaginationData = {
  page: number;
  total: number;
  items: number[];
  maxRecordsPerPage: number;
  goToPage: (page: number) => void;
  goToFirst: () => void;
  goToLeft: () => void;
  goToRight: () => void;
  goToLast: () => void;
};
