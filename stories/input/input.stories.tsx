import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../src";

const meta = {
  component: Input,
  args: {
    name: "firstname",
    type: "text",
    label: "firstname",
    autoComplete: "off",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithMessage: Story = {
  args: {
    message: "firstname error",
    status: "error",
    autoComplete: "off",
  },
};
