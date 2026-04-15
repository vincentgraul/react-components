import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
import { expect } from "storybook/test";
import { List } from "../../../src";

const meta = {
	component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<List.Item text="Item 1" />
				<List.Item text="Item 2" />
			</>
		),
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Item 1")).toBeInTheDocument();
		await expect(canvas.getByText("Item 2")).toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<List.Item icon={<ArrowRight data-testid="list-item-1-icon" />} text="Item 1" />
				<List.Item icon={<ArrowRight data-testid="list-item-2-icon" />} text="Item 2" />
			</>
		),
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByTestId("list-item-1-icon")).toBeInTheDocument();
		await expect(canvas.getByTestId("list-item-2-icon")).toBeInTheDocument();
	},
};
