import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../../src";

const meta = {
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Salut à tous.",
  },
};
