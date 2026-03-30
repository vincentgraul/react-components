import { capitalize } from "@vincentgraul/utils/word";
import { toPx } from "../../utils";
import { Select, type SelectProps } from "..";
import { icons } from "./assets";
import styles from "./country-selector.module.css";
import type { CountrySelectorOption } from "./country-selector.types";

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
		const Flag = icons[capitalize(language)];
		return {
			value: language,
			label: <Flag className={styles.flag} style={{ height: toPx(flagHeight) }} />,
		};
	});

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
