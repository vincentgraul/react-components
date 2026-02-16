import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "../../src";

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <></>,
    render: (args) => {
      const [isOpen, setOpen] = useState<boolean>(false);
      return (
        <div>
          <button onClick={() => setOpen(true)}>Click</button>
          {isOpen && (
            <Modal onClickedOutside={() => setOpen(false)}>
              <h1>Bienvenue</h1>
            </Modal>
          )}
        </div>
      );
    },
  },
};
