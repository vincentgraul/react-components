import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./loader.module.css";
import LoaderIcon from "./assets/loader.svg?react";
import { toPx, toRem, toSeconds } from "../../utils";
import { FontWeight } from "../../types";

export type LoaderProps = {
  text?: string;
  fontWeight?: FontWeight;
  color?: string;
  overlayBackgroundColor?: string;
  hasIcon?: boolean;
  icon?: ReactNode;
  iconWidth?: number;
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
  iconWidth = 50,
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
        {hasIcon && (
          <>
            {icon ?? (
              <LoaderIcon
                className={styles.image}
                style={{ width: toPx(iconWidth), color: iconColor }}
              ></LoaderIcon>
            )}
          </>
        )}
        {text && <span style={{ fontWeight }}>{text}</span>}
      </div>
    </div>
  );
};
