import { capitalize } from "@vincentgraul/utils/word";
import styles from "./country-selector.module.css";
import { CountrySelectorOption } from "./country-selector.types";
import { Select, SelectProps } from "..";
import * as Icons from "./icons";
import { toPx } from "../../utils";

export type CountrySelectorProps = {
  languages: string[];
  value?: string;
  flagHeight?: number;
  onChange?: (option: CountrySelectorOption) => void;
  className?: string;
};

export const CountrySelector = ({
  value,
  languages,
  onChange,
  flagHeight = 25,
  className,
  ...rest
}: CountrySelectorProps & Omit<SelectProps, "options">) => {
  const options = languages.map((language: string) => {
    const Flag = Icons[capitalize(language) as keyof typeof Icons];
    return {
      value: language,
      label: <Flag className={styles.flag} style={{ height: toPx(flagHeight) }} />,
    };
  });

  if (!options) {
    return null;
  }

  return (
    <Select
      className={className}
      selectedValue={value}
      options={options}
      onChange={onChange}
      width="fit-content"
      {...rest}
    ></Select>
  );
};
