import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./text.module.css";
import { FontStyle, FontWeight, Position, Text as TextType } from "../../types";
import { toRem } from "../../utils";

export type TextProps = {
  children: ReactNode;
  fontSize?: number;
  as?: TextType;
  fontWeight?: FontWeight;
  textAlign?: Position;
  lineHeight?: number;
  fontStyle?: FontStyle;
  color?: string;
  className?: string;
};

export const Text = ({
  className,
  children,
  fontSize = 1,
  as: TextAs = "p",
  fontWeight = 400,
  lineHeight = 1.5,
  textAlign = "start",
  fontStyle = "normal",
  color,
}: TextProps) => (
  <TextAs
    className={clsx(styles.container, className)}
    style={{
      fontSize: toRem(fontSize),
      fontWeight,
      lineHeight,
      textAlign,
      fontStyle,
      color,
    }}
  >
    {children}
  </TextAs>
);
