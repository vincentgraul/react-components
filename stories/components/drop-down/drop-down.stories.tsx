import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { DropDown } from "../../../src";

const meta = {
	component: DropDown,
	args: {
		children: <span>hello</span>,
		label: "Menu",
	},
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas, userEvent }) => {
		const button = canvas.getByRole("button");
		await expect(canvas.queryByText("hello")).not.toBeInTheDocument();

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
