import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./flex.module.css";

export type FlexProps = {
  children: ReactNode;
  direction?: "row" | "column";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  alignItems?: "start" | "center" | "end" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: number;
  height?: number;
  padding?: string;
  gap?: number;
  className?: string;
};

export const Flex = ({
  className,
  children,
  direction,
  justifyContent,
  alignItems,
  wrap,
  width,
  height,
  padding,
  gap,
}: FlexProps) => {
  const CSSVariables = {
    "--width": width && `${width}%`,
    "--height": height && `${height}%`,
    "--direction": direction,
    "--justify-content": justifyContent,
    "--align-items": alignItems,
    "--wrap": wrap,
    "--padding": padding,
    "--gap": gap && `${gap}rem`,
  } as CSSProperties;

  return (
    <div className={clsx(styles.container, className)} style={CSSVariables}>
      {children}
    </div>
  );
};
