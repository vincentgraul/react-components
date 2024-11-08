import React, { CSSProperties } from "react";
import clsx from "clsx";
import { InputType, InputColors, InputStatus } from "./input.types";
import styles from "./input.module.css";

type Props = Exclude<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type: InputType;
  colors?: InputColors;
  status?: InputStatus;
  message?: string;
};

export const Input = ({ label, message, colors, status, ...rest }: Props) => {
  const CSSVariables = {
    "--success-color": colors?.success,
    "--warning-color": colors?.warning,
    "--error-color": colors?.error,
    "--focus-color": colors?.focus,
  } as CSSProperties;

  return (
    <div className={styles.container} style={CSSVariables}>
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
