import { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";
import clsx from "clsx";
import { FontWeight } from "../types";
import { toRem } from "../utils";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  labelFontWeight?: FontWeight;
  labelColor?: string;
  borderColor?: string;
  checkColor?: string;
  checkBackgroundColor?: string;
  iconSize?: "small" | "medium" | "large";
  size?: number;
  className?: string;
};

export const Checkbox = ({
  className,
  label,
  labelFontWeight = 400,
  labelColor,
  borderColor,
  checkColor,
  checkBackgroundColor,
  iconSize,
  size = 2,
  ...rest
}: CheckboxProps) => {
  const CSSVariables = {
    "--checkbox-size": toRem(size),
    "--checkbox-color-check": checkColor,
    "--checkbox-background-color-checked": checkBackgroundColor,
  } as CSSProperties;

  return (
    <label
      className={clsx(styles.container, className)}
      style={{ fontWeight: labelFontWeight, ...CSSVariables }}
    >
      <input
        className={clsx(styles.input, iconSize && styles[`icon-${iconSize}`])}
        type="checkbox"
        style={{ borderColor }}
        {...rest}
      ></input>
      <span className={styles.label} style={{ color: labelColor }}>
        {label}
      </span>
    </label>
  );
};
