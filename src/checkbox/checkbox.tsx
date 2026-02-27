import { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";
import clsx from "clsx";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  labelWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  labelColor?: string;
  borderWidth?: number;
  borderColor?: string;
  checkColor?: string;
  checkBackgroundColor?: string;
  size?: number;
  gap?: number;
  className?: string;
};

export const Checkbox = ({
  className,
  label,
  labelWeight,
  labelColor,
  borderWidth,
  borderColor,
  checkColor,
  checkBackgroundColor,
  size,
  gap,
  ...rest
}: CheckboxProps) => {
  const CSSVariables = {
    "--checkbox-size": `${size ?? 1}rem`,
    "--checkbox-color-check": checkColor,
    "--checkbox-background-color-checked": checkBackgroundColor,
  } as CSSProperties;

  return (
    <label
      className={clsx(styles.container, className)}
      style={{ fontWeight: labelWeight ?? 400, gap: `${gap ?? 0.2}rem`, ...CSSVariables }}
    >
      <input
        className={styles.input}
        type="checkbox"
        style={{
          borderColor,
          borderWidth: `${borderWidth ?? 1}px`,
        }}
        {...rest}
      ></input>
      <span className={styles.label} style={{ color: labelColor }}>
        {label}
      </span>
    </label>
  );
};
