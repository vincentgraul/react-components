import React, { ReactNode, useEffect, useState } from "react";
import Select from "../select/Select";
import { capitalize } from "@vincentgraul/utils/word";
import * as Icons from "./icons";

interface Props {
  languages: string[];
  value?: string;
  onChange?: (option: Option) => void;
  flagWidth?: string;
  className?: string;
}

interface Option {
  value: string;
  label: ReactNode;
}

export default function CountrySelector(props: Props) {
  const { value, className, languages, onChange, flagWidth = "30px" } = props;
  const [options, setOptions] = useState<Option[]>(null);

  const FlagStyle = {
    display: "block",
    width: flagWidth,
    margin: "auto",
    borderRadius: "2px",
  };

  useEffect(() => {
    const prepareOptions = async () => {
      setOptions(
        await Promise.all(
          languages.map(async (language: string) => {
            const Flag = Icons[capitalize(language)];
            return {
              value: language,
              label: <Flag className="country-selector-flag" style={{ ...FlagStyle }} />,
            };
          }),
        ),
      );
    };

    prepareOptions();
  }, [languages]);

  if (!options) {
    return null;
  }

  return (
    <Select
      selectedValue={value}
      className={`country-selector ${className}`}
      options={options}
      onChange={onChange}
    ></Select>
  );
}
