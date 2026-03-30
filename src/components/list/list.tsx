import clsx from "clsx";
import type { ReactNode } from "react";
import type { FontWeight } from "../../types";
import { toRem } from "../../utils";
import styles from "./list.module.css";

export type ListItemProps = {
	icon: ReactNode;
	text: string;
	textFontSize?: number;
	textColor?: string;
	textFontWeight?: FontWeight;
	gap?: number;
	className?: string;
};

export const ListItem = ({
	className,
	icon,
	text,
	textFontSize = 1,
	textColor,
	textFontWeight = 400,
	gap = 0.3,
}: ListItemProps) => (
	<li className={clsx(styles.item, className)} style={{ gap: toRem(gap) }}>
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
	</li>
);

export type ListProps = {
	children: ReactNode;
	gap?: number;
	className?: string;
};

export const List = ({ className, children, gap = 0.5 }: ListProps) => (
	<ul className={clsx(styles.list, className)} style={{ gap: toRem(gap) }}>
		{children}
	</ul>
);
