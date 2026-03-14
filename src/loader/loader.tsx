import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./loader.module.css";
import LoaderIcon from "./assets/loader.svg?react";
import { toPx, toRem, toSeconds } from "../utils";

export type LoaderProps = {
  text?: string;
  hasIcon?: boolean;
  icon?: ReactNode;
  imageWidth?: number;
  imageGap?: number;
  imageAnimationDuration?: number;
  className?: string;
};

export const Loader = ({
  className,
  text,
  hasIcon,
  icon,
  imageWidth = 50,
  imageGap = 1,
  imageAnimationDuration = 1,
}: LoaderProps) => {
  const CSSVariables = {
    "--animation-duration": toSeconds(imageAnimationDuration),
  } as CSSProperties;

  return (
    <div className={clsx(styles.overlay, className)} style={CSSVariables}>
      <div className={styles.container} style={{ gap: toRem(imageGap) }}>
        {hasIcon && (
          <>
            {icon ?? (
              <LoaderIcon className={styles.image} style={{ width: toPx(imageWidth) }}></LoaderIcon>
            )}
          </>
        )}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
};
