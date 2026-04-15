import clsx from "clsx";
import type { ReactNode } from "react";
import type { FontStyle, FontWeight } from "../../types";
import { toRem } from "../../utils";
import styles from "./list.module.css";

export type ListProps = {
	children: ReactNode;
	gap?: number;
	className?: string;
};

export const List = ({ className, children, gap = 0.5 }: ListProps) => (
	<ul
		className={clsx(styles.list, className)}
		style={{
			gap: toRem(gap),
		}}
	>
		{children}
	</ul>
);

export type ListItemProps = {
	text: string;
	icon?: ReactNode;
	textFontSize?: number;
	textFontWeight?: FontWeight;
	textFontStyle?: FontStyle;
	textColor?: string;
	gap?: number;
	className?: string;
};

const ListItem = ({
	className,
	text,
	icon,
	textFontSize = 1,
	textColor,
	textFontWeight = 400,
	textFontStyle = "normal",
	gap = 0.3,
}: ListItemProps) => (
	<li className={clsx(styles.item, className)} style={{ gap: toRem(gap) }}>
		{icon}
		<span
			style={{
				fontSize: toRem(textFontSize),
				color: textColor,
				fontWeight: textFontWeight,
				fontStyle: textFontStyle,
			}}
		>
			{text}
		</span>
	</li>
);

List.Item = ListItem;
