import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "../../src";

const meta = {
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "In progress...",
  },
};

export const WithImage: Story = {
  args: {
    text: "In progress...",
    showImage: true,
  },
};
