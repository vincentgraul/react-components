import clsx from "clsx";
import styles from "./loader.module.css";
import LoaderIcon from "./assets/loader.svg";

export type LoaderProps = {
  text?: string;
  hasImage?: boolean;
  srcImage?: string;
  imageSize?: number;
  imageGap?: number;
  className?: string;
};

export const Loader = ({
  className,
  text,
  hasImage,
  srcImage,
  imageSize,
  imageGap,
}: LoaderProps) => (
  <div className={clsx(styles.overlay, className)}>
    <div className={styles.container} style={{ gap: `${imageGap ?? 1}rem` }}>
      {hasImage && (
        <img
          className={styles.image}
          src={srcImage ?? LoaderIcon}
          style={{ width: `${imageSize ?? 50}px` }}
          alt=""
        ></img>
      )}
      {text && <span>{text}</span>}
    </div>
  </div>
);
