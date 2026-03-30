import clsx from "clsx";
import type { CSSProperties, InputHTMLAttributes } from "react";
import type { BorderStyle, FontWeight } from "../../types";
import { toRem } from "../../utils";
import styles from "./radio.module.css";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string;
	labelFontWeight?: FontWeight;
	labelColor?: string;
	size?: number;
	borderStyle?: BorderStyle;
	borderColor?: string;
	checkedBorderColor?: string;
	checkedBackgroundColor?: string;
	checkedLabelColor?: string;
	className?: string;
};

export const Radio = ({
	label,
	labelFontWeight = 400,
	labelColor,
	size = 1.5,
	borderStyle = "solid",
	borderColor,
	checkedBorderColor = "rgb(50, 115, 255)",
	checkedBackgroundColor = "rgb(50, 115, 255)",
	checkedLabelColor,
	className,
	...rest
}: RadioProps) => {
	const CSSVariables = {
		"--size": toRem(size),
		"--label-color": labelColor,
		"--border-color": borderColor,
		"--checked-border-color": checkedBorderColor,
		"--checked-background-color": checkedBackgroundColor,
		"--checked-label-color": checkedLabelColor,
	} as CSSProperties;

	return (
		<label className={clsx(styles.container, className)} style={{ ...CSSVariables }}>
			<input className={styles.radio} type="radio" style={{ borderStyle }} {...rest}></input>
			<span className={styles.label} style={{ fontWeight: labelFontWeight }}>
				{label}
			</span>
		</label>
	);
};
