import type { Meta, StoryObj } from "@storybook/react-vite";
import { CountrySelector } from "../../src";

const meta = {
  component: CountrySelector,
  args: {
    languages: ["fr", "ye", "vu", "uz"],
  },
} satisfies Meta<typeof CountrySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithValue: Story = {
  args: {
    value: "vu",
  },
};
