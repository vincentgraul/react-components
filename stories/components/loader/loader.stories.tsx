import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Loader, Spinner, Text } from "../../../src";

const meta = {
	component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: <Text>Chargement en cours...</Text>,
	},
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("img", { name: "Loading" })).not.toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<Spinner />
				<Text>Chargement en cours...</Text>
			</>
		),
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("img", { name: "Loading" })).toBeInTheDocument();
	},
};
