import clsx from "clsx";
import { type CSSProperties, type FocusEvent, type InputHTMLAttributes, useState } from "react";
import type { FontWeight, Size } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import styles from "./input.module.css";
import type { InputColors, InputStatus, InputType } from "./input.types";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string;
	type: InputType;
	colors?: InputColors;
	status?: InputStatus;
	message?: string;
	width?: Size;
	height?: Size;
	borderWidth?: number;
	borderWidthFocus?: number;
	labelFontWeight?: FontWeight;
	labelFontSize?: number;
	messageFontWeight?: FontWeight;
	messageFontSize?: number;
	className?: string;
};

export const Input = ({
	className,
	label,
	message,
	colors = {
		success: "green",
		error: "red",
		warning: "orange",
		focus: "blue",
	},
	status,
	width = 100,
	height = "auto",
	borderWidth = 1,
	borderWidthFocus = 2,
	labelFontWeight = 400,
	labelFontSize = 1,
	messageFontWeight = 400,
	messageFontSize = 1,
	onFocus,
	onBlur,
	...rest
}: InputProps) => {
	const [isFocus, setIsFocus] = useState(false);
	const CSSVariables = {
		"--success-color": colors.success,
		"--warning-color": colors.warning,
		"--error-color": colors.error,
		"--focus-color": colors.focus,
	} as CSSProperties;

	const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
		if (onFocus) {
			onFocus(e);
		}
		setIsFocus(true);
	};

	const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
		if (onBlur) {
			onBlur(e);
		}
		setIsFocus(false);
	};

	return (
		<div
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				height: isNumber(height) ? toRem(height) : height,
				...CSSVariables,
			}}
		>
			<div className={styles["input-container"]}>
				<input
					className={clsx(styles.input, status)}
					{...rest}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
				/>
				<fieldset
					className={clsx(styles.fieldset, status)}
					style={{
						borderWidth: toPx(isFocus ? borderWidthFocus : borderWidth),
					}}
				>
					<legend
						className={styles.legend}
						style={{
							fontWeight: labelFontWeight,
							fontSize: toRem(labelFontSize),
						}}
					>
						{label}
					</legend>
				</fieldset>
			</div>

			{message && (
				<div className={clsx(styles["message-container"], status)}>
					<span
						className={styles.message}
						style={{ fontWeight: messageFontWeight, fontSize: toRem(messageFontSize) }}
					>
						{message}
					</span>
				</div>
			)}
		</div>
	);
};
