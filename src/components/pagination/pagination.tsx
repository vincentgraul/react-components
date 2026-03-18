import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./pagination.module.css";
import { PaginationData, PaginationColors } from "../..";

export type PaginationProps = PaginationData & {
  colors?: PaginationColors;
  renderSingleArrow?: (position: "left" | "right") => ReactNode;
  renderDoubleArrow?: (position: "left" | "right") => ReactNode;
  className?: string;
};

export const Pagination = ({
  className,
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
}: PaginationProps) => {
  const CSSVariables = {
    "--hover-background-color": colors?.hover.background ?? "rgb(211, 211, 211)",
    "--hover-text-color": colors?.hover.text ?? "rgb(0, 0, 0)",
    "--selected-background-color": colors?.selected.background ?? "rgb(0, 0, 0)",
    "--selected-text-color": colors?.selected.text ?? "rgb(255, 255, 255)",
  } as CSSProperties;

  return (
    <div className={clsx(styles.container, className)} style={CSSVariables}>
      {page > 1 && (
        <>
          {renderDoubleArrow && (
            <div className={styles.item} onClick={() => goToFirst()}>
              {renderDoubleArrow("left")}
            </div>
          )}

          {renderSingleArrow && (
            <div className={styles.item} onClick={() => goToLeft()}>
              {renderSingleArrow("left")}
            </div>
          )}
        </>
      )}

      {items.map((currentPage: number) => (
        <div
          className={clsx(styles.item, currentPage === page && styles.selected)}
          key={currentPage}
          onClick={() => goToPage(currentPage)}
        >
          {currentPage}
        </div>
      ))}

      {page < total && (
        <>
          {renderSingleArrow && (
            <div className={styles.item} onClick={() => goToRight()}>
              {renderSingleArrow("right")}
            </div>
          )}

          {renderDoubleArrow && (
            <div className={styles.item} onClick={() => goToLast()}>
              {renderDoubleArrow("right")}
            </div>
          )}
        </>
      )}
    </div>
  );
};
