import clsx from "clsx";
import { X } from "lucide-react";
import { type ElementType, type ReactNode, useCallback, useEffect, useRef } from "react";
import { useOutsideAlerter } from "../..";
import type { FontWeight, Position, Text } from "../../types";
import { toRem } from "../../utils";
import styles from "./modal.module.css";

export type ModalProps = {
	children: ReactNode;
	title?: string;
	titleAs?: Text;
	titleFontSize?: number;
	titleFontWeight?: FontWeight;
	titleColor?: string;
	titleJustifyContent?: Position;
	titleMarginBottom?: number;
	overlayBackgroundColor?: string;
	hasCloseIcon?: boolean;
	closeIcon?: ReactNode;
	closeIconColor?: string;
	closeIconSize?: number;
	closeIconMarginBottom?: number;
	ConfirmButton?: ElementType;
	confirmButtonText?: string;
	DeclineButton?: ElementType;
	declineButtonText?: string;
	buttonsJustifyContent?: Position;
	buttonsGap?: number;
	buttonsMarginTop?: number;
	backgroundColor?: string;
	padding?: string;
	onClose?: () => void;
	onDecline?: () => void;
	onConfirm?: () => void;
	renderHeader?: () => ReactNode;
	renderFooter?: () => ReactNode;
	className?: string;
};

export const Modal = ({
	title,
	titleAs: Title = "h2",
	titleFontSize = 1.5,
	titleFontWeight = 700,
	titleColor,
	titleJustifyContent,
	titleMarginBottom = 2,
	overlayBackgroundColor = "rgba(0, 0, 0, 0.5)",
	hasCloseIcon,
	closeIcon,
	closeIconColor,
	closeIconSize = 1.5,
	closeIconMarginBottom = 1,
	backgroundColor = "rgb(255, 255, 255)",
	padding,
	ConfirmButton,
	confirmButtonText,
	DeclineButton,
	declineButtonText,
	buttonsJustifyContent = "end",
	buttonsGap = 1,
	buttonsMarginTop = 2,
	children,
	onClose,
	onDecline,
	onConfirm,
	renderHeader,
	renderFooter,
	className,
}: ModalProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { hasClickedOutside } = useOutsideAlerter(ref);

	const handleOnClose = useCallback(() => {
		if (onClose) {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		if (hasClickedOutside) {
			handleOnClose();
		}
	}, [hasClickedOutside, handleOnClose]);

	const handleOnDecline = () => {
		if (onDecline) {
			onDecline();
		}
		handleOnClose();
	};

	const handleOnConfirm = () => {
		if (onConfirm) {
			onConfirm();
		}
		handleOnClose();
	};

	return (
		<div
			className={clsx(styles.overlay, className)}
			style={{ backgroundColor: overlayBackgroundColor }}
		>
			<div className={styles.container} ref={ref} style={{ backgroundColor, padding }}>
				{hasCloseIcon
					? (closeIcon ?? (
							<X
								role="img"
								aria-label="Close"
								className={styles.close}
								onClick={handleOnClose}
								color={closeIconColor}
								size={toRem(closeIconSize)}
								style={{ marginBottom: toRem(closeIconMarginBottom) }}
							></X>
						))
					: null}

				{renderHeader
					? renderHeader()
					: title && (
							<div className={styles.header} style={{ justifyContent: titleJustifyContent }}>
								<Title
									className={styles.title}
									style={{
										fontSize: toRem(titleFontSize),
										fontWeight: titleFontWeight,
										color: titleColor,
										marginBottom: toRem(titleMarginBottom),
									}}
								>
									{title}
								</Title>
							</div>
						)}

				{children}

				{renderFooter
					? renderFooter()
					: (ConfirmButton || DeclineButton) && (
							<div
								className={styles.footer}
								style={{
									justifyContent: buttonsJustifyContent,
									gap: toRem(buttonsGap),
									marginTop: toRem(buttonsMarginTop),
								}}
							>
								{DeclineButton && (
									<DeclineButton onClick={handleOnDecline}>
										{declineButtonText ?? "Decline"}
									</DeclineButton>
								)}
								{ConfirmButton && (
									<ConfirmButton onClick={handleOnConfirm}>
										{confirmButtonText ?? "Confirm"}
									</ConfirmButton>
								)}
							</div>
						)}
			</div>
		</div>
	);
};
