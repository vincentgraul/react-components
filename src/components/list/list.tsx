import clsx from "clsx";
import type { ReactNode } from "react";
import type { FontWeight } from "../../types";
import { toPx, toRem } from "../../utils";
import styles from "./list.module.css";

export type ListItemProps = {
	text: string;
	icon?: ReactNode;
	textFontSize?: number;
	textColor?: string;
	textFontWeight?: FontWeight;
	gap?: number;
	onClick?: () => void;
	className?: string;
};

export const ListItem = ({
	className,
	text,
	icon,
	textFontSize = 1,
	textColor,
	textFontWeight = 400,
	gap = 0.3,
	onClick,
}: ListItemProps) => (
	<li className={clsx(styles.item, className)}>
		<button
			type="button"
			className={styles["item-button"]}
			onClick={onClick}
			style={{ gap: toRem(gap), cursor: onClick ? "pointer" : "auto" }}
		>
			{icon}
			<span
				style={{
					fontSize: toRem(textFontSize),
					color: textColor,
					fontWeight: textFontWeight,
				}}
			>
				{text}
			</span>
		</button>
	</li>
);

export type ListProps = {
	children: ReactNode;
	gap?: number;
	backgroundColor?: string;
	padding?: string;
	borderRadius?: number;
	className?: string;
};

export const List = ({
	className,
	children,
	gap = 0.5,
	backgroundColor,
	padding,
	borderRadius = 0,
}: ListProps) => (
	<ul
		className={clsx(styles.list, className)}
		style={{ gap: toRem(gap), backgroundColor, padding, borderRadius: toPx(borderRadius) }}
	>
		{children}
	</ul>
);
