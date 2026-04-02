import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { FontWeight } from "../../types";
import { toRem, toSeconds } from "../../utils";
import styles from "./loader.module.css";

export type LoaderProps = {
	text?: string;
	fontWeight?: FontWeight;
	color?: string;
	overlayBackgroundColor?: string;
	hasIcon?: boolean;
	icon?: ReactNode;
	iconSize?: number;
	iconColor?: string;
	iconGap?: number;
	iconAnimationDuration?: number;
	className?: string;
};

export const Loader = ({
	className,
	text,
	fontWeight = 700,
	overlayBackgroundColor = "rgba(0, 0, 0, 0.5)",
	color,
	hasIcon,
	icon,
	iconSize = 3,
	iconColor,
	iconGap = 1,
	iconAnimationDuration = 1,
}: LoaderProps) => {
	const CSSVariables = {
		"--animation-duration": toSeconds(iconAnimationDuration),
	} as CSSProperties;

	return (
		<div
			className={clsx(styles.overlay, className)}
			style={{ backgroundColor: overlayBackgroundColor, ...CSSVariables }}
		>
			<div className={styles.container} style={{ gap: toRem(iconGap), color }}>
				{hasIcon &&
					(icon ?? (
						<LoaderCircle
							className={styles.image}
							color={iconColor}
							size={toRem(iconSize)}
						></LoaderCircle>
					))}
				{text && <span style={{ fontWeight }}>{text}</span>}
			</div>
		</div>
	);
};
