import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "../../src";

const meta = {
  component: Breadcrumb,
  args: {
    url: new URL(
      "https://stackoverflow.com/questions/39334400/how-to-split-url-to-get-url-path-in-javascript?value=3&name=5",
    ),
    onClick: (element) => console.log(element),
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
