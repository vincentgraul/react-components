import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../../hooks";
import type { FontStyle, FontWeight, Size } from "../../types";
import { isNumber, toPercentage, toRem } from "../../utils";
import styles from "./drop-down.module.css";
import type { IconsType } from "./drop-down.types";

export type DropDownProps = {
	children: ReactNode;
	label: string;
	labelFontSize?: number;
	labelFontWeight?: FontWeight;
	labelFontStyle?: FontStyle;
	labelColor?: string;
	icon?: ReactNode;
	width?: Size;
	arrowIcons?: IconsType;
	arrowIconsColor?: string;
	gap?: number;
	closeOnOutsideClick?: boolean;
	overlay?: boolean;
	className?: string;
};

export const DropDown = ({
	children,
	label,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelFontStyle = "normal",
	labelColor,
	icon,
	arrowIcons,
	arrowIconsColor,
	width = "fit-content",
	gap = 1,
	closeOnOutsideClick,
	overlay,
	className,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { hasClickedOutside } = useOutsideAlerter(ref);

	const ArrowIcon = isOpen
		? (arrowIcons?.up ?? <ChevronUp style={{ color: arrowIconsColor }} />)
		: (arrowIcons?.down ?? <ChevronDown style={{ color: arrowIconsColor }} />);
	const handleOnClick = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (closeOnOutsideClick && hasClickedOutside) {
			setIsOpen(false);
		}
	}, [closeOnOutsideClick, hasClickedOutside]);

	return (
		<div
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				position: overlay ? "relative" : "unset",
				gap: toRem(gap),
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
				{ArrowIcon}
			</button>

			{isOpen && (
				<div
					className={styles.content}
					style={{
						position: overlay ? "absolute" : "unset",
						top: overlay ? "100%" : "unset",
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};
