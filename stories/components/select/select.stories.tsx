import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bike, Car } from "lucide-react";
import { expect, fn } from "storybook/test";
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
		onChange: fn(),
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ args, canvas, userEvent }) => {
		// Initial state
		await expect(canvas.queryByRole("list")).not.toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Choose an option" })).toHaveTextContent(
			"France",
		);

		// Show options
		await userEvent.click(canvas.getByRole("button", { name: "Choose an option" }));

		await expect(canvas.getByRole("list")).toBeInTheDocument();

		// Select an option
		await userEvent.click(canvas.getByRole("button", { name: "Italy" }));

		await expect(args.onChange).toHaveBeenCalledWith({ id: 2, label: "Italy", value: "it" });
		await expect(canvas.queryByRole("list")).not.toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Choose an option" })).toHaveTextContent(
			"Italy",
		);
		await expect(canvas.queryByRole("button", { name: "France" })).not.toBeInTheDocument();
	},
};

export const WithSelectedOption: Story = {
	args: {
		selectedValue: "it",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: "Choose an option" })).toHaveTextContent(
			"Italy",
		);
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
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: "Choose an option" })).toHaveStyle({
			cursor: "default",
			pointerEvents: "none",
		});
	},
};

export const WithLabel: Story = {
	args: {
		label: "Personnages",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Personnages")).toBeInTheDocument();
	},
};
