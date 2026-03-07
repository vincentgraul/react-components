import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, FooterButtonProps, Wizard } from "../../src";

const meta = {
  component: Wizard,
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <div>
        <p>Welcome to the first step</p>
      </div>,

      <div>
        <p>Welcome to the second step</p>
      </div>,

      <div>
        <p>Welcome to the last step</p>
      </div>,
    ],
  },
};

export const WithTitles: Story = {
  args: {
    titles: ["First step", "Second step", "Third step"],
    hasStepIndicator: true,
    children: [
      <div>
        <p>Welcome to the first step</p>
      </div>,

      <div>
        <p>Welcome to the second step</p>
      </div>,

      <div>
        <p>Welcome to the last step</p>
      </div>,
    ],
  },
};

export const WithSpecificStep: Story = {
  args: {
    step: 2,
    children: [
      <div>
        <p>Welcome to the first step</p>
      </div>,

      <div>
        <p>Welcome to the second step</p>
      </div>,

      <div>
        <p>Welcome to the last step</p>
      </div>,
    ],
  },
};

export const WithSpecificRender: Story = {
  args: {
    renderHeader: () => <div>Custom header</div>,
    renderFooter: () => <div>Custom footer</div>,
    children: [
      <div>
        <p>Welcome to the first step</p>
      </div>,

      <div>
        <p>Welcome to the second step</p>
      </div>,

      <div>
        <p>Welcome to the last step</p>
      </div>,
    ],
  },
};

const MyCustomButton = ({ onClick, children }: FooterButtonProps) => (
  <Button width={30} onClick={onClick}>
    {children}
  </Button>
);

export const WithCustomButton: Story = {
  args: {
    footerButton: MyCustomButton,
    footerButtonNextText: "Suivant",
    footerButtonPreviousText: "Précédent",
    children: [
      <div>
        <p>Welcome to the first step</p>
      </div>,

      <div>
        <p>Welcome to the second step</p>
      </div>,

      <div>
        <p>Welcome to the last step</p>
      </div>,
    ],
  },
};
