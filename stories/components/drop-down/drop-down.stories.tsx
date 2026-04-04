import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropDown } from "../../../src";

const meta = {
	component: DropDown,
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: <span>hello</span>,
		label: "Menu",
	},
};
