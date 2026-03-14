import { ElementType, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./modal.module.css";
import { useOutsideAlerter } from "..";
import { FontWeight, Position, Title } from "../types";
import CloseIcon from "./assets/close.svg?react";
import { toRem } from "../utils";

export type ModalProps = {
  children: ReactNode;
  title?: string;
  titleAs?: Title;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  titleColor?: string;
  titleJustifyContent?: Position;
  titleMarginBottom?: number;
  hasCloseIcon?: boolean;
  closeIcon?: ReactNode;
  closeIconColor?: string;
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
  titleColor = "black",
  titleJustifyContent,
  titleMarginBottom = 2,
  hasCloseIcon,
  closeIcon,
  closeIconColor,
  closeIconMarginBottom = 1,
  backgroundColor = "#f9fbff",
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

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (hasClickedOutside) {
      handleOnClose();
    }
  }, [hasClickedOutside]);

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
    <div className={clsx(styles.overlay, className)}>
      <div className={styles.container} ref={ref} style={{ backgroundColor, padding }}>
        {hasCloseIcon
          ? (closeIcon ?? (
              <CloseIcon
                className={styles.close}
                onClick={handleOnClose}
                style={{ marginBottom: toRem(closeIconMarginBottom), color: closeIconColor }}
              ></CloseIcon>
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
