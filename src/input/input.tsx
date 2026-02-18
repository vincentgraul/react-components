import React, { CSSProperties } from "react";
import clsx from "clsx";
import { InputType, InputColors, InputStatus } from "./input.types";
import styles from "./input.module.css";

export type InputProps = Exclude<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type: InputType;
  colors?: InputColors;
  status?: InputStatus;
  message?: string;
  width?: number;
  height?: number;
  borderWidth?: number;
  labelWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  labelSize?: number;
  messageWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  messageSize?: number;
  className?: string;
};

export const Input = ({
  className,
  label,
  message,
  colors,
  status,
  width,
  height,
  borderWidth,
  labelWeight,
  labelSize,
  messageWeight,
  messageSize,
  ...rest
}: InputProps) => {
  const CSSVariables = {
    "--success-color": colors?.success,
    "--warning-color": colors?.warning,
    "--error-color": colors?.error,
    "--focus-color": colors?.focus,
    "--width": width && `${width}%`,
    "--height": height && `${height}rem`,
    "--border-width": borderWidth && `${borderWidth}px`,
    "--label-weight": labelWeight,
    "--label-size": labelSize && `${labelSize}rem`,
    "--message-weight": messageWeight,
    "--message-size": messageSize && `${messageSize}rem`,
  } as CSSProperties;

  return (
    <div className={clsx(styles.container, className)} style={CSSVariables}>
      <div className={styles["input-container"]}>
        <input className={clsx(styles.input, status)} {...rest} />
        <fieldset className={clsx(styles.fieldset, status)}>
          <legend className={styles.legend}>{label}</legend>
        </fieldset>
      </div>

      {message && (
        <div className={styles["message-container"]}>
          <span className={styles.message}>{message}</span>
        </div>
      )}
    </div>
  );
};
