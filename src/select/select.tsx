import React, { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";
import { ArrowBottom } from "./icons";
import { useOutsideAlerter } from "..";
import { SelectOptionWithoutId, SelectOption } from "./select.types";

type Props = {
  options: SelectOptionWithoutId[];
  selectedValue?: string;
  onChange?: (option: SelectOption) => void;
};

export const Select = ({ options: optionsProps, selectedValue, onChange }: Props) => {
  const [options, setOptions] = useState<SelectOption[]>(null);
  const [isListVisible, setListVisibility] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(null);
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
      setSelectedOption(
        selectedValue ? options.find((option) => option.value === selectedValue) : options[0],
      );
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
    <div className={styles.container} ref={ref}>
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
