import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMatchDevice, Device } from "../../../src";

const ComponentWithUseMatchDevice = () => {
  const device: Device = useMatchDevice(navigator.userAgent);

  return (
    <div>
      <p>Device informations (based on user agent):</p>
      <ul>
        <li>{`isMobile: ${device.isMobile}`}</li>
        <li>{`isTablet: ${device.isTablet}`}</li>
        <li>{`isMobileOrTablet: ${device.isMobileOrTablet}`}</li>
        <li>{`isDesktop: ${device.isDesktop}`}</li>
      </ul>
    </div>
  );
};

const meta = {
  component: ComponentWithUseMatchDevice,
} satisfies Meta<typeof useMatchDevice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
