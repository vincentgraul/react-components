import { useEffect, useState } from "react";

export interface Props {
  page: number;
  totalRecords: number;
  maxRecordsPerPage?: number;
  itemNeighbours?: number;
  minItems?: number;
}

export interface Pagination {
  page: number;
  total: number;
  items: number[];
  maxRecordsPerPage: number;
  goToPage: (page: number) => void;
  goToFirst: () => void;
  goToLeft: () => void;
  goToRight: () => void;
  goToLast: () => void;
}

/**
 * React hook to manage pagination.
 * @public
 * @param props - An object which multiple properties:
 * - page: the current page
 * - totalRecords: the total number of records
 * - maxRecordsPerPage: the maximum number of records displayed per page
 * - itemNeighbours: the maximum number of items (page indicator) beside the current item
 * - minItems: the minimum of items (page indicator)
 * @returns An object with multiples properties:
 * - page: the current page
 * - total: the total number of pages
 * - items: an array of numbers (represents the page indicators)
 * - maxRecordsPerPage: the maximum number of records displayed per page
 * - some functions to change the page (goToPage, goToFirst...)
 */
export default function usePagination(props: Props): Pagination {
  const { totalRecords, itemNeighbours = 2, minItems = 5, maxRecordsPerPage = 10 } = props;
  const [page, setPage] = useState<number>(props.page);
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<number[]>([]);

  const generateItems = () => {
    const items: number[] = [];
    const from: number = Math.max(1, Math.min(page - itemNeighbours, total + 1 - minItems));
    const to: number = Math.min(total, Math.max(minItems, page + itemNeighbours));

    for (let i = from; i <= to; i++) {
      items.push(i);
    }

    return items;
  };

  useEffect(() => {
    setTotal(Math.ceil(totalRecords / maxRecordsPerPage));
  }, [totalRecords, maxRecordsPerPage]);

  useEffect(() => {
    setItems(generateItems());
  }, [page, total, itemNeighbours, minItems]);

  const goToPage = (page: number) => {
    const currentPage: number = Math.max(1, Math.min(page, total));
    setPage(currentPage);
  };

  const goToFirst = () => {
    goToPage(1);
  };

  const goToLeft = () => {
    goToPage(page - 1);
  };

  const goToRight = () => {
    goToPage(page + 1);
  };

  const goToLast = () => {
    goToPage(total);
  };

  return {
    page,
    total,
    items,
    maxRecordsPerPage,
    goToPage,
    goToFirst,
    goToLeft,
    goToRight,
    goToLast,
  };
}
