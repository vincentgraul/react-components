import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./card.module.css";
import { Position, FontWeight, Size, Text, BorderStyle } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";

export type CardProps = {
  children: ReactNode;
  title?: string;
  titleAs?: Text;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  titleColor?: string;
  titleTextAlign?: Position;
  titleGap?: number;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: BorderStyle;
  borderColor?: string;
  padding?: string;
  width?: Size;
  height?: Size;
  className?: string;
};

export const Card = ({
  className,
  children,
  title,
  titleAs: Title = "h2",
  titleFontSize = 1,
  titleFontWeight = 400,
  titleColor,
  titleTextAlign,
  titleGap = 2,
  backgroundColor,
  borderRadius = 0,
  borderWidth = 0,
  borderStyle = "solid",
  borderColor,
  width = 100,
  height = "auto",
  padding,
}: CardProps) => (
  <div
    className={clsx(styles.container, className)}
    style={{
      width: isNumber(width) ? toPercentage(width) : width,
      height: isNumber(height) ? toRem(height) : height,
      borderRadius: toPx(borderRadius),
      borderWidth: toPx(borderWidth),
      borderStyle,
      borderColor,
      gap: toRem(titleGap),
      backgroundColor,
      padding,
    }}
  >
    {title && (
      <Title
        className={styles.title}
        style={{
          fontSize: toRem(titleFontSize),
          fontWeight: titleFontWeight,
          color: titleColor,
          textAlign: titleTextAlign,
        }}
      >
        {title}
      </Title>
    )}
    {children}
  </div>
);
