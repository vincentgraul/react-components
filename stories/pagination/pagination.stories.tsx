import { usePagination, Pagination } from "../../src";

export default {
  title: "Pagination",
  component: Pagination,
};

export const Basic = () => {
  const pagination = usePagination({ page: 1, totalRecords: 15 });
  return <Pagination {...pagination} />;
};

export const WithOnePage = () => {
  const pagination = usePagination({ page: 1, totalRecords: 5 });
  return <Pagination {...pagination} />;
};

export const WithMultiplePages = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });
  return <Pagination {...pagination} />;
};

export const WithSingleArrow = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <Pagination
      {...pagination}
      renderSingleArrow={(position) => (position === "left" ? "<" : ">")}
    />
  );
};

export const WithMultipleArrow = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <Pagination
      {...pagination}
      renderDoubleArrow={(position) => (position === "left" ? "<<" : ">>")}
    />
  );
};

export const WithSingleAndMultipleArrows = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <Pagination
      {...pagination}
      renderSingleArrow={(position) => (position === "left" ? "<" : ">")}
      renderDoubleArrow={(position) => (position === "left" ? "<<" : ">>")}
    />
  );
};

export const WithSingleAndMultipleArrowsImage = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <Pagination
      {...pagination}
      renderSingleArrow={(position) => (
        <img
          style={{ minWidth: 0, minHeight: 0, width: "0.5rem" }}
          src={
            position === "left"
              ? "./assets/single-left-arrow.svg"
              : "./assets/single-right-arrow.svg"
          }
        />
      )}
      renderDoubleArrow={(position) => (
        <img
          style={{ minWidth: 0, minHeight: 0, width: "0.8rem" }}
          src={
            position === "left"
              ? "./assets/double-left-arrow.svg"
              : "./assets/double-right-arrow.svg"
          }
        />
      )}
    />
  );
};
