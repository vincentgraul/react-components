import React, { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./numbered-pagination.module.css";
import { Pagination } from "..";
import { NumberedPaginationColors } from "./numbered-pagination.types";

export enum ArrowPosition {
  LEFT,
  RIGHT,
}

type Props = Pagination & {
  colors?: NumberedPaginationColors;
  renderSingleArrow?: (position: ArrowPosition) => ReactNode;
  renderDoubleArrow?: (position: ArrowPosition) => ReactNode;
};

/**
 * React component used to display a pagination (with numbers).
 * @public
 * @param props - An object which contains:
 * - properties inherited from the Pagination interface in usePagination hook
 * - some properties to customise the rendering
 * @returns A React component.
 */
export const NumberedPagination = ({
  page,
  total,
  items,
  colors,
  goToFirst,
  goToLeft,
  goToRight,
  goToLast,
  goToPage,
  renderSingleArrow,
  renderDoubleArrow,
}: Props) => {
  const CSSVariables = {
    "--hover-background-color": colors?.hover.background,
    "--hover-text-color": colors?.hover.text,
    "--selected-background-color": colors?.selected.background,
    "--selected-text-color": colors?.selected.text,
  } as CSSProperties;

  return (
    <div className={styles.container} style={CSSVariables}>
      {page > 1 && (
        <>
          {renderDoubleArrow && (
            <div className={styles.item} onClick={() => goToFirst()}>
              {renderDoubleArrow(ArrowPosition.LEFT)}
            </div>
          )}

          {renderSingleArrow && (
            <div className={styles.item} onClick={() => goToLeft()}>
              {renderSingleArrow(ArrowPosition.LEFT)}
            </div>
          )}
        </>
      )}

      {items.map((currentPage: number, index: number) => (
        <div
          className={clsx(styles.item, currentPage === page && styles.selected)}
          key={index}
          onClick={() => goToPage(currentPage)}
        >
          {currentPage}
        </div>
      ))}

      {page < total && (
        <>
          {renderSingleArrow && (
            <div className={styles.item} onClick={() => goToRight()}>
              {renderSingleArrow(ArrowPosition.RIGHT)}
            </div>
          )}

          {renderDoubleArrow && (
            <div className={styles.item} onClick={() => goToLast()}>
              {renderDoubleArrow(ArrowPosition.RIGHT)}
            </div>
          )}
        </>
      )}
    </div>
  );
};
