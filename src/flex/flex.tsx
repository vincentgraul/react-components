import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./flex.module.css";
import { Sides } from "./flex.types";

type Props = {
  children: ReactNode;
  direction?: "row" | "column";
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: string;
  height?: string;
  margin?: Sides;
  padding?: Sides;
  className?: string;
};

export const Flex = ({
  className,
  children,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "nowrap",
  width,
  height,
  margin,
  padding,
}: Props) => (
  <div
    className={clsx(
      styles.container,
      styles[`direction-${direction}`],
      styles[`justify-${justify}`],
      styles[`align-${align}`],
      styles[`wrap-${wrap}`],
      className,
    )}
    style={{
      width: width ? width : undefined,
      height: height ? height : undefined,
      marginTop: margin?.top,
      marginRight: margin?.right,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      paddingTop: padding?.top,
      paddingRight: padding?.right,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
    }}
  >
    {children}
  </div>
);
