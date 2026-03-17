import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { useOutsideAlerter } from "../../../src";

const ComponentWithUseOutsideAlerter = () => {
  const ref = useRef(null);
  const { hasClickedOutside } = useOutsideAlerter(ref);

  return (
    <div>
      <p>Has clicked outside: {hasClickedOutside.toString()}</p>
      <p ref={ref}>Click on the text</p>
    </div>
  );
};

const meta = {
  component: ComponentWithUseOutsideAlerter,
} satisfies Meta<typeof useOutsideAlerter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
