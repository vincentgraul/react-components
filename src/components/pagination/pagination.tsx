import clsx from "clsx";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { PaginationData } from "../..";
import styles from "./pagination.module.css";

export type PaginationProps = PaginationData & {
	itemColor?: string;
	itemBackgroundColor?: string;
	itemHoverColor?: string;
	itemHoverBackgroundColor?: string;
	itemActiveColor?: string;
	itemActiveBackgroundColor?: string;
	renderSingleArrow?: (position: "left" | "right") => ReactNode;
	renderDoubleArrow?: (position: "left" | "right") => ReactNode;
	ariaLabelFirstPage?: string;
	ariaLabelPreviousPage?: string;
	ariaLabelPage?: (page: number) => string;
	ariaLabelNextPage?: string;
	ariaLabelLastPage?: string;
	className?: string;
};

export const Pagination = ({
	className,
	page,
	total,
	items,
	itemColor,
	itemBackgroundColor,
	itemHoverColor,
	itemHoverBackgroundColor,
	itemActiveColor,
	itemActiveBackgroundColor,
	goToFirst,
	goToLeft,
	goToRight,
	goToLast,
	goToPage,
	renderSingleArrow,
	renderDoubleArrow,
	ariaLabelFirstPage = "First page",
	ariaLabelPreviousPage = "Previous page",
	ariaLabelPage,
	ariaLabelNextPage = "Next page",
	ariaLabelLastPage = "Last page",
}: PaginationProps) => {
	const CSSVariables = {
		"--item-color": itemColor ?? "rgb(0, 0, 0)",
		"--item-background-color": itemBackgroundColor ?? "rgb(255, 255, 255)",
		"--item-hover-color": itemHoverColor ?? "rgb(0, 0, 0)",
		"--item-hover-background-color": itemHoverBackgroundColor ?? "rgb(211, 211, 211)",
		"--item-active-color": itemActiveColor ?? "rgb(255, 255, 255)",
		"--item-active-background-color": itemActiveBackgroundColor ?? "rgb(0, 0, 0)",
	} as CSSProperties;

	return (
		<div className={clsx(styles.container, className)} style={CSSVariables}>
			{page > 1 && (
				<>
					<button
						type="button"
						aria-label={ariaLabelFirstPage}
						className={styles.item}
						onClick={() => goToFirst()}
					>
						{renderDoubleArrow ? renderDoubleArrow("left") : <ChevronsLeft />}
					</button>

					<button
						type="button"
						aria-label={ariaLabelPreviousPage}
						className={styles.item}
						onClick={() => goToLeft()}
					>
						{renderSingleArrow ? renderSingleArrow("left") : <ChevronLeft />}
					</button>
				</>
			)}

			{items.map((currentPage: number) => (
				<button
					type="button"
					aria-label={ariaLabelPage ? ariaLabelPage(currentPage) : `Page ${currentPage}`}
					aria-current={currentPage === page ? "page" : undefined}
					className={clsx(styles.item, currentPage === page && styles.active)}
					key={currentPage}
					onClick={() => goToPage(currentPage)}
				>
					{currentPage}
				</button>
			))}

			{page < total && (
				<>
					<button
						type="button"
						aria-label={ariaLabelNextPage}
						className={styles.item}
						onClick={() => goToRight()}
					>
						{renderSingleArrow ? renderSingleArrow("right") : <ChevronRight />}
					</button>

					<button
						type="button"
						aria-label={ariaLabelLastPage}
						className={styles.item}
						onClick={() => goToLast()}
					>
						{renderDoubleArrow ? renderDoubleArrow("right") : <ChevronsRight />}
					</button>
				</>
			)}
		</div>
	);
};
