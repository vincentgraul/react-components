import { useState, FocusEvent, InputHTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import { InputType, InputColors, InputStatus } from "./input.types";
import styles from "./input.module.css";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type: InputType;
  colors?: InputColors;
  status?: InputStatus;
  message?: string;
  width?: number;
  height?: number;
  borderWidth?: number;
  borderWidthFocus?: number;
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
  borderWidthFocus,
  labelWeight,
  labelSize,
  messageWeight,
  messageSize,
  onFocus,
  onBlur,
  ...rest
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const CSSVariables = {
    "--success-color": colors?.success,
    "--warning-color": colors?.warning,
    "--error-color": colors?.error,
    "--focus-color": colors?.focus,
  } as CSSProperties;

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(e);
    }
    setIsFocus(true);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocus(false);
  };

  return (
    <div
      className={clsx(styles.container, className)}
      style={{
        width: `${width ?? 100}%`,
        height: height !== undefined ? `${height}rem` : "auto",
        ...CSSVariables,
      }}
    >
      <div className={styles["input-container"]}>
        <input
          className={clsx(styles.input, status)}
          {...rest}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <fieldset
          className={clsx(styles.fieldset, status)}
          style={{
            borderWidth: `${isFocus ? borderWidthFocus : borderWidth}px`,
          }}
        >
          <legend
            className={styles.legend}
            style={{
              fontWeight: labelWeight ?? 400,
              fontSize: `${labelSize ?? 1}rem`,
            }}
          >
            {label}
          </legend>
        </fieldset>
      </div>

      {message && (
        <div className={clsx(styles["message-container"], status)}>
          <span
            className={styles.message}
            style={{ fontWeight: messageWeight ?? 400, fontSize: `${messageSize ?? 1}rem` }}
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
};
