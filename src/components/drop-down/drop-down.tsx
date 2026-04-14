import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../../hooks";
import type { FontStyle, FontWeight, Size, UpAndDownArrows } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import styles from "./drop-down.module.css";

export type DropDownItemProps = {
	text: string;
	onClick: () => void;
	textFontSize?: number;
	textFontWeight?: FontWeight;
	textFontStyle?: FontStyle;
	icon?: ReactNode;
	className?: string;
};

export const DropDownItem = ({
	text,
	icon,
	onClick,
	textFontSize = 1,
	textFontWeight = 400,
	textFontStyle = "normal",
	className,
}: DropDownItemProps) => (
	<li className={clsx(styles.item, className)}>
		<button
			type="button"
			className={styles["item-button"]}
			onClick={onClick}
			style={{
				fontSize: toRem(textFontSize),
				fontWeight: textFontWeight,
				fontStyle: textFontStyle,
			}}
		>
			{icon}
			{text}
		</button>
	</li>
);

export type DropDownProps = {
	children: ReactNode;
	label: string;
	labelFontSize?: number;
	labelFontWeight?: FontWeight;
	labelFontStyle?: FontStyle;
	labelColor?: string;
	itemTextColor?: string;
	icon?: ReactNode;
	width?: Size;
	arrowIcons?: UpAndDownArrows;
	arrowIconsColor?: string;
	gap?: number;
	backgroundColor?: string;
	hoverItemBackgroundColor?: string;
	hoverItemTextColor?: string;
	itemPadding?: string;
	borderRadius?: number;
	className?: string;
};

export const DropDown = ({
	children,
	label,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelFontStyle = "normal",
	labelColor,
	itemTextColor,
	icon,
	arrowIcons,
	arrowIconsColor,
	width = "fit-content",
	backgroundColor,
	hoverItemBackgroundColor = "rgb(245, 245, 245)",
	hoverItemTextColor,
	gap = 2.5,
	itemPadding = "1rem",
	borderRadius = 5,
	className,
}: DropDownProps) => {
	const CSSVariables = {
		"--item-background-color": backgroundColor,
		"--item-hover-background-color": hoverItemBackgroundColor,
		"--item-text-color": itemTextColor,
		"--item-hover-text-color": hoverItemTextColor,
		"--item-padding": itemPadding,
	} as CSSProperties;

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { hasClickedOutside } = useOutsideAlerter(ref);

	const arrowIcon = isOpen
		? (arrowIcons?.up ?? <ChevronUp style={{ color: arrowIconsColor }} />)
		: (arrowIcons?.down ?? <ChevronDown style={{ color: arrowIconsColor }} />);
	const handleOnClick = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (hasClickedOutside) {
			setIsOpen(false);
		}
	}, [hasClickedOutside]);

	return (
		<div
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				gap: toRem(gap),
				...CSSVariables,
			}}
			ref={ref}
		>
			<button
				type="button"
				aria-expanded={isOpen}
				className={styles.button}
				onClick={handleOnClick}
			>
				{icon}

				<span
					style={{
						fontSize: toRem(labelFontSize),
						fontWeight: labelFontWeight,
						fontStyle: labelFontStyle,
						color: labelColor,
					}}
				>
					{label}
				</span>

				{arrowIcon}
			</button>

			{isOpen && (
				<ul
					className={styles.content}
					style={{
						top: toRem(gap),
						borderRadius: toPx(borderRadius),
					}}
				>
					{children}
				</ul>
			)}
		</div>
	);
};
