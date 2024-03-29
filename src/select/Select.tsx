import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowBottom } from "./icons";
import useOutsideAlerter from "../outside-alerter/useOutsideAlerter";

interface Option {
  id: number;
  label: string | ReactNode;
  value: string;
}

export type OptionWithoutId = Omit<Option, "id">;

interface Props {
  options: OptionWithoutId[];
  selectedValue?: string;
  onChange?: (option: Option) => void;
  className?: string;
}

export default function Select(props: Props) {
  const { selectedValue, className, onChange } = props;

  const [options, setOptions] = useState<Option[]>(null);
  const [isListVisible, setListVisibility] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(null);
  const ref = useRef(null);
  const { hasClickedOutside, onReset: onResetOutsideAlerter } = useOutsideAlerter(ref);

  const handleSelectedOptionClick = () => {
    onResetOutsideAlerter();
    setListVisibility(!isListVisible);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setListVisibility(false);

    if (onChange) {
      onChange(option);
    }
  };

  useEffect(() => {
    setOptions(
      props.options.map((option: OptionWithoutId, index: number) => ({ ...option, id: index })),
    );
  }, [props.options]);

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
    <Container className={`select ${className}`} ref={ref}>
      <SelectedOptionContainer
        className="select-selected-option"
        onClick={handleSelectedOptionClick}
      >
        <SelectedOptionText className="select-selected-option-text">
          {selectedOption.label}
        </SelectedOptionText>
        <SelectedOptionArrow className="select-arrow" />
      </SelectedOptionContainer>

      {isListVisible && (
        <OptionsList className="select-options">
          {options
            .filter((option: Option) => option.id !== selectedOption.id)
            .map((option: Option) => (
              <Option
                className="select-option"
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </Option>
            ))}
        </OptionsList>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
`;

const SelectedOptionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
`;

const SelectedOptionText = styled.span`
  padding-right: 10px;
  border-right: 1px solid black;
`;

const SelectedOptionArrow = styled(ArrowBottom)`
  width: 15px;
  margin-left: 10px;
`;

const OptionsList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  user-select: none;
  background-color: white;
  border-radius: 5px;
`;

const Option = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ecf0f1;

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
    }

    &:only-child {
      border-radius: 5px;
    }
  }
`;
