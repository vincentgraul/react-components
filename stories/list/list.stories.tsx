import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, ListItem } from "../../src";
import ArrowRightIcon from "./assets/arrow-right.svg";

const meta = {
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <ListItem icon={ArrowRightIcon} text="cool"></ListItem>
        <ListItem icon={ArrowRightIcon} text="top"></ListItem>
      </>
    ),
  },
};
