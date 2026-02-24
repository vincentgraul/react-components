import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./card.module.css";

export type CardProps = {
  children: ReactNode;
  title?: string;
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  titleSize?: number;
  titleWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  titleColor?: string;
  titleAlign?: "start" | "center" | "end";
  backgroundColor?: string;
  borderRadius?: number;
  padding?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const Card = ({
  className,
  children,
  title,
  titleAs,
  titleSize,
  titleWeight,
  titleColor,
  titleAlign,
  backgroundColor,
  borderRadius,
  width,
  height,
  padding,
}: CardProps) => {
  const Title = titleAs ?? "h2";

  return (
    <div
      className={clsx(styles.container, className)}
      style={{
        borderRadius: `${borderRadius ?? 0}px`,
        width: `${width ?? 100}%`,
        height: height !== undefined ? `${height}rem` : "auto",
        backgroundColor,
        padding,
      }}
    >
      {title && (
        <Title
          className={styles.title}
          style={{
            fontSize: `${titleSize ?? 1}rem`,
            fontWeight: titleWeight ?? 400,
            color: titleColor,
            textAlign: titleAlign,
          }}
        >
          {title}
        </Title>
      )}
      {children}
    </div>
  );
};
