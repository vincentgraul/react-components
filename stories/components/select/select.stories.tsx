import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bike, Car } from "lucide-react";
import { Flex, Select } from "../../../src";

const meta = {
	component: Select,
	args: {
		options: [
			{ label: "France", value: "fr" },
			{ label: "England", value: "en" },
			{ label: "Italy", value: "it" },
			{ label: "Scotland", value: "sc" },
		],
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithSelectedOption: Story = {
	args: {
		selectedValue: "it",
	},
};

export const WithIcon: Story = {
	args: {
		options: [
			{
				label: (
					<Flex alignItems="center" gap={0.5}>
						<Car />
						<span>Car</span>
					</Flex>
				),
				value: "car",
			},
			{
				label: (
					<Flex alignItems="center" gap={0.5}>
						<Bike />
						<span>Bike</span>
					</Flex>
				),
				value: "bike",
			},
		],
	},
};

export const WithOneOption: Story = {
	args: {
		options: [{ label: "Paris", value: "paris" }],
	},
};

export const WithLabel: Story = {
	args: {
		label: "Personnages",
	},
};
