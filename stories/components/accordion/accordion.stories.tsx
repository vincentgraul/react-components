import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings } from "lucide-react";
import { expect } from "storybook/test";
import { Accordion } from "../../../src";

const meta = {
	component: Accordion,
	args: {
		children: <span>hello</span>,
		label: "Settings",
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas, userEvent }) => {
		const button = canvas.getByRole("button");
		await expect(canvas.queryByRole("list")).not.toBeInTheDocument();

		// test open
		await userEvent.click(button);
		await expect(canvas.getByText("hello")).toBeInTheDocument();

		// test close
		await userEvent.click(button);
		await expect(canvas.queryByText("hello")).not.toBeInTheDocument();

		//test re-open
		await userEvent.click(button);
		await expect(canvas.getByText("hello")).toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		icon: <Settings data-testid="accordion-icon" />,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByTestId("accordion-icon")).toBeInTheDocument();
	},
};
