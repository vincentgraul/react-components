import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Loader } from "../../../src";

const meta = {
	component: Loader,
	args: {
		text: "In progress...",
	},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("img", { name: "Loading" })).not.toBeInTheDocument();
	},
};

export const WithImage: Story = {
	args: {
		hasIcon: true,
	},
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("img", { name: "Loading" })).toBeInTheDocument();
	},
};
