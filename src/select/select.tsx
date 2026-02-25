import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./select.module.css";
import { SelectOptionWithoutId, SelectOption } from "./select.types";
import { useOutsideAlerter } from "..";
import { ArrowBottom } from "./icons";

export type SelectProps = {
  options: SelectOptionWithoutId[];
  selectedValue?: string;
  onChange?: (option: SelectOption) => void;
  className?: string;
};

export const Select = ({
  className,
  options: optionsProps,
  selectedValue,
  onChange,
}: SelectProps) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
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
    setOptions(
      optionsProps.map((option: SelectOptionWithoutId, index: number) => ({
        ...option,
        id: index,
      })),
    );
  }, [optionsProps]);

  useEffect(() => {
    if (options && !selectedOption) {
      const matchOption = selectedValue
        ? options.find((option) => option.value === selectedValue)
        : options[0];
      setSelectedOption(matchOption ?? null);
    }
  }, [options]);

  useEffect(() => {
    if (hasClickedOutside) {
      setListVisibility(false);
    }
  }, [hasClickedOutside]);

  if (!options || !selectedOption) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className)} ref={ref}>
      <div className={styles["selected-option-container"]} onClick={handleSelectedOptionClick}>
        <span className={styles["selected-option-text"]}>{selectedOption.label}</span>
        <ArrowBottom className={styles["selected-option-arrow"]} />
      </div>

      {isListVisible && (
        <ul className={styles["options-list"]}>
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
