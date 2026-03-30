import clsx from "clsx";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import type { FontWeight, Position, Size } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import styles from "./button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	color?: string;
	width?: Size;
	height?: Size;
	backgroundColor?: string;
	borderColor?: string;
	alignSelf?: Position;
	fontSize?: number;
	fontWeight?: FontWeight;
	borderRadius?: number;
	borderWidth?: number;
	padding?: string;
	hoverOpacity?: number;
	className?: string;
};

export const Button = ({
	className,
	children,
	width = 100,
	height = "auto",
	alignSelf,
	fontSize = 1,
	fontWeight = 400,
	borderRadius = 0,
	borderWidth = 1,
	padding,
	color = "black",
	backgroundColor = "white",
	borderColor = "black",
	hoverOpacity = 0.8,
	...rest
}: ButtonProps) => {
	const CSSVariables = {
		"--hover-opacity": hoverOpacity,
	} as CSSProperties;

	return (
		<button
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				height: isNumber(height) ? toRem(height) : height,
				borderRadius: toPx(borderRadius),
				borderWidth: toPx(borderWidth),
				fontSize: toRem(fontSize),
				fontWeight,
				alignSelf,
				padding,
				color,
				backgroundColor,
				borderColor,
				...CSSVariables,
			}}
			{...rest}
		>
			{children}
		</button>
	);
};
