import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "../../src";
import loaderSVG from "./assets/white-loader.svg";

const meta = {
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <Loader>In progress...</Loader>,
  },
};

export const WithImage: Story = {
  args: {
    src: loaderSVG,
    text: "In progress...",
  },
};
