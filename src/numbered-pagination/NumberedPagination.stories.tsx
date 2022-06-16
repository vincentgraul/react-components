import React from "react";
import styled from "styled-components";
import NumberedPagination, { ArrowPosition } from "./NumberedPagination";
import usePagination from "../pagination/usePagination";

export default {
  title: "Numbered Pagination",
  component: NumberedPagination,
};

const Pagination = styled(NumberedPagination)`
  display: inline-flex;

  .pagination-item:hover:not(.selected) {
    background-color: lightgrey;
    color: black;
  }

  .selected {
    background-color: black;
    color: white;
  }
`;

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
      renderSingleArrow={(position: ArrowPosition) => (position === ArrowPosition.LEFT ? "<" : ">")}
    />
  );
};

export const WithMultipleArrow = () => {
  const pagination = usePagination({ page: 1, totalRecords: 150 });

  return (
    <Pagination
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
    <Pagination
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

  const BlackPagination = styled(Pagination)`
    background-color: black;
    color: white;

    .selected {
      background-color: white;
      color: black;
    }
  `;

  const SingleArrow = styled.img`
    min-width: 0;
    min-height: 0;
    width: 0.5rem;
  `;

  const DoubleArrow = styled.img`
    min-width: 0;
    min-height: 0;
    width: 0.8rem;
  `;

  return (
    <BlackPagination
      {...pagination}
      renderSingleArrow={(position: ArrowPosition) => (
        <SingleArrow
          src={
            position === ArrowPosition.LEFT
              ? require("../../stories/assets/pagination/single-left-arrow.svg")
              : require("../../stories/assets/pagination/single-right-arrow.svg")
          }
        />
      )}
      renderDoubleArrow={(position: ArrowPosition) => (
        <DoubleArrow
          src={
            position === ArrowPosition.LEFT
              ? require("../../stories/assets/pagination/double-left-arrow.svg")
              : require("../../stories/assets/pagination/double-right-arrow.svg")
          }
        />
      )}
    />
  );
};
