import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { toRem, toSeconds } from "../../utils";
import styles from "./loader.module.css";

export type SpinnerProps = {
	size?: number;
	color?: string;
	animationDuration?: number;
	className?: string;
};

export const Spinner = ({
	className,
	size = 3,
	color = "rgb(0, 0, 0)",
	animationDuration = 1,
}: SpinnerProps) => {
	const CSSVariables = {
		"--animation-duration": toSeconds(animationDuration),
	} as CSSProperties;

	return (
		<LoaderCircle
			color={color}
			size={toRem(size)}
			role="img"
			aria-label="Loading"
			style={CSSVariables}
			className={clsx(styles.spinner, className)}
		></LoaderCircle>
	);
};

export type LoaderProps = {
	children: ReactNode;
	backgroundColor?: string;
	color?: string;
	gap?: number;
	className?: string;
};

export const Loader = ({
	children,
	backgroundColor = "rgba(0, 0, 0, 0.5)",
	gap = 1,
	className,
}: LoaderProps) => {
	return (
		<div className={clsx(styles.overlay, className)} style={{ backgroundColor }}>
			<div className={styles.container} style={{ gap: toRem(gap) }}>
				{children}
			</div>
		</div>
	);
};
