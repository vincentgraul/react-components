import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { DropZone } from "../../../src";

const meta = {
	component: DropZone,
	args: {
		onFileChanged: fn(),
		label: "Photo (optionnel)",
		text: "Glissez-déposez votre image ici",
		width: 40,
	},
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	play: async ({ args, canvas, userEvent }) => {
		await expect(canvas.queryByRole("button", { name: "Upload a file" })).toBeInTheDocument();
		await expect(
			canvas.queryByRole("button", { name: "Remove uploaded file" }),
		).not.toBeInTheDocument();

		const input = canvas.getByTestId("input-file");
		const file = new File(["content"], "photo.png", { type: "image/png" });

		await userEvent.upload(input, file);
		await expect(args.onFileChanged).toHaveBeenCalledTimes(1);

		await expect(canvas.getByRole("button", { name: "Upload a file" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Remove uploaded file" })).toBeInTheDocument();

		await userEvent.click(canvas.getByRole("button", { name: "Remove uploaded file" }));
		await expect(args.onFileChanged).toHaveBeenCalledTimes(2);
	},
};
