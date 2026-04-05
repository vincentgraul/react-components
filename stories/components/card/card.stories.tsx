import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Card, Flex } from "../../../src";

const meta = {
	component: Card,
	args: {
		borderRadius: 5,
		children: (
			<Flex>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</p>
			</Flex>
		),
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: ({ canvas }) => {
		const title = canvas.queryByRole("heading");
		expect(title).toBeNull();
	},
};

export const WithTitle: Story = {
	args: {
		title: "Sign up",
		titleAs: "h2",
		titleFontSize: 2,
		titleFontWeight: 700,
		titleTextAlign: "center",
	},
	play: ({ canvas }) => {
		const title = canvas.queryByRole("heading", { level: 2 });
		expect(title).not.toBeNull();
	},
};
