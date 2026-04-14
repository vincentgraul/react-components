import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../..";
import type { BorderStyle, FontWeight, Position, Size } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import styles from "./select.module.css";
import type { SelectOption, SelectOptionWithoutId } from "./select.types";

export type SelectProps = {
	options: SelectOptionWithoutId[];
	selectedValue?: string;
	label?: string;
	labelFontSize?: number;
	labelFontWeight?: FontWeight;
	labelAlignItems?: Position;
	labelMarginBottom?: number;
	selectedOptionFontWeight?: FontWeight;
	optionFontSize?: number;
	optionFontWeight?: FontWeight;
	width?: Size;
	height?: Size;
	color?: string;
	borderWidth?: number;
	borderStyle?: BorderStyle;
	backgroundColor?: string;
	hoverOptionBackgroundColor?: string;
	hoverOptionColor?: string;
	hoverFontWeight?: FontWeight;
	icon?: ReactNode;
	ariaLabelIcon?: string;
	onChange?: (option: SelectOption) => void;
	className?: string;
};

export const Select = ({
	className,
	options: optionsProps,
	selectedValue,
	label,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelAlignItems = "center",
	labelMarginBottom = 1,
	optionFontSize = 1,
	selectedOptionFontWeight = 400,
	optionFontWeight = 400,
	width = 100,
	height = 3,
	color,
	borderWidth = 1,
	borderStyle = "solid",
	backgroundColor,
	hoverOptionBackgroundColor = "rgba(50, 115, 255, 0.08)",
	hoverOptionColor,
	hoverFontWeight = 400,
	icon,
	ariaLabelIcon = "Choose an option",
	onChange,
}: SelectProps) => {
	const CSSVariables = {
		"--hover-background-color": hoverOptionBackgroundColor,
		"--hover-text-color": hoverOptionColor,
		"--hover-text-weight": hoverFontWeight,
	} as CSSProperties;
	const options = optionsProps.map((option: SelectOptionWithoutId, index: number) => ({
		...option,
		id: index,
	}));
	const hasOneOption = options.length < 2;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<SelectOption>(
		options.find((option) => option.value === selectedValue) ?? options[0],
	);
	const ref = useRef(null);
	const { hasClickedOutside, onReset: onResetOutsideAlerter } = useOutsideAlerter(ref);

	const handleOnShowOptions = () => {
		onResetOutsideAlerter();
		setIsOpen(!isOpen);
	};

	const handleOnSelect = (option: SelectOption) => {
		setSelectedOption(option);
		setIsOpen(false);

		if (onChange) {
			onChange(option);
		}
	};

	useEffect(() => {
		if (hasClickedOutside) {
			setIsOpen(false);
		}
	}, [hasClickedOutside]);

	if (!selectedOption) {
		return null;
	}

	return (
		<div
			className={clsx(styles.container, className)}
			ref={ref}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				alignItems: labelAlignItems,
				...CSSVariables,
			}}
		>
			{label && (
				<span
					style={{
						fontSize: toRem(labelFontSize),
						fontWeight: labelFontWeight,
						marginBottom: toRem(labelMarginBottom),
					}}
				>
					{label}
				</span>
			)}

			<button
				type="button"
				aria-label={ariaLabelIcon}
				aria-expanded={isOpen}
				className={styles["selected-option-container"]}
				onClick={handleOnShowOptions}
				style={{
					borderWidth: toPx(borderWidth),
					borderColor: color,
					borderStyle,
					backgroundColor,
					color,
					cursor: hasOneOption ? "default" : "pointer",
					pointerEvents: hasOneOption ? "none" : "auto",
					height: isNumber(height) ? toRem(height) : height,
				}}
			>
				<span
					className={styles["selected-option-text"]}
					style={{
						fontSize: toRem(optionFontSize),
						fontWeight: selectedOptionFontWeight,
						borderColor: color,
					}}
				>
					{selectedOption.label}
				</span>
				{icon ?? (
					<div
						className={styles["selected-option-arrow-container"]}
						style={{
							borderLeftStyle: borderStyle,
							borderLeftWidth: toPx(borderWidth),
							borderLeftColor: color,
						}}
					>
						<ChevronDown className={styles["selected-option-arrow"]} color={color} />
					</div>
				)}
			</button>

			{isOpen && (
				<ul
					className={styles["options-list"]}
					style={{
						borderWidth: toPx(borderWidth),
						borderColor: color,
						borderStyle,
						backgroundColor,
						color,
						fontSize: toRem(optionFontSize),
						fontWeight: optionFontWeight,
					}}
				>
					{options
						.filter((option: SelectOption) => option.id !== selectedOption.id)
						.map((option: SelectOption) => (
							<li key={option.id}>
								<button
									className={styles.option}
									type="button"
									onClick={() => handleOnSelect(option)}
								>
									{option.label}
								</button>
							</li>
						))}
				</ul>
			)}
		</div>
	);
};
