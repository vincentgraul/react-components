import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ButtonHTMLAttributes, useState } from "react";
import { expect } from "storybook/test";
import { Button, Modal } from "../../../src";

const meta = {
	component: Modal,
	args: {
		children: (
			<p style={{ margin: 0 }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis est at ipsum
				tempor, id elementum odio sollicitudin. Nam accumsan est diam, vitae semper ex dignissim
				lacinia. Morbi vitae massa dapibus, posuere ex ac, rhoncus justo. Curabitur sed varius
				mauris. Nam posuere augue metus, finibus faucibus nulla ullamcorper sed. Vivamus venenatis
				nec lorem quis scelerisque. Suspendisse at elit sed purus commodo vestibulum. Donec sed
				lorem nulla. Nam dolor urna, posuere eget maximus ac, eleifend quis nibh. Maecenas interdum
				porta metus, eu accumsan nunc facilisis nec. Nam id placerat tellus.
			</p>
		),
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("img", { name: "Close" })).not.toBeInTheDocument();
	},
};

export const WithTitle: Story = {
	args: { title: "Welcome" },
	play: async ({ canvas }) => {
		const title = canvas.getByRole("heading", { level: 2 });
		await expect(title).toBeInTheDocument();
		await expect(title).toHaveTextContent("Welcome");
	},
};

export const WithCloseIcon: Story = {
	args: { hasCloseIcon: true },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: "Close" })).toBeInTheDocument();
	},
};

const MyCustomButton = ({ onClick, children }: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button width={30} onClick={onClick}>
		{children}
	</Button>
);

export const WithButtons: Story = {
	args: {
		ConfirmButton: MyCustomButton,
		confirmButtonText: "Yes",
		DeclineButton: MyCustomButton,
		declineButtonText: "No",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: "Yes" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "No" })).toBeInTheDocument();
	},
};

export const WithOnlyConfirmButton: Story = {
	args: { ConfirmButton: MyCustomButton },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
	},
};

export const WithRender: Story = {
	args: { renderHeader: () => <div>header</div>, renderFooter: () => <div>footer</div> },
	play: async ({ canvas }) => {
		await expect(canvas.getByText("header")).toBeInTheDocument();
		await expect(canvas.getByText("footer")).toBeInTheDocument();
	},
};

export const WithOpen: Story = {
	args: {
		children: null,
	},
	render: () => {
		const [isOpen, setOpen] = useState<boolean>(false);
		return (
			<div>
				<button type="button" onClick={() => setOpen(true)}>
					Click
				</button>
				{isOpen && (
					<Modal onClose={() => setOpen(false)} title="Salut à tous" hasCloseIcon>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis est at ipsum
							tempor, id elementum odio sollicitudin. Nam accumsan est diam, vitae semper ex
							dignissim lacinia. Morbi vitae massa dapibus, posuere ex ac, rhoncus justo. Curabitur
							sed varius mauris. Nam posuere augue metus, finibus faucibus nulla ullamcorper sed.
							Vivamus venenatis nec lorem quis scelerisque. Suspendisse at elit sed purus commodo
							vestibulum. Donec sed lorem nulla. Nam dolor urna, posuere eget maximus ac, eleifend
							quis nibh. Maecenas interdum porta metus, eu accumsan nunc facilisis nec. Nam id
							placerat tellus.
						</p>
					</Modal>
				)}
			</div>
		);
	},
};
