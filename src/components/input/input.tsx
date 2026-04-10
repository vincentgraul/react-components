import clsx from "clsx";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import type { FontWeight, Position, Size } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import styles from "./input.module.css";
import type { InputColors, InputIcons, InputStatus, InputType } from "./input.types";

const defaultIcons = {
	default: <Info />,
	error: <CircleAlert />,
	warning: <TriangleAlert />,
	success: <CircleCheck />,
};

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string;
	type: InputType;
	colors?: InputColors;
	icons?: InputIcons;
	status?: InputStatus;
	message?: string;
	width?: Size;
	height?: Size;
	borderWidth?: number;
	borderWidthFocus?: number;
	labelAlignSelf?: Position;
	labelMarginBottom?: number;
	labelFontWeight?: FontWeight;
	labelFontSize?: number;
	messageFontWeight?: FontWeight;
	messageFontSize?: number;
	className?: string;
};

export const Input = ({
	label,
	message,
	colors = {
		default: "#000000",
		success: "#1A7A1A",
		error: "#C40000",
		warning: "#B35A00",
		focus: "#0055CC",
	},
	icons = defaultIcons,
	status = "default",
	width = 100,
	height = "auto",
	borderWidth = 1,
	borderWidthFocus = 2,
	labelMarginBottom = 1,
	labelFontWeight = 400,
	labelFontSize = 1,
	labelAlignSelf = "center",
	messageFontWeight = 400,
	messageFontSize = 1,
	className,
	...rest
}: InputProps) => {
	const CSSVariables = {
		"--default-color": colors.default,
		"--success-color": colors.success,
		"--warning-color": colors.warning,
		"--error-color": colors.error,
		"--focus-color": colors.focus,
		"--border-width": toPx(borderWidth),
		"--focus-border-width": toPx(borderWidthFocus),
	} as CSSProperties;

	const Icon = icons[status];

	return (
		<label
			className={clsx(styles.container, status, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				...CSSVariables,
			}}
		>
			<span
				className={styles.label}
				style={{
					fontSize: toRem(labelFontSize),
					fontWeight: labelFontWeight,
					marginBottom: toRem(labelMarginBottom),
					alignSelf: labelAlignSelf,
				}}
			>
				{label}
			</span>
			<input
				className={styles.input}
				style={{
					height: isNumber(height) ? toRem(height) : height,
				}}
				{...rest}
			/>

			{message && (
				<span
					role="alert"
					className={styles.message}
					style={{ fontWeight: messageFontWeight, fontSize: toRem(messageFontSize) }}
				>
					{Icon}
					{message}
				</span>
			)}
		</label>
	);
};
