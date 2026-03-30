import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "../../../src";

const meta = {
	component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		label: "yes",
	},
};
