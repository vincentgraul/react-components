import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Breadcrumb } from "../../../src";

const meta = {
	component: Breadcrumb,
	args: {
		config: {
			url: new URL("https://vincentgraul.com/questions/1/team"),
		},
		onClick: fn(),
		color: "black",
	},
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ args, canvas, userEvent }) => {
		const buttons = canvas.queryAllByRole("button");
		expect(buttons).toHaveLength(3);

		const separators = canvas.queryAllByTestId("separator");
		expect(separators).toHaveLength(2);

		const expectedItems = [
			{ label: "questions", url: "/questions" },
			{ label: "1", url: "/questions/1" },
			{ label: "team", url: "/questions/1/team" },
		];

		for (let i = 0; i < buttons.length; i++) {
			await userEvent.click(buttons[i]);
			expect(args.onClick).toHaveBeenNthCalledWith(i + 1, expectedItems[i]);
		}
	},
};

export const WithOne: Story = {
	args: {
		config: {
			url: new URL("https://vincentgraul.com/questions"),
		},
	},
	play: async ({ args, canvas, userEvent }) => {
		const buttons = canvas.queryAllByRole("button");
		expect(buttons).toHaveLength(1);

		const separators = canvas.queryByTestId("separator");
		expect(separators).toBeNull();

		const expectedItem = { label: "questions", url: "/questions" };
		await userEvent.click(buttons[0]);
		expect(args.onClick).toHaveBeenCalledWith(expectedItem);
	},
};
