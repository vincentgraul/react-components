import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./text.module.css";

export type TextProps = {
  children: ReactNode;
  size?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  align?: "left" | "center" | "right" | "justify";
  lineHeight?: number;
  style?: "normal" | "italic" | "oblique";
  color?: string;
  className?: string;
};

export const Text = ({
  className,
  children,
  size,
  as,
  weight,
  lineHeight,
  align,
  style,
  color,
}: TextProps) => {
  const TextAs = as ?? "p";

  return (
    <TextAs
      className={clsx(styles.container, className)}
      style={{
        fontSize: `${size ?? 1}rem`,
        fontWeight: weight ?? 400,
        lineHeight: `${lineHeight ?? 1.5}rem`,
        textAlign: align ?? "left",
        fontStyle: style ?? "normal",
        color: color ?? "black",
      }}
    >
      {children}
    </TextAs>
  );
};
