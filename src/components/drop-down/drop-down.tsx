import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type ReactNode, useState } from "react";
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
	width?: Size;
	icons?: IconsType;
	contentMarginTop?: number;
	className?: string;
};

export const DropDown = ({
	children,
	label,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelFontStyle = "normal",
	icons,
	width = "fit-content",
	contentMarginTop = 0.5,
	className,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const Icon = isOpen ? (icons?.up ?? <ChevronUp />) : (icons?.down ?? <ChevronDown />);
	const handleOnClick = () => setIsOpen(!isOpen);

	return (
		<div
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
			}}
		>
			<button type="button" className={styles.button} onClick={handleOnClick}>
				<span
					style={{
						fontSize: toRem(labelFontSize),
						fontWeight: labelFontWeight,
						fontStyle: labelFontStyle,
					}}
				>
					{label}
				</span>
				{Icon}
			</button>

			<div className={styles.content} style={{ marginTop: toRem(contentMarginTop) }}>
				{isOpen && children}
			</div>
		</div>
	);
};
