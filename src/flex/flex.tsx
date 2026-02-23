import { ReactNode } from "react";
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
  alignSelf?: "start" | "center" | "end" | "stretch";
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
  alignSelf,
  wrap,
  width,
  height,
  padding,
  gap,
}: FlexProps) => (
  <div
    className={clsx(styles.container, className)}
    style={{
      width: `${width ?? 100}%`,
      height: height !== undefined ? `${height}rem` : "auto",
      flexDirection: direction,
      justifyContent,
      alignItems,
      alignSelf,
      flexWrap: wrap,
      padding,
      gap: `${gap ?? 0}rem`,
    }}
  >
    {children}
  </div>
);
