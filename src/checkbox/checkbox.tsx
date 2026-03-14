import { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";
import clsx from "clsx";
import { FontWeight } from "../types";
import { toPx, toRem } from "../utils";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  labelFontWeight?: FontWeight;
  labelColor?: string;
  borderWidth?: number;
  borderColor?: string;
  checkColor?: string;
  checkBackgroundColor?: string;
  iconSize?: "small" | "medium" | "large";
  size?: number;
  gap?: number;
  className?: string;
};

export const Checkbox = ({
  className,
  label,
  labelFontWeight = 400,
  labelColor,
  borderWidth = 1,
  borderColor,
  checkColor,
  checkBackgroundColor,
  iconSize,
  size = 1,
  gap = 0.2,
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
      style={{ fontWeight: labelFontWeight, gap: toRem(gap), ...CSSVariables }}
    >
      <input
        className={clsx(styles.input, iconSize && styles[`icon-${iconSize}`])}
        type="checkbox"
        style={{
          borderColor,
          borderWidth: toPx(borderWidth),
        }}
        {...rest}
      ></input>
      <span className={styles.label} style={{ color: labelColor }}>
        {label}
      </span>
    </label>
  );
};
