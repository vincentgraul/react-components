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
  width?: string;
  height?: string;
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
  ...rest
}: InputProps) => {
  const CSSVariables = {
    "--success-color": colors?.success,
    "--warning-color": colors?.warning,
    "--error-color": colors?.error,
    "--focus-color": colors?.focus,
  } as CSSProperties;

  return (
    <div
      className={clsx(styles.container, className)}
      style={{
        width: width ? width : undefined,
        height: height ? height : undefined,
        ...CSSVariables,
      }}
    >
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
