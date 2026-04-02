import "/node_modules/flag-icons/css/flag-icons.min.css";

import clsx from "clsx";
import { toPx } from "../../utils";
import { Select, type SelectProps } from "..";
import styles from "./country-selector.module.css";
import type { CountrySelectorOption } from "./country-selector.types";

export type CountrySelectorProps = {
	languages: string[];
	value?: string;
	flagWidth?: number;
	onChange?: (option: CountrySelectorOption) => void;
	className?: string;
};

export const CountrySelector = ({
	value,
	languages,
	onChange,
	flagWidth = 25,
	className,
	...rest
}: CountrySelectorProps & Omit<SelectProps, "options">) => {
	const options = languages.map((language: string) => {
		return {
			value: language,
			label: (
				<span
					className={clsx(styles.flag, `fi fi-${language}`)}
					style={{ width: toPx(flagWidth) }}
				/>
			),
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
