import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import type { Position, Size } from "../../types";
import { isNumber, toPercentage, toRem } from "../../utils";
import styles from "./sidebar.module.css";

export type HeaderProps = {
	icon?: ReactNode;
	justifyContent?: Position;
	color?: string;
	backgroundColor?: string;
	padding?: string;
	iconOnClick?: () => void;
	iconAriaLabel?: string;
	className?: string;
};

const Header = ({
	icon,
	justifyContent = "center",
	color,
	backgroundColor,
	padding = "1rem",
	iconOnClick,
	iconAriaLabel,
	className,
}: HeaderProps) => (
	<header
		className={clsx(styles.header, className)}
		style={{ justifyContent, padding, backgroundColor, color }}
	>
		{iconOnClick ? (
			<button
				className={styles["header-icon"]}
				type="button"
				onClick={iconOnClick}
				aria-label={iconAriaLabel ?? "Navigate to homepage"}
			>
				{icon}
			</button>
		) : (
			icon
		)}
	</header>
);

export type SidebarProps = {
	children: ReactNode;
	header?: HeaderProps;
	renderHeader?: () => ReactNode;
	width?: Size;
	padding?: string;
	color?: string;
	backgroundColor?: string;
	gap?: number;
	itemHoverColor?: string;
	itemHoverBackgroundColor?: string;
	itemActiveColor?: string;
	itemActiveBackgroundColor?: string;
	itemGap?: number;
	itemPadding?: string;
	ariaLabel?: string;
	className?: string;
};

export const Sidebar = ({
	children,
	header,
	renderHeader,
	color = "rgb(255, 255, 255)",
	backgroundColor = "rgb(0, 0, 0)",
	gap = 1,
	width = 20,
	padding,
	itemGap = 1,
	itemHoverColor = "rgb(0, 0, 0)",
	itemHoverBackgroundColor = "rgb(255, 255, 255)",
	itemPadding = "1rem",
	itemActiveColor = "rgb(255, 255, 255)",
	itemActiveBackgroundColor = "rgb(30, 100, 180)",
	ariaLabel = "Sidebar",
	className,
}: SidebarProps) => {
	const CSSVariables = {
		"--item-hover-color": itemHoverColor,
		"--item-hover-background-color": itemHoverBackgroundColor,
		"--item-padding": itemPadding,
		"--item-active-color": itemActiveColor,
		"--item-active-background-color": itemActiveBackgroundColor,
	} as CSSProperties;

	return (
		<nav
			className={clsx(styles.container, className)}
			style={{
				color,
				backgroundColor,
				gap: toRem(gap),
				padding,
				width: isNumber(width) ? toPercentage(width) : width,
				...CSSVariables,
			}}
			aria-label={ariaLabel}
		>
			{renderHeader ? renderHeader() : <Header {...header} />}

			<ul className={styles.list} style={{ gap: toRem(itemGap) }}>
				{children}
			</ul>
		</nav>
	);
};

export type SidebarItemProps = {
	value: string;
	onClick: () => void;
	icon?: ReactNode;
	isActive?: boolean;
	className?: string;
};

const SidebarItem = ({ value, onClick, icon, isActive, className }: SidebarItemProps) => {
	return (
		<li className={className}>
			<button
				className={clsx(styles.item, isActive && styles.isActive)}
				type="button"
				aria-current={isActive ? "page" : undefined}
				onClick={onClick}
			>
				{icon}
				{value}
			</button>
		</li>
	);
};

Sidebar.Item = SidebarItem;
