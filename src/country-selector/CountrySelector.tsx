import React, { ReactNode, useEffect, useState } from "react";
import Select from "../select/Select";
import { capitalize } from "@vincentgraul/utils/word";

interface Props {
  languages: string[];
  onChange?: (option: Option) => void;
  className?: string;
}

interface Option {
  value: string;
  label: ReactNode;
}

export default function CountrySelector(props: Props) {
  const { className, languages, onChange } = props;
  const [options, setOptions] = useState<Option[]>(null);

  useEffect(() => {
    const fetchIcon = async (name: string) => {
      const { default: Flag } = await import(`./icons/${capitalize(name)}.js`);
      return Flag;
    };

    const prepareOptions = async () => {
      setOptions(
        await Promise.all(
          languages.map(async (language: string) => {
            const Flag = await fetchIcon(language);
            return {
              value: language,
              label: <Flag style={{ ...FlagStyle }} />,
            };
          })
        )
      );
    };

    prepareOptions();
  }, [languages]);

  if (!options) {
    return null;
  }

  return (
    <Select
      className={`country-selector ${className}`}
      options={options}
      onChange={onChange}
    ></Select>
  );
}

const FlagStyle = {
  display: "block",
  width: "30px",
  margin: "auto",
  borderRadius: "2px",
};
