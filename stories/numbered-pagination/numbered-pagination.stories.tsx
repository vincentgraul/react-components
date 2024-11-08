import { usePagination, NumberedPagination, ArrowPosition } from "../../src";

export default {
  title: "Numbered Pagination",
  component: NumberedPagination,
};

export const Basic = () => {
  const pagination = usePagination({ page: 1, totalRecords: 15 });
  return <NumberedPagination {...pagination} />;
};

export const WithOnePage = () => {
  const pagination = usePagination({ page: 1, totalRecords: 5 });
  return <NumberedPagination {...pagination} />;
};

export const WithMultiplePages = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });
  return <NumberedPagination {...pagination} />;
};

export const WithSingleArrow = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <NumberedPagination
      {...pagination}
      renderSingleArrow={(position: ArrowPosition) => (position === ArrowPosition.LEFT ? "<" : ">")}
    />
  );
};

export const WithMultipleArrow = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <NumberedPagination
      {...pagination}
      renderDoubleArrow={(position: ArrowPosition) =>
        position === ArrowPosition.LEFT ? "<<" : ">>"
      }
    />
  );
};

export const WithSingleAndMultipleArrows = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <NumberedPagination
      {...pagination}
      renderSingleArrow={(position: ArrowPosition) => (position === ArrowPosition.LEFT ? "<" : ">")}
      renderDoubleArrow={(position: ArrowPosition) =>
        position === ArrowPosition.LEFT ? "<<" : ">>"
      }
    />
  );
};

export const WithSingleAndMultipleArrowsImage = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <NumberedPagination
      {...pagination}
      renderSingleArrow={(position: ArrowPosition) => (
        <img
          style={{ minWidth: 0, minHeight: 0, width: "0.5rem" }}
          src={
            position === ArrowPosition.LEFT
              ? "./assets/single-left-arrow.svg"
              : "./assets/single-right-arrow.svg"
          }
        />
      )}
      renderDoubleArrow={(position: ArrowPosition) => (
        <img
          style={{ minWidth: 0, minHeight: 0, width: "0.8rem" }}
          src={
            position === ArrowPosition.LEFT
              ? "./assets/double-left-arrow.svg"
              : "./assets/double-right-arrow.svg"
          }
        />
      )}
    />
  );
};
