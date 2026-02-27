import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../src";

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Cliquez ici",
  },
};
