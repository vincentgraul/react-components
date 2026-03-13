import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./select.module.css";
import { SelectOptionWithoutId, SelectOption } from "./select.types";
import { useOutsideAlerter } from "..";
import ArrowBottomIcon from "./assets/arrow-down.svg?react";
import { AlignItems, BorderStyle, FontWeight, Height, Width } from "../types";
import { isNumber, toPercentage, toPx, toRem } from "../utils";

export type SelectProps = {
  options: SelectOptionWithoutId[];
  selectedValue?: string;
  label?: string;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
  labelAlignItems?: AlignItems;
  labelMarginBottom?: number;
  selectedOptionFontWeight?: FontWeight;
  optionFontSize?: number;
  optionFontWeight?: FontWeight;
  width?: Width;
  height?: Height;
  color?: string;
  borderWidth?: number;
  borderStyle?: BorderStyle;
  backgroundColor?: string;
  hoverOptionBackgroundColor?: string;
  hoverOptionColor?: string;
  hoverFontWeight?: FontWeight;
  icon?: ReactNode;
  onChange?: (option: SelectOption) => void;
  className?: string;
};

export const Select = ({
  className,
  options: optionsProps,
  selectedValue,
  label,
  labelFontSize = 1,
  labelFontWeight = 400,
  labelAlignItems = "center",
  labelMarginBottom = 1,
  optionFontSize = 1,
  selectedOptionFontWeight = 400,
  optionFontWeight = 400,
  width = 100,
  height = 3,
  color = "black",
  borderWidth = 1,
  borderStyle = "solid",
  backgroundColor = "transparent",
  hoverOptionBackgroundColor = "#ecf0f1",
  hoverOptionColor = "black",
  hoverFontWeight = 400,
  icon,
  onChange,
}: SelectProps) => {
  const CSSVariables = {
    "--hover-background-color": hoverOptionBackgroundColor,
    "--hover-text-color": hoverOptionColor,
    "--hover-text-weight": hoverFontWeight,
  } as CSSProperties;

  const options = optionsProps.map((option: SelectOptionWithoutId, index: number) => ({
    ...option,
    id: index,
  }));
  const hasOneOption = options.length < 2;

  const [isListVisible, setListVisibility] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const ref = useRef(null);
  const { hasClickedOutside, onReset: onResetOutsideAlerter } = useOutsideAlerter(ref);

  const handleSelectedOptionClick = () => {
    onResetOutsideAlerter();
    setListVisibility(!isListVisible);
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setListVisibility(false);

    if (onChange) {
      onChange(option);
    }
  };

  useEffect(() => {
    if (!selectedOption) {
      const value = options.find((option) => option.value === selectedValue) ?? options[0];
      setSelectedOption(value);
    }
  }, [options]);

  useEffect(() => {
    if (hasClickedOutside) {
      setListVisibility(false);
    }
  }, [hasClickedOutside]);

  if (!selectedOption) {
    return null;
  }

  return (
    <div
      className={clsx(styles.container, className)}
      ref={ref}
      style={{
        width: isNumber(width) ? toPercentage(width) : width,
        alignItems: labelAlignItems,
        ...CSSVariables,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: toRem(labelFontSize),
            fontWeight: labelFontWeight,
            marginBottom: toRem(labelMarginBottom),
          }}
        >
          {label}
        </span>
      )}

      <div
        className={styles["selected-option-container"]}
        onClick={handleSelectedOptionClick}
        style={{
          borderWidth: toPx(borderWidth),
          borderColor: color,
          borderStyle,
          backgroundColor,
          color,
          cursor: hasOneOption ? "default" : "pointer",
          pointerEvents: hasOneOption ? "none" : "auto",
          height: isNumber(height) ? toRem(height) : height,
        }}
      >
        <span
          className={styles["selected-option-text"]}
          style={{
            fontSize: toRem(optionFontSize),
            fontWeight: selectedOptionFontWeight,
            borderColor: color,
          }}
        >
          {selectedOption.label}
        </span>
        {icon ?? (
          <div
            className={styles["selected-option-arrow-container"]}
            style={{
              borderLeftStyle: borderStyle,
              borderWidth: toPx(borderWidth),
            }}
          >
            <ArrowBottomIcon className={styles["selected-option-arrow"]} style={{ color }} />
          </div>
        )}
      </div>

      {isListVisible && (
        <ul
          className={styles["options-list"]}
          style={{
            borderWidth: toPx(borderWidth),
            borderColor: color,
            borderStyle,
            backgroundColor,
            color,
            fontSize: toRem(optionFontSize),
            fontWeight: optionFontWeight,
          }}
        >
          {options
            .filter((option: SelectOption) => option.id !== selectedOption.id)
            .map((option: SelectOption) => (
              <li
                className={styles.option}
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
