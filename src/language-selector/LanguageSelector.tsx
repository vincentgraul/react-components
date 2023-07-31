import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../select/Select";

interface Props {
  languages: string[];
  onChange?: (option: Option) => void;
}

interface Option {
  value: string;
  label: ReactNode;
}

export default function LanguageSelector(props: Props) {
  const { languages, onChange } = props;
  const [options, setOptions] = useState<Option[]>(null);

  useEffect(() => {
    const fetchIcon = async (name: string) => {
      const { default: path } = await import(`./flags/${name}.svg`);
      return path;
    };

    const prepareOptions = async () => {
      setOptions(
        await Promise.all(
          languages.map(async (language: string) => {
            return {
              value: language,
              label: <Flag src={await fetchIcon(language)}></Flag>,
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

  return <Select options={options} onChange={onChange}></Select>;
}

const Flag = styled.img`
  display: block;
  width: 30px;
  margin: auto;
  border-radius: 2px;
`;
