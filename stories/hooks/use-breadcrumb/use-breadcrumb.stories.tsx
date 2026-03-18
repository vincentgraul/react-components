import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreadcrumbItem, useBreadcrumb } from "../../../src";

const ComponentWithUseBreadcrumb = () => {
  const items: BreadcrumbItem[] = useBreadcrumb({
    url: new URL(
      "https://stackoverflow.com/questions/39334400/how-to-split-url-to-get-url-path-in-javascript?value=3&name=5",
    ),
  });

  return (
    <div>
      <p>Breadcrumb items:</p>
      <ol>
        {items.map((item) => (
          <li>
            <p>
              Label: {item.label} <br /> Url: {item.url}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

const meta = {
  component: ComponentWithUseBreadcrumb,
} satisfies Meta<typeof useBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
