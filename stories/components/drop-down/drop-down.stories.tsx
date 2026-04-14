import type { Meta, StoryObj } from "@storybook/react-vite";
import { User } from "lucide-react";
import { expect } from "storybook/test";
import { DropDown, DropDownItem } from "../../../src";

const meta = {
	component: DropDown,
	args: {
		children: (
			<>
				<DropDownItem text="Logout" onClick={() => console.log("click")} />
				<DropDownItem text="Hello" onClick={() => console.log("click")} />
			</>
		),
		backgroundColor: "rgb(0,0,0)",
		itemTextColor: "rgb(255,255,255)",
		hoverItemTextColor: "rgb(0,0,0)",
		label: "Menu",
	},
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas, userEvent }) => {
		const button = canvas.getByRole("button");
		await expect(canvas.queryByRole("list")).not.toBeInTheDocument();

		// test open
		await userEvent.click(button);
		await expect(canvas.getByRole("list")).toBeInTheDocument();

		// test close
		await userEvent.click(button);
		await expect(canvas.queryByRole("list")).not.toBeInTheDocument();

		//test re-open
		await userEvent.click(button);
		await expect(canvas.getByRole("list")).toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		icon: <User data-testid="drop-down-icon" />,
		gap: 2.5,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByTestId("drop-down-icon")).toBeInTheDocument();
	},
};
