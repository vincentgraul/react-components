import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type ReactNode, useState } from "react";
import type { FontStyle, FontWeight, Size } from "../../types";
import { isNumber, toPercentage, toRem } from "../../utils";
import styles from "./accordion.module.css";
import type { IconsType } from "./accordion.types";

type AccordionType = {
	label: string;
	children: ReactNode;
	labelFontSize?: number;
	labelFontWeight?: FontWeight;
	labelFontStyle?: FontStyle;
	labelColor?: string;
	icon?: ReactNode;
	arrowIcons?: IconsType;
	arrowIconsColor?: string;
	width?: Size;
	gap?: number;
	className?: string;
};

export const Accordion = ({
	label,
	children,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelFontStyle = "normal",
	labelColor,
	icon,
	arrowIcons,
	arrowIconsColor,
	width = "fit-content",
	gap = 1,
	className,
}: AccordionType) => {
	const [isOpen, setIsOpen] = useState(false);

	const ArrowIcon = isOpen
		? (arrowIcons?.up ?? <ChevronUp style={{ color: arrowIconsColor }} />)
		: (arrowIcons?.down ?? <ChevronDown style={{ color: arrowIconsColor }} />);

	const handleOnClick = () => setIsOpen(!isOpen);

	return (
		<div
			className={clsx(styles.container, className)}
			style={{ width: isNumber(width) ? toPercentage(width) : width, gap: toRem(gap) }}
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

			{isOpen && <div className={styles.content}>{children}</div>}
		</div>
	);
};
