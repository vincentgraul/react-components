import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
import { expect } from "storybook/test";
import { List, ListItem } from "../../../src";

const meta = {
	component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<ListItem text="Item 1"></ListItem>
				<ListItem text="Item 2"></ListItem>
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
				<ListItem icon={<ArrowRight data-testid="list-item-1-icon" />} text="Item 1"></ListItem>
				<ListItem icon={<ArrowRight data-testid="list-item-2-icon" />} text="Item 2"></ListItem>
			</>
		),
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByTestId("list-item-1-icon")).toBeInTheDocument();
		await expect(canvas.getByTestId("list-item-2-icon")).toBeInTheDocument();
	},
};

export const WithOnClick: Story = {
	args: {
		children: (
			<>
				<ListItem
					icon={<ArrowRight />}
					text="Item 1"
					onClick={() => console.log("click")}
				></ListItem>
				<ListItem
					icon={<ArrowRight />}
					text="Item 2"
					onClick={() => console.log("click")}
				></ListItem>
			</>
		),
	},
};
