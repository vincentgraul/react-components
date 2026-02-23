import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropZone } from "../../src";

const meta = {
  component: DropZone,
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Photo (optionnel)",
    text: "Glissez-déposez votre image ici",
    width: 40,
  },
};
