import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "../../../src";

const meta = {
	component: Input,
	args: {
		name: "firstname",
		type: "text",
		label: "firstname",
		autoComplete: "off",
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
	},
};

export const WithMessage: Story = {
	args: {
		message: "firstname error",
		status: "error",
		autoComplete: "off",
	},
	play: async ({ canvas }) => {
		const message = canvas.queryByRole("alert");
		await expect(message).toBeInTheDocument();
		await expect(message).toHaveTextContent("firstname error");
	},
};
