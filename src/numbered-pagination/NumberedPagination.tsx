import React, { ReactNode } from "react";
import styled from "styled-components";
import { Pagination } from "../pagination/usePagination";

export enum ArrowPosition {
  LEFT,
  RIGHT,
}

export interface NumberedPaginationProps extends Pagination {
  renderSingleArrow?: (position: ArrowPosition) => ReactNode;
  renderDoubleArrow?: (position: ArrowPosition) => ReactNode;
  className?: string;
}

/**
 * React component used to display a pagination (with numbers).
 * @public
 * @param props - An object which contains:
 * - properties inherited from the Pagination interface in usePagination hook
 * - some properties to customise the rendering
 * @returns A React component.
 */
export default function NumberedPagination(props: NumberedPaginationProps) {
  const {
    page,
    total,
    items,
    goToFirst,
    goToLeft,
    goToRight,
    goToLast,
    goToPage,
    renderSingleArrow,
    renderDoubleArrow,
    className = "",
  } = props;

  return (
    <Container className={`${className} pagination`}>
      {page > 1 && (
        <>
          {renderDoubleArrow && (
            <Item
              className="pagination-item pagination-item-arrow pagination-item-double-arrow"
              onClick={() => goToFirst()}
            >
              {renderDoubleArrow(ArrowPosition.LEFT)}
            </Item>
          )}

          {renderSingleArrow && (
            <Item
              className="pagination-item pagination-item-arrow pagination-item-single-arrow"
              onClick={() => goToLeft()}
            >
              {renderSingleArrow(ArrowPosition.LEFT)}
            </Item>
          )}
        </>
      )}

      {items.map((page: number, index: number) => (
        <Item
          className={`pagination-item pagination-item-number ${
            page === props.page ? "selected" : ""
          }`}
          key={index}
          onClick={() => goToPage(page)}
        >
          {page}
        </Item>
      ))}

      {page < total && (
        <>
          {renderSingleArrow && (
            <Item
              className="pagination-item pagination-item-arrow pagination-item-single-arrow"
              onClick={() => goToRight()}
            >
              {renderSingleArrow(ArrowPosition.RIGHT)}
            </Item>
          )}

          {renderDoubleArrow && (
            <Item
              className="pagination-item pagination-item-arrow pagination-item-double-arrow"
              onClick={() => goToLast()}
            >
              {renderDoubleArrow(ArrowPosition.RIGHT)}
            </Item>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`
  &:first-child {
    border-width: 1px 1px 1px 1px;
  }
  border-style: solid;
  border-width: 1px 1px 1px 0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
