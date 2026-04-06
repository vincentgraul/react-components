import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ButtonHTMLAttributes } from "react";
import { expect, fn } from "storybook/test";
import { Button, Wizard } from "../../../src";

const meta = {
	component: Wizard,
	args: {
		children: [
			<div key={0}>
				<p>Welcome to the first step</p>
			</div>,

			<div key={1}>
				<p>Welcome to the second step</p>
			</div>,

			<div key={2}>
				<p>Welcome to the last step</p>
			</div>,
		],
	},
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas, userEvent }) => {
		expect(canvas.getByText("Welcome to the first step")).toBeInTheDocument();
		expect(canvas.queryByText("Welcome to the second step")).not.toBeInTheDocument();
		expect(canvas.queryByText("Welcome to the last step")).not.toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Next" })).toBeInTheDocument();
		expect(canvas.queryByRole("button", { name: "Previous" })).not.toBeInTheDocument();

		await userEvent.click(canvas.getByRole("button", { name: "Next" }));

		expect(canvas.queryByText("Welcome to the first step")).not.toBeInTheDocument();
		expect(canvas.getByText("Welcome to the second step")).toBeInTheDocument();
		expect(canvas.queryByText("Welcome to the last step")).not.toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Next" })).toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Previous" })).toBeInTheDocument();
	},
};

export const WithTitles: Story = {
	args: {
		header: {
			titles: ["First step", "Second step", "Third step"],
			hasStepIndicator: true,
		},
	},
	play: async ({ canvas, userEvent }) => {
		await expect(canvas.getByRole("heading")).toHaveTextContent("First step");
		await expect(canvas.getByText("1/3")).toBeInTheDocument();

		await userEvent.click(canvas.getByRole("button", { name: "Next" }));

		await expect(canvas.getByRole("heading")).toHaveTextContent("Second step");
		await expect(canvas.getByText("2/3")).toBeInTheDocument();
	},
};

export const WithSpecificStep: Story = {
	args: {
		step: 2,
	},
	play: async ({ canvas }) => {
		expect(canvas.getByText("Welcome to the second step")).toBeInTheDocument();
	},
};

export const WithSpecificRender: Story = {
	args: {
		renderHeader: () => <div>Custom header</div>,
		renderFooter: () => <div>Custom footer</div>,
	},
	play: async ({ canvas }) => {
		expect(canvas.getByText("Custom header")).toBeInTheDocument();
		expect(canvas.getByText("Custom footer")).toBeInTheDocument();
	},
};

const MyCustomButton = ({ onClick, children }: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button width={30} onClick={onClick}>
		{children}
	</Button>
);

export const WithCustomButton: Story = {
	args: {
		step: 2,
		footer: {
			Button: MyCustomButton,
			nextButtonText: "Suivant",
			previousButtonText: "Précédent",
		},
	},
	play: async ({ canvas }) => {
		expect(canvas.getByRole("button", { name: "Suivant" })).toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Précédent" })).toBeInTheDocument();
	},
};

export const WithFinalize: Story = {
	args: {
		step: 3,
		footer: {
			onFinalize: fn(),
		},
	},
	play: async ({ args, canvas, userEvent }) => {
		expect(canvas.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Previous" })).toBeInTheDocument();
		expect(canvas.getByRole("button", { name: "Finalize" })).toBeInTheDocument();

		await userEvent.click(canvas.getByRole("button", { name: "Finalize" }));
		expect(args.footer?.onFinalize).toHaveBeenCalledOnce();
	},
};
