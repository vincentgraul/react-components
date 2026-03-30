import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import type { PaginationColors, PaginationData } from "../..";
import DoubleLeftArrowIcon from "./assets/double-left-arrow.svg?react";
import DoubleRightArrowIcon from "./assets/double-right-arrow.svg?react";
import SingleLeftArrowIcon from "./assets/single-left-arrow.svg?react";
import SingleRightArrowIcon from "./assets/single-right-arrow.svg?react";
import styles from "./pagination.module.css";

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
					<button type="button" className={styles.item} onClick={() => goToFirst()}>
						{renderDoubleArrow ? renderDoubleArrow("left") : <DoubleLeftArrowIcon />}
					</button>

					<button type="button" className={styles.item} onClick={() => goToLeft()}>
						{renderSingleArrow ? renderSingleArrow("left") : <SingleLeftArrowIcon />}
					</button>
				</>
			)}

			{items.map((currentPage: number) => (
				<button
					type="button"
					className={clsx(styles.item, currentPage === page && styles.selected)}
					key={currentPage}
					onClick={() => goToPage(currentPage)}
				>
					{currentPage}
				</button>
			))}

			{page < total && (
				<>
					<button type="button" className={styles.item} onClick={() => goToRight()}>
						{renderSingleArrow ? renderSingleArrow("right") : <SingleRightArrowIcon />}
					</button>

					<button type="button" className={styles.item} onClick={() => goToLast()}>
						{renderDoubleArrow ? renderDoubleArrow("right") : <DoubleRightArrowIcon />}
					</button>
				</>
			)}
		</div>
	);
};
