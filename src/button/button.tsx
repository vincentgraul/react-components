import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderColor?: string;
  alignSelf?: "start" | "center" | "end";
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  borderRadius?: number;
  borderWidth?: number;
  padding?: string;
  hoverOpacity?: number;
  className?: string;
};

export const Button = ({
  className,
  children,
  width,
  height,
  alignSelf,
  fontSize,
  fontWeight,
  borderRadius,
  borderWidth,
  padding,
  color,
  backgroundColor,
  borderColor,
  hoverOpacity,
  ...rest
}: ButtonProps) => {
  const CSSVariables = {
    "--hover-opacity": hoverOpacity,
  } as CSSProperties;

  return (
    <button
      className={clsx(styles.container, className)}
      style={{
        width: `${width ?? 100}%`,
        height: height !== undefined ? `${height}rem` : "auto",
        borderRadius: `${borderRadius ?? 0}px`,
        borderWidth: `${borderWidth ?? 1}px`,
        fontSize: `${fontSize ?? 1}rem`,
        fontWeight: fontWeight ?? 400,
        alignSelf,
        padding,
        color: color ?? "black",
        backgroundColor: backgroundColor ?? "white",
        borderColor: borderColor ?? "black",
        ...CSSVariables,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
