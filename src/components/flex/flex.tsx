import clsx from "clsx";
import type { ReactNode } from "react";
import type { Size } from "../../types";
import { isNumber, toPercentage, toRem } from "../../utils";
import styles from "./flex.module.css";

export type FlexProps = {
	children: ReactNode;
	flexDirection?: "row" | "column";
	justifyContent?:
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch";
	alignItems?: "start" | "center" | "end" | "stretch";
	alignSelf?: "start" | "center" | "end" | "stretch";
	wrap?: "nowrap" | "wrap" | "wrap-reverse";
	width?: Size;
	height?: Size;
	padding?: string;
	gap?: number;
	className?: string;
};

export const Flex = ({
	className,
	children,
	flexDirection,
	justifyContent,
	alignItems,
	alignSelf,
	wrap,
	width = 100,
	height = "auto",
	padding,
	gap = 0,
}: FlexProps) => (
	<div
		className={clsx(styles.container, className)}
		style={{
			width: isNumber(width) ? toPercentage(width) : width,
			height: isNumber(height) ? toPercentage(height) : height,
			flexDirection,
			justifyContent,
			alignItems,
			alignSelf,
			flexWrap: wrap,
			padding,
			gap: toRem(gap),
		}}
	>
		{children}
	</div>
);
