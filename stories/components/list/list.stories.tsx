import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
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
				<ListItem icon={<ArrowRight />} text="cool"></ListItem>
				<ListItem icon={<ArrowRight />} text="top"></ListItem>
			</>
		),
	},
};

export const WithOnClick: Story = {
	args: {
		children: (
			<>
				<ListItem icon={<ArrowRight />} text="cool" onClick={() => console.log("click")}></ListItem>
				<ListItem icon={<ArrowRight />} text="top" onClick={() => console.log("click")}></ListItem>
			</>
		),
	},
};

export const WithBackround: Story = {
	args: {
		backgroundColor: "#e6d7d7",
		borderRadius: 5,
		padding: "1rem",
		children: (
			<>
				<ListItem icon={<ArrowRight />} text="cool" onClick={() => console.log("click")}></ListItem>
				<ListItem icon={<ArrowRight />} text="top" onClick={() => console.log("click")}></ListItem>
			</>
		),
	},
};
