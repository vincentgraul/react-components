import clsx from "clsx";
import styles from "./loader.module.css";
import LoaderIcon from "./assets/loader.svg";
import { CSSProperties } from "react";

export type LoaderProps = {
  text?: string;
  showImage?: boolean;
  imageSrc?: string;
  imageSize?: number;
  imageGap?: number;
  imageSpeed?: number;
  className?: string;
};

export const Loader = ({
  className,
  text,
  showImage,
  imageSrc,
  imageSize,
  imageGap,
  imageSpeed,
}: LoaderProps) => {
  const CSSVariables = {
    "--animation-duration": `${imageSpeed ?? 1}s`,
  } as CSSProperties;

  return (
    <div className={clsx(styles.overlay, className)} style={CSSVariables}>
      <div className={styles.container} style={{ gap: `${imageGap ?? 1}rem` }}>
        {showImage && (
          <img
            className={styles.image}
            src={imageSrc ?? LoaderIcon}
            style={{ width: `${imageSize ?? 50}px` }}
            alt=""
          ></img>
        )}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
};
