import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.tsx"],
  framework: "@storybook/react-vite",
  addons: ["@storybook/addon-a11y", "@storybook/addon-vitest"]
};
export default config;
