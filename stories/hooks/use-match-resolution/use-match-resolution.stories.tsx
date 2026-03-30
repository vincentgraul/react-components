import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMatchResolution } from "../../../src";

const ComponentWithUseMatchResolution = () => {
	const { resolution } = useMatchResolution(navigator.userAgent);

	return (
		<div>
			<p>Screen resolutions:</p>
			<ul>
				<li>{`isDesktop: ${resolution.isDesktop}`}</li>
				<li>{`isLaptop: ${resolution.isLaptop}`}</li>
				<li>{`isLaptopOrUpper: ${resolution.isLaptopOrUpper}`}</li>
				<li>{`isLaptopOrLower: ${resolution.isLaptopOrLower}`}</li>
				<li>{`isTablet: ${resolution.isTablet}`}</li>
				<li>{`isTabletOrUpper: ${resolution.isTabletOrUpper}`}</li>
				<li>{`isTabletOrLower: ${resolution.isTabletOrLower}`}</li>
				<li>{`isLargeMobile: ${resolution.isLargeMobile}`}</li>
				<li>{`isLargeMobileOrUpper: ${resolution.isLargeMobileOrUpper}`}</li>
				<li>{`isLargeMobileOrLower: ${resolution.isLargeMobileOrLower}`}</li>
				<li>{`isMobile: ${resolution.isMobile}`}</li>
				<li>{`isPortrait: ${resolution.isPortrait}`}</li>
				<li>{`isLandscape: ${resolution.isLandscape}`}</li>
			</ul>
		</div>
	);
};

const meta = {
	component: ComponentWithUseMatchResolution,
} satisfies Meta<typeof useMatchResolution>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
