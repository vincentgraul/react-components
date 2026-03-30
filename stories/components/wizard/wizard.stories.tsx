import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ButtonHTMLAttributes } from "react";
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

export const Basic: Story = {};

export const WithTitles: Story = {
	args: {
		header: {
			titles: ["First step", "Second step", "Third step"],
			hasStepIndicator: true,
		},
	},
};

export const WithSpecificStep: Story = {
	args: {
		step: 2,
	},
};

export const WithSpecificRender: Story = {
	args: {
		renderHeader: () => <div>Custom header</div>,
		renderFooter: () => <div>Custom footer</div>,
	},
};

const MyCustomButton = ({ onClick, children }: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button width={30} onClick={onClick}>
		{children}
	</Button>
);

export const WithCustomButton: Story = {
	args: {
		footer: {
			Button: MyCustomButton,
			nextButtonText: "Suivant",
			previousButtonText: "Précédent",
		},
	},
};

export const WithFinalize: Story = {
	args: {
		footer: {
			onFinalize: () => {
				console.log("finalize");
			},
		},
	},
};
