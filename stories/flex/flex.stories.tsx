import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../../src";

const meta = {
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <h1>Title</h1>
        <Flex justifyContent="space-between" alignItems="center" padding="5% 5%">
          <Flex direction="column" alignItems="center" width={50}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis est at ipsum
              tempor, id elementum odio sollicitudin. Nam accumsan est diam, vitae semper ex
              dignissim lacinia. Morbi vitae massa dapibus, posuere ex ac, rhoncus justo. Curabitur
              sed varius mauris. Nam posuere augue metus, finibus faucibus nulla ullamcorper sed.
              Vivamus venenatis nec lorem quis scelerisque. Suspendisse at elit sed purus commodo
              vestibulum. Donec sed lorem nulla. Nam dolor urna, posuere eget maximus ac, eleifend
              quis nibh. Maecenas interdum porta metus, eu accumsan nunc facilisis nec. Nam id
              placerat tellus.
            </p>
            <button>Next</button>
          </Flex>
          <Flex direction="column" alignItems="center" width={50}>
            <p>Lorem ipsum dolor sit amet</p>
            <button>Next</button>
          </Flex>
        </Flex>
      </>
    ),
  },
};
