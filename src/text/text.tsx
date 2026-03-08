import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./text.module.css";

export type TextProps = {
  children: ReactNode;
  fontSize?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: number;
  fontStyle?: "normal" | "italic" | "oblique";
  color?: string;
  className?: string;
};

export const Text = ({
  className,
  children,
  fontSize,
  as,
  fontWeight,
  lineHeight,
  textAlign,
  fontStyle,
  color,
}: TextProps) => {
  const TextAs = as ?? "p";

  return (
    <TextAs
      className={clsx(styles.container, className)}
      style={{
        fontSize: `${fontSize ?? 1}rem`,
        fontWeight: fontWeight ?? 400,
        lineHeight: `${lineHeight ?? 1.5}rem`,
        textAlign: textAlign ?? "left",
        fontStyle: fontStyle ?? "normal",
        color: color ?? "black",
      }}
    >
      {children}
    </TextAs>
  );
};
